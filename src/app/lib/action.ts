import { Loan, Payment } from "./definitions";


export const postForm = async ( formData:Loan ) => {
  try {
      localStorage.setItem('loanData', JSON.stringify(formData));
      return { success: true };
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return { success: false, error };
    } 
}
  