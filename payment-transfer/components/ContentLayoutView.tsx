import {
  StyleSheet,
  SafeAreaView,
  View,
  type ViewProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export type ContentLayoutViewProps = ViewProps;

export function ContentLayoutView({ style, ...otherProps }: ContentLayoutViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={[styles.container, { padding: 20 }, style]} {...otherProps} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSection,
  },
});
