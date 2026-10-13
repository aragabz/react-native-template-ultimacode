import { useSettingsStore, selectOnboardingSeen } from '../useSettingsStore';

describe('useSettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({ onboardingSeen: false });
  });

  it('starts with default values', () => {
    expect(useSettingsStore.getState().onboardingSeen).toBe(false);
  });

  it('setOnboardingSeen updates the value', () => {
    useSettingsStore.getState().setOnboardingSeen(true);
    expect(useSettingsStore.getState().onboardingSeen).toBe(true);

    useSettingsStore.getState().setOnboardingSeen(false);
    expect(useSettingsStore.getState().onboardingSeen).toBe(false);
  });

  describe('selectors', () => {
    it('selectOnboardingSeen returns onboarding state', () => {
      expect(selectOnboardingSeen(useSettingsStore.getState())).toBe(false);
      useSettingsStore.getState().setOnboardingSeen(true);
      expect(selectOnboardingSeen(useSettingsStore.getState())).toBe(true);
    });
  });
});
