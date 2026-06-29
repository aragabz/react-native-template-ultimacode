import { useSettingsStore, selectOnboardingSeen, selectLanguage } from '../useSettingsStore';

describe('useSettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      onboardingSeen: false,
      language: 'en',
    });
  });

  it('starts with default values', () => {
    const state = useSettingsStore.getState();
    expect(state.onboardingSeen).toBe(false);
    expect(state.language).toBe('en');
  });

  it('setOnboardingSeen updates the value', () => {
    useSettingsStore.getState().setOnboardingSeen(true);
    expect(useSettingsStore.getState().onboardingSeen).toBe(true);

    useSettingsStore.getState().setOnboardingSeen(false);
    expect(useSettingsStore.getState().onboardingSeen).toBe(false);
  });

  it('setLanguage updates to arabic', () => {
    useSettingsStore.getState().setLanguage('ar');
    expect(useSettingsStore.getState().language).toBe('ar');
  });

  it('setLanguage updates to english', () => {
    useSettingsStore.setState({ language: 'ar' });
    useSettingsStore.getState().setLanguage('en');
    expect(useSettingsStore.getState().language).toBe('en');
  });

  describe('selectors', () => {
    it('selectOnboardingSeen returns onboarding state', () => {
      expect(selectOnboardingSeen(useSettingsStore.getState())).toBe(false);
      useSettingsStore.getState().setOnboardingSeen(true);
      expect(selectOnboardingSeen(useSettingsStore.getState())).toBe(true);
    });

    it('selectLanguage returns current language', () => {
      expect(selectLanguage(useSettingsStore.getState())).toBe('en');
      useSettingsStore.getState().setLanguage('ar');
      expect(selectLanguage(useSettingsStore.getState())).toBe('ar');
    });
  });
});
