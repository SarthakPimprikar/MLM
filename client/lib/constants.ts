import { Role } from '@/types';

export const ROLE_COLORS: Record<Role, string> = {
  admin: '#7c3aed',
  sh: '#7c3aed',
  hba: '#3b82f6',
  hcm: '#f87171',
  hcc: '#60a5fa',
};

export const ROLE_TAGS: Record<Role, string> = {
  admin: 'ADMINISTRATOR',
  sh: 'STATE HEAD',
  hba: 'HBA',
  hcm: 'HCM',
  hcc: 'HCC',
};
