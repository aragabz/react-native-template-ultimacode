import { I18nManager } from 'react-native';
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

export type RtlChangeListener = (isRTL: boolean) => void;

const rtlListeners: Set<RtlChangeListener> = new Set();

const applyRtl = (lng: string) => {
  const isRTL = lng.startsWith('ar');
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(isRTL);
  rtlListeners.forEach((fn) => fn(isRTL));
};

export const onRtlChange = (listener: RtlChangeListener): (() => void) => {
  rtlListeners.add(listener);
  return () => {
    rtlListeners.delete(listener);
  };
};

const initI18n = async () => {
  try {
    const storedLanguage = mmkvStorage.getString(STORAGE_KEYS.LANGUAGE) ?? null;
    const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? 'en';
    const detectedLanguage = storedLanguage ?? deviceLanguage;
    const lng: SupportedLanguage =
      detectedLanguage === 'ar' ? 'ar' : 'en';

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
        (err) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });

    applyRtl(lng);

    i18n.on('languageChanged', applyRtl);

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
  i18n.changeLanguage(lng);
};

export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language?.startsWith('ar') ? 'ar' : 'en';
};

export default initI18n;
