# Husky Pre-commit Hooks

## Overview

[Husky](https://typicode.github.io/husky/) is used to run checks on staged files before every commit. It is configured via:

- `.husky/pre-commit` — the hook script that Git executes before each commit
- `lint-staged` in `package.json` — defines which checks/linters run on which file types

## How It Works

When you run `git commit`, Husky intercepts the commit and runs the `pre-commit` hook. That hook calls `npx lint-staged`, which inspects the staged files and runs the configured commands on them.

### Pre-commit Hook (`.husky/pre-commit`)

```
npx lint-staged
```

This single command delegates all logic to `lint-staged`.

### lint-staged Configuration (`package.json`)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "**/*.{ts,tsx}": [
    "bash -c 'yarn typecheck'"
  ]
}
```

**First rule** — `*.{js,jsx,ts,tsx}`:
1. `eslint --fix` — auto-fix lint errors (e.g., unused imports, missing semicolons).
2. `prettier --write` — format the file with Prettier.

Both commands run only on staged files, in sequence. If either fails, the commit is aborted.

**Second rule** — `**/*.{ts,tsx}`:
1. `bash -c 'yarn typecheck'` — runs `tsc --noEmit` against the entire project (not just staged files). This ensures TypeScript compilation is clean before accepting the commit.

> The second rule pattern (`**/*.{ts,tsx}`) triggers when _any_ `.ts` or `.tsx` file is staged, but the command itself checks the whole project. This is intentional — type errors in one file can originate in another.

## Setup

Husky is installed automatically when you run `yarn install` via the `prepare` script:

```json
"prepare": "husky"
```

When `yarn install` runs, Husky creates symlinks in `.git/hooks/` pointing to its scripts in `.husky/_/`.

To add or modify hooks, create a file in `.husky/` (e.g., `.husky/pre-push`). The file must be executable and contain the shell command(s) to run.

## Skipping Hooks

To bypass the pre-commit hooks (e.g., for WIP commits):

```sh
git commit --no-verify -m "message"
git commit -n -m "message"   # shorthand
```

Use sparingly — these hooks enforce code quality across the project.
