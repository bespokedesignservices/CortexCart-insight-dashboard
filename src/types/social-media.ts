
import { LucideIcon } from "lucide-react";

export interface SocialPlatform {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface CustomerMessage {
  id: string;
  platform: string;
  username: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  lastSync: string | null;
  status: "connected" | "disconnected";
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
}
