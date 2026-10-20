import { StyleSheet, Text, View } from 'react-native';
import type { Palette } from '../theme/palette';

type LittleLemonFooterProps = {
  colors?: Palette;
};

export function LittleLemonFooter({ colors }: LittleLemonFooterProps = {}) {
  const year = new Date().getFullYear();

  return (
    <View
      style={[
        styles.footer,
        colors && {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.text, colors && { color: colors.muted }]}>
        © {year} Little Lemon. Всі права захищені.
      </Text>
    </View>
  );
}

export default LittleLemonFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#D3D6D4',
  },
  text: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
