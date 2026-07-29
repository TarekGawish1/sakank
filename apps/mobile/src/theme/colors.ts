export const palette = {
  blue50: '#EFF4FF',
  blue100: '#D1E0FF',
  blue200: '#B2CCFF',
  blue300: '#84ADFF',
  blue400: '#528BFF',
  blue500: '#155EEF', // Primary
  blue600: '#004EEB',
  blue700: '#0040C1',
  blue800: '#00359E',
  blue900: '#002C85',

  neutral0: '#FFFFFF',
  neutral50: '#F9FAFB',
  neutral100: '#F3F4F6',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral800: '#1F2937',
  neutral900: '#111827',
  neutral1000: '#000000',

  green50: '#ECFDF3',
  green500: '#12B76A',
  green700: '#027A48',

  orange50: '#FFFAEB',
  orange500: '#F79009',
  orange700: '#B54708',

  red50: '#FEF3F2',
  red500: '#F04438',
  red700: '#B42318',
};

export const colors = {
  // Surface
  surfaceDefault: palette.neutral0,
  surfaceSubdued: palette.neutral50,
  surfaceMuted: palette.neutral100,
  surfaceNeutral: palette.neutral100,
  surfaceBackground: palette.neutral50,
  surfacePrimary: palette.blue500,
  surfacePrimaryHover: palette.blue600,
  surfacePrimaryPressed: palette.blue700,
  surfacePrimarySubtle: palette.blue50,
  surfaceInverse: palette.neutral900,
  surfaceDisabled: palette.neutral100,
  surfaceErrorSubtle: palette.red50,
  surfaceError: palette.red50,
  surfaceSuccessSubtle: palette.green50,
  surfaceSuccess: palette.green50,
  surfaceWarningSubtle: palette.orange50,
  surfaceWarning: palette.orange50,

  // Text
  textPrimary: palette.neutral900,
  textSecondary: palette.neutral500,
  textTertiary: palette.neutral400,
  textInverse: palette.neutral0,
  textBrand: palette.blue500,
  textError: palette.red500,
  textSuccess: palette.green700,
  textWarning: palette.orange700,
  textMuted: palette.neutral400,

  // Border
  borderSubtle: palette.neutral200,
  borderStrong: palette.neutral300,
  borderBrand: palette.blue500,
  borderError: palette.red500,

  // Icons
  iconPrimary: palette.neutral900,
  iconSecondary: palette.neutral500,
  iconInverse: palette.neutral0,
  iconBrand: palette.blue500,

  // Feedback
  success: palette.green500,
  warning: palette.orange500,
  error: palette.red500,
  info: palette.blue500,

  // Brand (Legacy/Global references)
  brandPrimary: palette.blue500,
};
