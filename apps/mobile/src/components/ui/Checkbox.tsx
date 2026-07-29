import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Typography } from './Typography';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={() => onChange(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        className={`w-[20px] h-[20px] items-center justify-center rounded-xs border ${
          checked
            ? 'bg-primary-500 border-primary-500'
            : 'bg-white border-neutrals-300'
        } ${disabled ? 'opacity-50' : 'opacity-100'}`}
      >
        {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
      </View>
      
      {label && (
        <Typography 
          variant="body-m" 
          color={disabled ? 'disabled' : 'primary'} 
          className="ms-12"
        >
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
