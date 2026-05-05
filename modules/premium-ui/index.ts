import { requireNativeView } from 'expo';
import * as React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Host, type CommonViewModifierProps } from '@expo/ui/swift-ui';
import { createViewModifierEventListener } from '@expo/ui/swift-ui/modifiers';

export interface GlassCardProps extends CommonViewModifierProps {
  title?: string;
  content?: string;
  style?: any;
}

let NativeGlassCard: React.ComponentType<any> | null = null;
if (Platform.OS === 'ios') {
  try {
    NativeGlassCard = requireNativeView<GlassCardProps>('GlassCard', 'GlassCardView');
  } catch (_e) {
    // Fail silently or fallback to standard view if loading fails
  }
}

export function GlassCard({ modifiers, title, content, style, ...restProps }: GlassCardProps) {
  if (Platform.OS === 'ios' && NativeGlassCard) {
    try {
      return React.createElement(
        Host,
        {
          matchContents: true,
          style,
          children: React.createElement(NativeGlassCard, {
            modifiers,
            ...(modifiers ? createViewModifierEventListener(modifiers) : undefined),
            title,
            content,
            ...restProps,
          }),
        }
      );
    } catch (_e) {
      // Fallback if rendering fails or modifier helpers are missing
    }
  }

  // Pure React Native elegant fallback for non-iOS / non-compiled environments
  return React.createElement(
    View,
    {
      style: [styles.fallbackCard, style],
      ...restProps,
    },
    title ? React.createElement(Text, { style: styles.fallbackTitle }, title) : null,
    content ? React.createElement(Text, { style: styles.fallbackContent }, content) : null
  );
}

const styles = StyleSheet.create({
  fallbackCard: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.85)', // Dark slate premium translucent background
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginBottom: 8,
  },
  fallbackContent: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 22,
  },
});
