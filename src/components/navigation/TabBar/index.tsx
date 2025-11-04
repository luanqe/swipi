/**
 * TabBar Component
 * 
 * Custom Tab Bar für Bottom Tab Navigation
 * Orchestriert TabBarItem Components
 * Nutzt Theme-Tokens (Component-First, DRY)
 * 
 * Design-Specs (aus Wireframe):
 * - Fixed am unteren Rand
 * - Weiße Hintergrundfarbe
 * - Shadow/Border oben
 * - Aktiver Tab: colors.primary (rot)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBarItem } from './TabBarItem';
import { colors, spacing, shadows } from '../../../theme';

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom || spacing.sm,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isActive = state.index === index;

        // Get label from options or route name
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Get icon (set in Navigator)
        const icon = options.tabBarIcon
          ? options.tabBarIcon({ focused: isActive, color: '', size: 24 })
          : '❓';

        // Get badge (optional)
        const badge = options.tabBarBadge;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            label={typeof label === 'string' ? label : route.name}
            icon={typeof icon === 'string' ? icon : '❓'}
            isActive={isActive}
            onPress={onPress}
            badge={typeof badge === 'number' ? badge : undefined}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xs,
    ...shadows.md,
  },
});
