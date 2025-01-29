import { Loan } from "./definitions";

export function fetchLoanData():Loan | null {
  if (typeof window !== 'undefined') {
      const data = localStorage.getItem('loanData');
      return data ? JSON.parse(data) : null;
    }
    return null;
  
}