export interface User {
  id: string;
  email: string;
  name: string;
  tickets: number;
  totalWinnings: number;
  referralCode: string;
  joinDate: string;
  lastActivity?: string;
 lastTicketPurchase?: string | null;
}

export interface UserTicket {
  id: string;
  type: 'jackpot' | 'megaJackpot';
  purchaseDate: string;
  drawDate: string;
  status: 'active' | 'completed';
  prize: string;
  prizeEur: string;
  ticketNumber: string;
  transactionHash: string;
  lotteryName: string;
  ticketPrice: number;
}

export interface Lottery {
  id: string;
  type: 'weekly' | 'monthly';
  prize: number;
  drawDate: string;
  ticketsRequired: number;
  participants: number;
  status: 'active' | 'drawing' | 'completed';
  winner?: string;
}

export interface Ticket {
  id: string;
  lotteryId: string;
  userId: string;
  purchaseDate: string;
  numbers?: number[];
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'ticket_purchase' | 'winnings';
  amount: number;
  currency: 'Bitcoin' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  txHash?: string;
}