import { getLoanData } from "./action";
import { agruparPorAno, calcularPago } from "./utils";


export async function fetchLoanData() {

  const {amount, interest, term, date} = await getLoanData();
  const fechaInicio = new Date(`${date}-01T00:00:00`);
  const newPayments = calcularPago(amount!, interest!, term!, fechaInicio);
  const data = agruparPorAno(newPayments);
  
  return data;
  
}