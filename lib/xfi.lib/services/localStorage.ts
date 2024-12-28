import type { SidebarState } from '../components/organisms/Sidebar';
import type { AppThemeVariant } from '../theme';

export const LOCAL_STORAGE_FIELDS = {
  appTheme: 'appTheme',
  sidebarState: 'sidebarState',
} as const;

export type LocalStorageFieldsKeys = keyof typeof LOCAL_STORAGE_FIELDS;

class LocalStorageBaseService {
  static get<T = string>(key: LocalStorageFieldsKeys): T | null {
    try {
      const storageValue = localStorage.getItem(key);

      return storageValue && JSON.parse(storageValue);
    } catch {
      return null;
    }
  }

  static set<T = string>(key: LocalStorageFieldsKeys, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorageBaseService error:', error);
    }
  }

  static remove(key: LocalStorageFieldsKeys): void {
    localStorage.removeItem(key);
  }
}

export class LocalStorageService extends LocalStorageBaseService {
  static getAppTheme(): AppThemeVariant | null {
    return super.get(LOCAL_STORAGE_FIELDS.appTheme) || null;
  }

  static setAppTheme(theme: AppThemeVariant): void {
    super.set(LOCAL_STORAGE_FIELDS.appTheme, theme);
  }

  static getSidebarState(): SidebarState {
    return super.get(LOCAL_STORAGE_FIELDS.sidebarState) || { isOpen: true, accordionState: {} };
  }

  static setSidebarState(state: SidebarState): void {
    super.set(LOCAL_STORAGE_FIELDS.sidebarState, state);
  }
}
