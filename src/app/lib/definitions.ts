export interface Payment {
    year: number;
    month: number;
    principal: number;
    interest: number;
    total: number;
    balance: number;
    percentagePaid: number;
  }

export type Loan = {
  principal: number;
  interestRate: number;
  loanTenure: number;
}