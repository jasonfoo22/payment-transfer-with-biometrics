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
  id: number;
  type: TransactionType;
  amount: number;
  createdAt: string;
  receiver?: string;
  sender?: string;
  notes?: string;
  topUpMethod?: TopUpMethodType;
};

export type User = {
  id: number;
  name: string;
  balance: number;
  transactions: Transaction[];
};

export const mockUserData: { user: User } = {
  user: {
    id: 1,
    name: 'Jason Foo',
    balance: 5100.4,
    transactions: [
      {
        id: 1,
        type: TransactionType.SEND_MONEY,
        amount: 200,
        createdAt: '2025-02-21T14:30:00Z',
        receiver: 'Alice',
        notes: 'Dinner split',
      },
      {
        id: 2,
        type: TransactionType.PAY_BILLS,
        amount: 150,
        createdAt: '2025-02-20T09:15:00Z',
        notes: 'Electricity bill payment',
      },
      {
        id: 3,
        type: TransactionType.RECEIVE_MONEY,
        amount: 500,
        createdAt: '2025-02-19T18:45:00Z',
        sender: 'Michael',
        notes: 'Loan repayment',
      },
      {
        id: 4,
        type: TransactionType.PAY_BILLS,
        amount: 100,
        createdAt: '2025-02-18T22:10:00Z',
        notes: 'Water bill payment',
      },
      {
        id: 5,
        type: TransactionType.SEND_MONEY,
        amount: 50,
        createdAt: '2025-02-17T12:00:00Z',
        receiver: 'David',
        notes: 'Gift for birthday',
      },
      {
        id: 6,
        type: TransactionType.TOP_UP,
        amount: 300,
        createdAt: '2025-02-16T05:30:00Z',
        topUpMethod: TopUpMethodType.CREDIT_CARD,
      },
      {
        id: 7,
        type: TransactionType.SEND_MONEY,
        amount: 80,
        createdAt: '2025-02-15T17:20:00Z',
        receiver: 'Samantha',
        notes: 'Movie tickets',
      },
      {
        id: 8,
        type: TransactionType.RECEIVE_MONEY,
        amount: 200,
        createdAt: '2025-02-14T08:10:00Z',
        sender: 'Emily',
        notes: 'Refund from online purchase',
      },
    ],
  },
};
