import {
  Home,
  Book,
  Calendar,
  BarChart,
  MessageCircle,
  Settings,
} from 'lucide-react';

export const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/notes', label: 'Notes', icon: Book },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/board', label: 'Board', icon: BarChart },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];
