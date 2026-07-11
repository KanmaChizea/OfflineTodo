import {
  getAnalytics,
  logEvent,
  logScreenView,
  setUserId,
  setUserProperties,
} from '@react-native-firebase/analytics';

class AnalyticsService {
  logEvent(eventName: AnalyticsEvent, params?: Record<string, unknown>) {
    logEvent(getAnalytics(), eventName as string, params);
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

type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  subscription: string;
};

export type AnalyticsEvent =
  | 'screen_view'
  | 'login_attempted'
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'add_todo_pressed'
  | 'edit_todo'
  | 'todo_created'
  | 'todo_updated'
  | 'todo_deleted'
  | 'todo_completed'
  | 'todo_uncompleted'
  | 'theme_toggled';
