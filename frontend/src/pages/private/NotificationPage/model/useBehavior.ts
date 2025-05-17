import { useState } from 'react';
import { MOCKNOTIFICATIONS } from '../lib';

export const useBehavior = () => {
  const [notifications, setNotifications] = useState(MOCKNOTIFICATIONS);

  return { notifications };
};