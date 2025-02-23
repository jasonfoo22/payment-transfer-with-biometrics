import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/transactionsSlice';
import { Routes } from '@/constants/Routes';

export default function SuccessScreen() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const {
    name = 'Unknown',
    phone = 'N/A',
    amount = '0.00',
  } = useLocalSearchParams<{
    name: string;
    phone: string;
    amount: string;
  }>();

  const backToHome = () => {
    router.push({
      pathname: Routes.tabs,
    });
  };

  return (
    <ContentLayoutView>
      <View style={styles.container}>
        <View style={styles.successWrapper}>
          <View style={styles.checkMarkIconWrapper}>
            <IconSymbol name="checkmark" size={40} weight="medium" color={Colors.success} />
          </View>
        </View>
        <Text style={styles.successText}>Transaction Successful</Text>
        <Text style={styles.successTextAmount}>RM {amount}</Text>
        <View style={styles.receiverContainer}>
          <Image
            source={require('@/assets/images/duitnowlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.receiverInfoWrapper}>
            <Text style={styles.receiverName}>{name}</Text>
            <Text style={styles.phoneNumber}>{phone}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.homeBtn} onPress={backToHome}>
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  successWrapper: {
    marginBottom: 20,
  },
  successImage: {
    width: 200,
    height: 100,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  successTextAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  checkMarkIconWrapper: {
    color: Colors.success,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.success,
    padding: 16,
    elevation: 5,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverInfoWrapper: {
    marginLeft: 10,
    gap: 4,
  },
  logo: {
    width: 45,
    height: 45,
  },
  receiverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  phoneNumber: {
    fontSize: 16,
    color: 'gray',
  },
  homeBtn: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
  },
  homeText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
