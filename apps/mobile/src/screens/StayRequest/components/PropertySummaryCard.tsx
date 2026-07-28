import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Card, CardBody } from '../../../components';

export const PropertySummaryCard = () => {
  return (
    <Card variant="outlined" radius="lg">
      <CardBody style={styles.container}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }} 
          style={styles.image}
        />
        <View style={styles.details}>
          <AppText variant="bodyBase" weight="bold" color="textPrimary" numberOfLines={1}>
            فيلا فاخرة في الياسمين
          </AppText>
          <AppText variant="caption" color="textSecondary" numberOfLines={1} style={styles.address}>
            الرياض، حي الياسمين
          </AppText>
          <View style={styles.priceContainer}>
            <AppText variant="bodySm" weight="bold" color="textPrimary">
              2,500,000
            </AppText>
            <AppText variant="caption" color="textSecondary">
              {' '}ريال / شهر
            </AppText>
          </View>
        </View>
      </CardBody>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing[16],
    gap: theme.spacing[16],
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  address: {
    marginTop: 4,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  }
});
