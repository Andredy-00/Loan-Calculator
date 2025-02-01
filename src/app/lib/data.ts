import { getLoanData } from "./action";
import { agruparPorAno, calcularPago, calculateEmiMora } from "./utils";

export function fetchLoanData() {
  return getLoanData().then((loanData) => {
    const { amount, interest, term, date } = loanData;
    const fechaInicio = new Date(`${date}-01T00:00:00`);
    const newPayments = calcularPago(amount, interest, term, fechaInicio);
    const data = agruparPorAno(newPayments);
    return data;
  });
}

export function fetchEmiMora() {

  return getLoanData().then((loanData) => {
    const { amount, interest, term, date, feesCharges } = loanData;
    const fechaInicio = new Date(`${date}-01T00:00:00`);
    const newPayments = calcularPago(amount, interest, term, fechaInicio);
    const data = agruparPorAno(newPayments);
    const emi = calculateEmiMora(data, feesCharges!);
    return emi;
  });
  
  


}
