"use client";
import { useEffect, useState } from "react";
import { Loan, Payment, TableProps } from "../lib/definitions";
import { agruparPorAno, calcularPago } from "../lib/utils";

export default function Table({ loanData }: TableProps) {
  const [payments, setPayments] = useState<Payment[]>([])
  const [pagoPorAno, setPagoPorAno] = useState<Record<string, Payment[]>>({})
  const [expandedYear, setExpandedYear] = useState<string | null>(null)

  useEffect(() => {
    if (loanData) {
      const { amount, interest, term, date } = loanData
      const fechaInicio = new Date(`${date}-01T00:00:00`)
      const newPayments = calcularPago(amount!, interest!, term!, fechaInicio)
      setPayments(newPayments)
      setPagoPorAno(agruparPorAno(newPayments))
      console.log(payments);
      
    }
  }, [loanData])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tabla de Amortización</h1>
        <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Año</th>
                <th className="px-6 py-4 text-right">Principal</th>
                <th className="px-6 py-4 text-right">Interés</th>
                <th className="px-6 py-4 text-right">Pago Total A + B</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-right">Prestamo pagado hasta la fecha</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pagoPorAno).map(([ano, pagos]) => {
                const totalInteresAno = pagos.reduce(
                  (sum, pago) => sum + pago.interest,
                  0
                );
                const totalPrincipalAno = pagos.reduce(
                  (sum, pago) => sum + pago.principal,
                  0
                );
                const totoalPagoAno = pagos.reduce(
                  (sum, pago) => sum + pago.total,
                  0
                );
                const ultimoBalanceAno = pagos[pagos.length - 1].balance;
                const ultimoPorcentajePagado =
                  pagos[pagos.length - 1].percentagePaid;

                return (
                  <>
                    <tr key={ano} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedYear(expandedYear === ano ? null : ano)
                          }
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          type="button"
                        >
                          <span className="transition-transform duration-200" style={{
                            transform: expandedYear === ano ? 'rotate(90deg)' : 'rotate(0deg)'
                          }}>▶</span>
                          {ano}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">{totalPrincipalAno.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                      <td className="px-6 py-4 text-right">{totalInteresAno.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                      <td className="px-6 py-4 text-right">{totoalPagoAno.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                      <td className="px-6 py-4 text-right">{ultimoBalanceAno.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>                      <td className="px-6 py-4 text-right">{ultimoPorcentajePagado.toFixed(2)}%</td>
                    </tr>

                    {expandedYear === ano && (
                      <>
                        {pagos.map((pago: Payment) => (
                          <tr 
                            key={`${ano}-${pago.month}`} 
                            className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out"
                            style={{
                              animation: 'slideDown 1s ease-out forwards'
                            }}
                          >
                            <td className="px-6 py-3 pl-12">{pago.monthName}</td>
                            <td className="px-6 py-3 text-right">{pago.principal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            <td className="px-6 py-3 text-right">{pago.interest.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            <td className="px-6 py-3 text-right">{pago.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            <td className="px-6 py-3 text-right">{pago.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>                            <td className="px-6 py-3 text-right">{pago.percentagePaid.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
              max-height: 0;
            }
            to {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
