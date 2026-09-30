// src/components/ui/Icon.jsx
import {
  Activity,
  Baby,
  BadgeCheck,
  Bone,
  Clock,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Microscope,
  Plane,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  Users,
  Wallet,
} from 'lucide-react';

/**
 * Central icon registry.
 * Data files store a short string (e.g. "flask") and this component maps it
 * to the real lucide-react icon — keeping /data files free of JSX.
 */
const registry = {
  activity: Activity,
  baby: Baby,
  badge: BadgeCheck,
  bone: Bone,
  clock: Clock,
  flask: FlaskConical,
  graduation: GraduationCap,
  handshake: HeartHandshake,
  pulse: HeartPulse,
  microscope: Microscope,
  plane: Plane,
  scan: ScanLine,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  users: Users,
  wallet: Wallet,
};

export default function Icon({ name, className = 'h-6 w-6', ...rest }) {
  const Component = registry[name] || Stethoscope;
  return <Component className={className} aria-hidden="true" {...rest} />;
}