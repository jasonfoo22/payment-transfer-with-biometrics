import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { HeaderWithBackBtn } from '@/components/HeaderWithBackBtn';
import { Routes } from '@/constants/Routes';
import { useDispatch } from 'react-redux';
import { setRecipient } from '@/store/slices/transferSlice';

export default function SelectContact() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow contact access to select a receiver.');
        router.back();
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      const validContacts = data.filter(contact => contact.phoneNumbers?.length);
      setContacts(validContacts);
      setFilteredContacts(validContacts);
      setLoading(false);
    };

    fetchContacts();
  }, [router]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredContacts(contacts);
      return;
    }
    const filtered = contacts.filter(contact =>
      contact.name?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredContacts(filtered);
  };

  const selectContact = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers?.[0]?.number && contact.name) {
      const phoneNumber = contact.phoneNumbers?.[0]?.number;
      const contactName = Array.isArray(contact.name) ? contact.name.join(' ') : contact.name;

      // Ideally, we should call an API to fetch the user's DuitNow or bank details
      try {
        // const bankDetails = await getUserBankDetails(contact.id); // Mock API call
        dispatch(
          setRecipient({
            _id: contact.id || '',
            name: contactName,
            phone: phoneNumber,
            bankDetails: 'CIMB Bank, 1234567890', // Mock bank details
          }),
        );
        router.push(Routes.transfer.sendMoney);
      } catch (error) {
        console.error('Failed to fetch bank details:', error);
        Alert.alert(
          'Oops! Something went wrong',
          'We couldn’t fetch the bank details. Please try again in a moment.',
        );
      }
    }
  };

  if (loading) {
    return (
      <ContentLayoutView>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" />
        </View>
      </ContentLayoutView>
    );
  }

  return (
    <ContentLayoutView>
      <HeaderWithBackBtn title="Select Contact" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id || ''}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectContact(item)} style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && (
              <Text style={styles.phoneNumber}>{item.phoneNumbers[0].number}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  contactItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    color: '#838383',
  },
});
