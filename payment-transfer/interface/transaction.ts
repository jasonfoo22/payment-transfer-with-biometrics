export enum TransactionType {
  SEND_MONEY = 'Send Money',
  PAY_BILLS = 'Pay Bills',
  RECEIVE_MONEY = 'Receive Money',
  TOP_UP = 'Top-Up',
}

export enum TopUpMethodType {
  DUIT_NOW = 'DuitNow',
  CREDIT_CARD = 'Credit Card',
}

export type Transaction = {
  _id: string;
  type: TransactionType;
  amount: number;
  createdAt: string;
  receiverId?: string;
  receiverName?: string;
  senderId?: string;
  senderName?: string;
  notes?: string;
  topUpMethod?: TopUpMethodType;
};

export type User = {
  _id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
};
