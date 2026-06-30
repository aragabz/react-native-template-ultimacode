import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

interface PushNotificationsState {
  expoPushToken: string | null;
  permissionStatus: PermissionStatus;
  notification: Notifications.Notification | null;
  registerForPushNotifications: () => Promise<void>;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowInForeground: true,
  }),
});

export function usePushNotifications(): PushNotificationsState {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('undetermined');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      // Handle notification tap — navigate, open deep link, etc.
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const registerForPushNotifications = useCallback(async () => {
    if (!Device.isDevice) {
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    setPermissionStatus(finalStatus as PermissionStatus);

    if (finalStatus !== 'granted') {
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(tokenData.data);
  }, []);

  return {
    expoPushToken,
    permissionStatus,
    notification,
    registerForPushNotifications,
  };
}
