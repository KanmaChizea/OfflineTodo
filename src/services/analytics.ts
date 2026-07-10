import {
  getAnalytics,
  logScreenView,
  setUserId,
  setUserProperties,
} from '@react-native-firebase/analytics';

class AnalyticsService {
  constructor() {}
  logEvent(eventName: AnalyticsEvent, params?: Record<string, unknown>) {
    console.log(eventName, params);
  }

  setUser(user: User) {
    setUserId(getAnalytics(), user.id);
    setUserProperties(getAnalytics(), {
      country: user.country,
    });
  }

  logScreen(screenName: string) {
    logScreenView(getAnalytics(), {
      name: screenName,
    });
  }
}

export default new AnalyticsService();

export const useAnalytics = () => {
  const logEvent = (eventName: string, params?: Record<string, unknown>) => {
    console.log(eventName, params);
  };

  const setUser = (user: User) => {
    setUserId(getAnalytics(), user.id);
    setUserProperties(getAnalytics(), {
      country: user.country,
    });
  };

  return {
    logEvent,
    setUser,
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  subscription: string;
};

export type AnalyticsEvent = 'transfer_initiated' | 'transfer_completed';
