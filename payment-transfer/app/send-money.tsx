import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const handleSendMoney = () => {
    if (!amount || !receiver) {
      Alert.alert('Error', 'Please provide both amount and receiver.');
      return;
    }

    // Simulate sending money logic here (e.g., API call)
    Alert.alert('Success', `Sent RM${amount} to ${receiver}`);
    router.back(); // Go back to the previous screen (HomeScreen)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Send Money</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Receiver Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter receiver's name"
          value={receiver}
          onChangeText={setReceiver}
        />

        {/* Amount Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Notes Input (Optional) */}
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Optional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
        <Text style={styles.sendButtonText}>Send Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notesInput: {
    height: 100, // Multiline support for notes
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
