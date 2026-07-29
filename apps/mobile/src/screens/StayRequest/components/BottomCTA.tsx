import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Button } from '../../../components';

interface BottomCTAProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onSubmit, onCancel }) => {
  return (
    <View style={styles.container}>
      <Button 
        title="إلغاء" 
        hierarchy="secondary" 
        onPress={onCancel} 
        style={styles.cancelBtn}
      />
      <Button 
        title="إرسال الطلب" 
        hierarchy="primary" 
        onPress={onSubmit} 
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[24],
    paddingVertical: theme.spacing[16],
    backgroundColor: theme.colors.surfaceDefault,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    gap: theme.spacing[12],
    ...theme.elevation.md,
  },
  cancelBtn: {
    flex: 0.35,
  },
  submitBtn: {
    flex: 0.65,
  }
});
