export interface Payment {
  year: number;
  month: number;
  monthName?: string;
  principal: number;
  interest: number;
  total: number;
  balance: number;
  percentagePaid: number;
  feesCharges?: number;
}
export interface DataProps {
  data: Record<number, Payment[]>
}

export type Loan = {
  amount: number;
  interest: number;
  term: number;
  date: string;
};

export interface BarChart {
  year:string,
  principal:number,
  interest:number,
  totalPayment:number,
  balance:number,
}
