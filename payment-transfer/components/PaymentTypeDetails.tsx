import { StyleSheet, View, Image, Text } from 'react-native';

export type PaymentTypeDetailsProps = {
  name?: string;
  phone?: string;
};

export function PaymentTypeDetails({ name, phone }: PaymentTypeDetailsProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
