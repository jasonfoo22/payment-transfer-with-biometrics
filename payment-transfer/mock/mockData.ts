import { TopUpMethodType, TransactionType, User } from '@/interface/transaction';

export const mockUserData: { user: User } = {
  user: {
    _id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Jason Foo',
    balance: 5100.4,
    transactions: [
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca427',
        type: TransactionType.SEND_MONEY,
        amount: 200.0,
        createdAt: '2025-01-21T14:30:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        receiverId: '8c21b9f0-5e12-42d9-8a1f-3b5d5c1a6bff',
        receiverName: 'Alice',
        notes: 'Dinner split',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca428',
        type: TransactionType.PAY_BILLS,
        amount: 150.0,
        createdAt: '2025-01-20T09:15:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        receiverId: '9f8b7c6d-5e4a-3b2c-1d0e-9a8b7c6d5e4a',
        receiverName: 'TNB Sdn Bhd',
        notes: 'Electricity bill payment',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca429',
        type: TransactionType.RECEIVE_MONEY,
        amount: 500.0,
        createdAt: '2025-01-19T18:45:00Z',
        senderId: 'ad52f23c-9f7a-45a8-b1b9-3cdaab15b998',
        senderName: 'Michael',
        receiverId: '550e8400-e29b-41d4-a716-446655440000',
        receiverName: 'Jason Foo',
        notes: 'Loan repayment',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca430',
        type: TransactionType.PAY_BILLS,
        amount: 100.0,
        createdAt: '2025-01-18T22:10:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        receiverId: 'e31d28c9-6f8b-4b1d-a91c-4c573d1e68ef',
        receiverName: 'Syabas Sdn Bhd',
        notes: 'Water bill payment',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca431',
        type: TransactionType.SEND_MONEY,
        amount: 50.0,
        createdAt: '2025-01-17T12:00:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        receiverId: 'e31d28c9-6f8b-4b1d-a91c-4c573d1e68ef',
        receiverName: 'David',
        notes: 'Gift for birthday',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca432',
        type: TransactionType.TOP_UP,
        amount: 300.0,
        createdAt: '2014-12-16T05:30:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        topUpMethod: TopUpMethodType.CREDIT_CARD,
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca433',
        type: TransactionType.SEND_MONEY,
        amount: 80.0,
        createdAt: '2014-12-15T17:20:00Z',
        senderId: '550e8400-e29b-41d4-a716-446655440000',
        senderName: 'Jason Foo',
        receiverId: '4a5f6b7c-8d9e-4e0a-97b1-2d3e4f5a6b7c',
        receiverName: 'Samantha',
        notes: 'Movie tickets',
      },
      {
        _id: '1b4e28ba-2fa1-11d2-883f-0016d3cca434',
        type: TransactionType.RECEIVE_MONEY,
        amount: 200.0,
        createdAt: '2025-01-14T08:10:00Z',
        senderId: '7c8d9e0a-1b2c-3d4e-5f6a-7b8c9d0e1a2b',
        senderName: 'Emily',
        receiverId: '550e8400-e29b-41d4-a716-446655440000',
        receiverName: 'Jason Foo',
        notes: 'Refund from online purchase',
      },
    ],
  },
};
