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

export interface LoanData {
  amount: number;
  interest: number;
  term: number;
  date: string;
  feesCharges?: number;
}

export interface BarChart {
  year:string,
  principal:number,
  interest:number,
  totalPayment:number,
  balance:number,
}

export interface EmiMora {
  loanEmi: number,
  loanApr: number,
  totalInterestPayable: number,  
  totalPayment: number,
  totolPrincipal?: number,
  feesCharges?: number,
}

export interface EmiMoraProps {
  data: EmiMora;
}

export interface TotalData {
  Year: string,
  principal:number,
  interest:number,
  loanEmi: number
}
