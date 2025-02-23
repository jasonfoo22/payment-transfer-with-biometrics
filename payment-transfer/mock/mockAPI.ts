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
      if (Math.random() < 0.8) {
        // 80% success rate, adjust this if you want see the API fail
        resolve({
          _id: `${Date.now()}`, // Generate a unique ID
          type: TransactionType.SEND_MONEY,
          userId: mockUserData._id, //hardcode for now, should be from auth
          amount: parseFloat(amount),
          createdAt: new Date().toISOString(),
          senderId: mockUserData._id, //hardcode for now, should be from auth
          senderName: mockUserData.name, //hardcode for now, should be from auth
          receiverId: recipient?._id,
          receiverName: recipient?.name,
          receiverPhone: recipient?.phone,
          notes,
        });
      } else {
        reject(new Error('Network error. Please try again.'));
      }
    }, 1500); // Simulating 1.5s API delay
  });
};

export const mockFetchTransactionDetailsById = async (
  transactionId: string,
  transactions: Transaction[],
): Promise<Transaction | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transaction = transactions.find(tx => tx._id === transactionId);

      if (transaction) {
        resolve(transaction);
      } else {
        reject(new Error('Transaction not found.'));
      }
    }, 2000); // Simulating 1.5s API delay
  });
};
