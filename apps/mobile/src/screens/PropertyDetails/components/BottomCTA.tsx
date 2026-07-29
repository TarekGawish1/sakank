import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../../navigation/types';
import { theme } from '../../../theme';
import { Button, AppIcon } from '../../../components';

interface BottomCTAProps {
  isLoggedIn?: boolean;
  listingId?: string;
}

type PropertyDetailsNavProp = NativeStackNavigationProp<HomeStackParamList>;

export const BottomCTA: React.FC<BottomCTAProps> = ({ isLoggedIn = false, listingId }) => {
  const navigation = useNavigation<PropertyDetailsNavProp>();
  return (
    <View style={styles.container}>
      <Pressable style={styles.shareBtn} onPress={() => {}}>
        <AppIcon name="Share2" size="md" color="primary" />
      </Pressable>
      <View style={styles.primaryBtnContainer}>
        <Button 
          title={isLoggedIn ? "إرسال طلب سكن" : "تسجيل الدخول للطلب"} 
          hierarchy="primary" 
          leadingIcon={!isLoggedIn ? <AppIcon name="Lock" size="sm" color="inverse" /> : undefined}
          onPress={() => listingId && navigation.navigate('StayRequest', { listingId })} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[24],
    paddingVertical: theme.spacing[16],
    backgroundColor: theme.colors.surfaceDefault,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
    gap: theme.spacing[16],
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceDefault,
  },
  primaryBtnContainer: {
    flex: 1,
  }
});
