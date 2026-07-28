import { NotificationType } from '@prisma/client';

export interface NotificationResponse {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  readAt: string | null;
  referenceId: string | null;
  createdAt: string;
}

export interface UnreadCountResponse {
  count: number;
}
