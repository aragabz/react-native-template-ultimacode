import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import en from './en.json';
import ar from './ar.json';

const LANGUAGE_KEY = '@app/language';

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
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? 'en';
  const detectedLanguage = storedLanguage ?? deviceLanguage;
  const lng: SupportedLanguage =
    detectedLanguage === 'ar' ? 'ar' : 'en';

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

  applyRtl(lng);

  i18n.on('languageChanged', applyRtl);

  return lng;
};

export const changeLanguage = async (lng: SupportedLanguage) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  i18n.changeLanguage(lng);
};

export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language?.startsWith('ar') ? 'ar' : 'en';
};

export default initI18n;
