import { StyleSheet, Text, View } from 'react-native';
import type { Palette } from '../theme/palette';

type LittleLemonHeaderProps = {
  colors?: Palette;
};

export function LittleLemonHeader({ colors }: LittleLemonHeaderProps = {}) {
  return (
    <View
      style={[
        styles.header,
        colors && {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.title, colors && { color: colors.text }]}>Little Lemon</Text>
      <Text style={[styles.subtitle, colors && { color: colors.muted }]}>Середземноморське бістро</Text>
    </View>
  );
}

export default LittleLemonHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EE9972',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D97A53',
  },
  title: {
    color: '#333333',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
});
