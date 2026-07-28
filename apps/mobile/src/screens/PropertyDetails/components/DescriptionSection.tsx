import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';
import { ListingDetails } from '../../../api/listings.api';

interface DescriptionSectionProps {
  listing: ListingDetails;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ listing }) => {
  const [expanded, setExpanded] = useState(false);

  if (!listing.description) return null;

  return (
    <View style={styles.container}>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.title}>
        وصف العقار
      </AppText>
      
      <AppText 
        variant="bodyBase" 
        color="textSecondary" 
        style={styles.text}
        numberOfLines={expanded ? undefined : 3}
      >
        {listing.description}
      </AppText>

      {listing.description.length > 100 && (
        <Pressable onPress={() => setExpanded(!expanded)} style={styles.button} hitSlop={10}>
          <AppText variant="label" color="brandPrimary" weight="bold">
            {expanded ? 'عرض أقل' : 'قراءة المزيد'}
          </AppText>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[24],
    marginBottom: theme.spacing[16],
  },
  title: {
    marginBottom: theme.spacing[12],
  },
  text: {
    lineHeight: 24,
  },
  button: {
    marginTop: theme.spacing[8],
    alignSelf: 'flex-start',
  }
});
