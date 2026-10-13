import { I18nManager } from 'react-native';
import { reloadAppAsync } from 'expo';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { mmkvStorage } from '@services/mmkvStorage';
import ar from './ar.json';
import en from './en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

export type SupportedLanguage = keyof typeof resources;

const isRtlLanguage = (lng: string) => lng.startsWith('ar');

/**
 * Sets the native layout direction. It only takes effect after the JS bundle
 * reloads, so a runtime change of direction must be followed by a reload.
 */
const applyRtl = (lng: string) => {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(isRtlLanguage(lng));
};

const initI18n = async () => {
  try {
    const storedLanguage = mmkvStorage.getString(STORAGE_KEYS.LANGUAGE) ?? null;
    const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? 'en';
    const detectedLanguage = storedLanguage ?? deviceLanguage;
    const lng: SupportedLanguage = detectedLanguage === 'ar' ? 'ar' : 'en';

    await new Promise<void>((resolve, reject) => {
      i18n.use(initReactI18next).init(
        {
          resources,
          lng,
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
          compatibilityJSON: 'v4',
        },
        err => {
          if (err) reject(err);
          else resolve();
        },
      );
    });

    applyRtl(lng);

    return lng;
  } catch (error) {
    console.warn('[i18n] Initialization failed, falling back to en:', error);
    i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      compatibilityJSON: 'v4',
    });
    return 'en';
  }
};

export const changeLanguage = async (lng: SupportedLanguage) => {
  mmkvStorage.set(STORAGE_KEYS.LANGUAGE, lng);
  await i18n.changeLanguage(lng);
  applyRtl(lng);
  if (I18nManager.isRTL !== isRtlLanguage(lng)) {
    await reloadAppAsync('Layout direction changed');
  }
};

export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language?.startsWith('ar') ? 'ar' : 'en';
};

export default initI18n;
