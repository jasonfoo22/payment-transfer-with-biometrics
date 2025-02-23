import { Transaction, TransactionType } from '@/interface/transaction';
import { TransferState } from '@/interface/transfer';
import { mockUserData } from '@/mock/mockData';

export const mockTransferApi = async ({
  recipient,
  amount,
  notes,
}: TransferState): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        // 80% success rate, adjust this if you want see the API fail
        resolve({
          _id: `${Date.now()}`, // Generate a unique ID
          type: TransactionType.SEND_MONEY,
          amount: parseFloat(amount),
          createdAt: new Date().toISOString(),
          senderId: mockUserData.user._id, //hardcode for now, should be from auth
          senderName: mockUserData.user.name, //hardcode for now, should be from auth
          receiverId: recipient?._id,
          receiverName: recipient?.name,
          notes,
        });
      } else {
        reject(new Error('Network error. Please try again.'));
      }
    }, 1500); // Simulating 1.5s API delay
  });
};
