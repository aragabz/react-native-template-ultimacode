#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.resolve(__dirname, '..');
const OLD_NAME = 'ReactNativeTemplate';
const OLD_NAMESPACE = 'com.reactnativetemplate';

const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.icns',
  '.jar', '.keystore', '.mp4', '.mov', '.pdf', '.otf',
  '.ttf', '.woff', '.woff2', '.eot',
]);

const EXCLUDED_DIRS = new Set([
  'node_modules', '.git', '.yarn', 'Pods', '.gradle',
  'build', '.cxx', '.expo', 'dist', 'web-build',
  'coverage', 'conductor', '.vscode', '__pycache__',
  '.husky', 'DerivedData', 'xcuserdata', '.idea',
  '.metro-health-check*',
]);

const EXCLUDED_FILES = new Set([
  'yarn.lock', 'package-lock.json', 'Gemfile.lock',
  'create.sh', '.DS_Store', '.gitignore',
]);

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1 || args.length > 3) {
    console.log('Usage: npx react-native-template-ultimacode <project-name> [destination] [package-namespace]');
    console.log('');
    console.log('Examples:');
    console.log('  npx react-native-template-ultimacode MyApp');
    console.log('  npx react-native-template-ultimacode MyApp ./MyApp com.mycompany.myapp');
    process.exit(1);
  }

  const newName = args[0];
  const destPath = args[1] ? path.resolve(args[1]) : path.resolve(process.cwd(), newName);
  const namespace = args[2] || `com.${newName.toLowerCase()}`;

  if (!/^[A-Z][A-Za-z0-9]+$/.test(newName)) {
    console.error('Error: Project name must be PascalCase (e.g., MyApp, BigProject2)');
    process.exit(1);
  }

  if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/.test(namespace)) {
    console.error('Error: Package namespace must be valid (e.g., com.mycompany.myapp)');
    process.exit(1);
  }

  if (fs.existsSync(destPath)) {
    console.error(`Error: Destination already exists: ${destPath}`);
    process.exit(1);
  }

  return { newName, destPath, namespace };
}

function shouldExclude(relativePath) {
  const parts = relativePath.split(path.sep);
  for (const part of parts) {
    if (EXCLUDED_DIRS.has(part)) return true;
  }
  const basename = path.basename(relativePath);
  if (EXCLUDED_FILES.has(basename)) return true;
  return false;
}

function isBinary(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

function copyTemplate(srcDir, destDir, relativePath) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name;

    if (shouldExclude(relPath)) continue;

    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath, relPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function renameDirStructure(basePath, oldName, newName, namespace) {
  const iosDir = path.join(basePath, 'ios');
  if (fs.existsSync(iosDir)) {
    const xcschemeDir = path.join(iosDir, `${oldName}.xcodeproj`, 'xcshareddata', 'xcschemes');
    const oldScheme = path.join(xcschemeDir, `${oldName}.xcscheme`);
    if (fs.existsSync(oldScheme)) {
      fs.renameSync(oldScheme, path.join(xcschemeDir, `${newName}.xcscheme`));
    }

    const oldXcodeproj = path.join(iosDir, `${oldName}.xcodeproj`);
    if (fs.existsSync(oldXcodeproj)) {
      fs.renameSync(oldXcodeproj, path.join(iosDir, `${newName}.xcodeproj`));
    }

    const oldXcworkspace = path.join(iosDir, `${oldName}.xcworkspace`);
    if (fs.existsSync(oldXcworkspace)) {
      fs.renameSync(oldXcworkspace, path.join(iosDir, `${newName}.xcworkspace`));
    }

    const oldAppDir = path.join(iosDir, oldName);
    if (fs.existsSync(oldAppDir)) {
      fs.renameSync(oldAppDir, path.join(iosDir, newName));
    }
  }

  const androidDir = path.join(basePath, 'android');
  if (fs.existsSync(androidDir)) {
    const oldPackagePath = OLD_NAMESPACE.split('.').join(path.sep);
    const newPackagePath = namespace.split('.').join(path.sep);

    for (const variant of ['main', 'debug', 'release']) {
      const srcDir = path.join(androidDir, 'app', 'src', variant, 'java');
      const oldPkgDir = path.join(srcDir, oldPackagePath);
      const newPkgDir = path.join(srcDir, newPackagePath);

      if (fs.existsSync(oldPkgDir)) {
        fs.mkdirSync(path.dirname(newPkgDir), { recursive: true });
        fs.renameSync(oldPkgDir, newPkgDir);
        cleanupEmptyParentDirs(path.dirname(oldPkgDir));
      }
    }
  }
}

function cleanupEmptyParentDirs(dir) {
  while (dir && dir !== '/' && !dir.endsWith('java')) {
    try {
      if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
        dir = path.dirname(dir);
      } else {
        break;
      }
    } catch {
      break;
    }
  }
}

function replaceInFile(filePath, replacements) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  for (const [search, replace] of replacements) {
    newContent = newContent.split(search).join(replace);
  }
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
}

function processDirectory(dir, replacements) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        processDirectory(fullPath, replacements);
      }
    } else {
      if (!isBinary(fullPath)) {
        replaceInFile(fullPath, replacements);
      }
    }
  }
}

function handlePackageJson(destPath, newName) {
  const pkgPath = path.join(destPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = newName;
  pkg.version = '0.0.1';
  pkg.private = true;
  delete pkg.bin;
  delete pkg.files;
  delete pkg.description;
  delete pkg.keywords;
  delete pkg.license;
  delete pkg.repository;
  delete pkg.homepage;
  delete pkg.bugs;
  if (pkg.scripts) {
    delete pkg.scripts.prepare;
  }
  delete pkg['lint-staged'];
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}

function cleanup(destPath) {
  const dirsToRemove = [
    'ios/Pods',
    'ios/build',
    'android/.gradle',
    'android/app/build',
    'android/build',
    'android/app/.cxx',
    '.expo',
    'dist',
    'web-build',
    'coverage',
    '.husky',
  ];

  for (const dir of dirsToRemove) {
    const fullPath = path.join(destPath, dir);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  }
}

function main() {
  const { newName, destPath, namespace } = parseArgs();
  const oldSlug = OLD_NAME.toLowerCase();
  const newSlug = newName.toLowerCase();

  console.log(`Creating project '${newName}' at '${destPath}'`);
  console.log(`  Package: ${namespace}`);
  console.log('');

  console.log('[1/5] Copying template files...');
  fs.mkdirSync(destPath, { recursive: true });
  copyTemplate(TEMPLATE_DIR, destPath, '');

  console.log('[2/5] Renaming files and directories...');
  renameDirStructure(destPath, OLD_NAME, newName, namespace);

  console.log('[3/5] Replacing template strings in project files...');
  handlePackageJson(destPath, newName);

  const replacements = [
    [OLD_NAME, newName],
    [OLD_NAMESPACE, namespace],
    [oldSlug, newSlug],
    [`Pods-${OLD_NAME}`, `Pods-${newName}`],
    [`Pods_${OLD_NAME}`, `Pods_${newName}`],
  ];

  processDirectory(destPath, replacements);

  console.log('[4/5] Cleaning up...');
  cleanup(destPath);

  console.log('[5/5] Done!');
  console.log('');
  console.log(`Project created at: ${destPath}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${path.relative(process.cwd(), destPath)}`);
  console.log('  yarn install');
  console.log('  npx pod-install');
  console.log('  npx react-native run-ios');
  console.log('');
  console.log('Note:');
  console.log(`  - Android package: ${namespace}`);
  console.log(`  - iOS bundle ID: ${namespace}`);
  console.log(`  - App name: ${newName}`);
}

main();
