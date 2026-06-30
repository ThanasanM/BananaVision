import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#ca8a04',      // Banana Gold
  primaryLight: '#fef9c3', // Soft Banana Tint
  success: '#10b981',      // กล้วยดิบ / ดี
  successLight: '#e6f4ea',
  warning: '#f97316',      // กล้วยห่าม / พอใช้
  warningLight: '#fff7ed',
  danger: '#ef4444',       // กล้วยงอม / ระงับ / ปรับปรุง
  dangerLight: '#fef2f2',
  
  // Neutral Colors
  background: '#f8fafc',
  surface: '#ffffff',
  textMain: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0'
};

export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24
};

export const SHADOWS = StyleSheet.create({
  sm: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  }
});