export type Recipient = {
  _id: string;
  name: string;
  phone: string;
  bankDetails: string;
};

export type TransferState = {
  recipient: Recipient | null;
  amount: string;
  notes: string;
};
