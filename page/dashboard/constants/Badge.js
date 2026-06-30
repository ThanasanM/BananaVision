import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function BananaBadge({ status }) {
  const getStatusConfig = (type) => {
    switch (type) {
      case 'ดิบ': return { bg: COLORS.successLight, text: COLORS.success };
      case 'ห่าม': return { bg: COLORS.warningLight, text: COLORS.warning };
      case 'สุก': return { bg: COLORS.primaryLight, text: COLORS.primary };
      case 'งอม': return { bg: COLORS.dangerLight, text: COLORS.danger };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>กล้วย{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  }
});