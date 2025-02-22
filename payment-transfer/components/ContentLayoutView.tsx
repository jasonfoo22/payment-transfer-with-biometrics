import { StyleSheet, SafeAreaView, View, type ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';

export type ContentLayoutViewProps = ViewProps;

export function ContentLayoutView({ style, ...otherProps }: ContentLayoutViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, style]} {...otherProps} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSection,
    padding: 20,
  },
});
