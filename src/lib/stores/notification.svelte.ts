import type { Notification, NotificationType } from '$lib/types/portfolio';

let notifications = $state<Notification[]>([]);
let idCounter = 0;

export function notify(message: string, type: NotificationType = 'info', durationMs = 4000): void {
  const id = String(++idCounter);
  notifications = [...notifications, { id, message, type }];

  if (durationMs > 0) {
    setTimeout(() => dismiss(id), durationMs);
  }
}

export function dismiss(id: string): void {
  notifications = notifications.filter((n) => n.id !== id);
}

export function getNotifications(): Notification[] {
  return notifications;
}
