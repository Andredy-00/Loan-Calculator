import { Payment } from "../lib/definitions";
import { calcularPago } from "../lib/utils";



export default function Table() {
  const principal = 2000000;
  const annualInterestRate = 5;
  const years = 5;
  const payments = calcularPago(principal, annualInterestRate, years);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Desglose del Crédito</h1>
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Año</th>
              <th className="border border-gray-300 px-4 py-2">Mes</th>
              <th className="border border-gray-300 px-4 py-2">Principal</th>
              <th className="border border-gray-300 px-4 py-2">Interés</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Balance</th>
              <th className="border border-gray-300 px-4 py-2">% Pagado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: Payment, index: number) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.year}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.month}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.principal.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.interest.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.total.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.balance.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.percentagePaid.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}