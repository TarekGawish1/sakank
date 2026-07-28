import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { TabBarItem } from './TabBarItem';
import { IconName } from '../../components';

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, theme.spacing[16]) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: IconName = 'Home';
        if (route.name === 'Search') iconName = 'Search';
        else if (route.name === 'Favorites') iconName = 'Heart';
        else if (route.name === 'Messages') iconName = 'MessageCircle';
        else if (route.name === 'Profile') iconName = 'User';

        // Add mocked badges for showcase
        const badgeCount = route.name === 'Messages' ? 2 : undefined;
        const hasNotification = route.name === 'Profile';

        return (
          <TabBarItem
            key={route.key}
            label={label as string}
            iconName={iconName}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            badgeCount={badgeCount}
            hasNotification={hasNotification}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceDefault,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    ...theme.elevation.lg,
  },
});
