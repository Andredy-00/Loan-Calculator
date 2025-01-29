

import { fetchLoanData } from "./data";
import { Loan } from "./definitions";

export function postForm(formData: Loan) {
  
  try {

    localStorage.setItem('loanData', JSON.stringify(formData));
    
  } catch (error) {
    console.log('Error al guardar');
    return null;
  }

  return fetchLoanData();
}

  