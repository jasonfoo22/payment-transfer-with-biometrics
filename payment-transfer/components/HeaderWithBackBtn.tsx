import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ReactNode } from 'react';
import { useRouter } from 'expo-router';

export type HeaderWithBackBtnProps = {
  title?: string;
  customTitle?: ReactNode;
};

export function HeaderWithBackBtn({ title, customTitle }: HeaderWithBackBtnProps) {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <IconSymbol name="chevron.left" size={24} color="black" />
      </TouchableOpacity>
      {customTitle ? customTitle : <Text style={styles.headerText}>{title}</Text>}
      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
