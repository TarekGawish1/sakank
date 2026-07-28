import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export const DescriptionSection = () => {
  const [expanded, setExpanded] = useState(false);

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
        تتميز هذه الفيلا الفاخرة بتصميمها العصري وموقعها الاستراتيجي في قلب حي الملقا. تتكون الفيلا من دورين وملحق، وتضم 5 غرف نوم فسيحة، و4 دورات مياه مصممة بأحدث التشطيبات. كما تحتوي على مطبخ راكب بالكامل وتكييف مركزي، وموقف يتسع لسيارتين، بالإضافة إلى حديقة خلفية صغيرة مثالية للجلسات العائلية.
      </AppText>

      <Pressable onPress={() => setExpanded(!expanded)} style={styles.button} hitSlop={10}>
        <AppText variant="label" color="brandPrimary" weight="bold">
          {expanded ? 'عرض أقل' : 'قراءة المزيد'}
        </AppText>
      </Pressable>
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
