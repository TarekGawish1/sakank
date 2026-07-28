import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native';
import { theme } from '../../theme';

import { HomeHeader } from './components/HomeHeader';
import { QuickFilters } from './components/QuickFilters';
import { FeaturedListingsSection } from './components/FeaturedListingsSection';
import { NearbyListingsSection } from './components/NearbyListingsSection';
import { RecommendedListingsSection } from './components/RecommendedListingsSection';

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} accessible accessibilityLabel="الشاشة الرئيسية">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <QuickFilters />
        
        <FeaturedListingsSection />
        
        <NearbyListingsSection />
        
        <RecommendedListingsSection />
        
        {/* Bottom padding for better scrolling experience */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  container: {
    flex: 1,
  },
  bottomSpacer: {
    height: theme.spacing[40],
  },
});
