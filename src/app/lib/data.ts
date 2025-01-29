import { getLoanData } from "./action";
import { agruparPorAno, calcularPago } from "./utils";

export function fetchLoanData() {
  return getLoanData().then((loanData) => {
    const { amount, interest, term, date } = loanData;
    const fechaInicio = new Date(`${date}-01T00:00:00`);
    
    const newPayments = calcularPago(amount, interest, term, fechaInicio);
    const data = agruparPorAno(newPayments);
    
    return data;
  });
}
