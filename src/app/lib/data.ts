
export async function fetchLoanData() {
  if (typeof window !== 'undefined') {
      const data = localStorage.getItem('data');
      return data ? JSON.parse(data) : null;
    }
    return null;
  
}