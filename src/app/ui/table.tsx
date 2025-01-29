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
      console.log(date);
      
      console.log(fechaInicio);
      
      const newPayments = calcularPago(amount!, interest!, term!, fechaInicio)
      setPayments(newPayments)
      setPagoPorAno(agruparPorAno(newPayments))
    }
  }, [loanData])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Tablita de prueba</h1>
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Año</th>
              <th className="border border-gray-300 px-4 py-2">Principal</th>
              <th className="border border-gray-300 px-4 py-2">Interés</th>
              <th className="border border-gray-300 px-4 py-2">
                Pago Total A + B
              </th>
              <th className="border border-gray-300 px-4 py-2">Balance</th>
              <th className="border border-gray-300 px-4 py-2">
                Prestamo pagado hasta la fecha
              </th>
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
                  <tr key={ano}>
                    <td>
                      <button
                        onClick={() =>
                          setExpandedYear(expandedYear === ano ? null : ano)
                        }
                        className="flex items-center gap-2"
                        type="button"
                      >
                        <span>{expandedYear === ano ? "▼" : "▶"}</span>
                        {ano}
                      </button>
                    </td>
                    <td>{totalPrincipalAno.toFixed(2)}</td>
                    <td>{totalInteresAno.toFixed(2)}</td>
                    <td>{totoalPagoAno.toFixed(2)}</td>
                    <td>{ultimoBalanceAno.toFixed(2)}</td>
                    <td>{ultimoPorcentajePagado.toFixed(2)}</td>
                  </tr>

                  {expandedYear === ano && (
                    <>
                      {pagos.map((pago: Payment) => (
                        <tr key={`${ano}-${pago.month}`} className="bg-gray-50">
                          <td className="pl-8">Mes {pago.month}</td>
                          <td>{pago.principal.toFixed(2)}</td>
                          <td>{pago.interest.toFixed(2)}</td>
                          <td>{pago.total.toFixed(2)}</td>
                          <td>{pago.balance.toFixed(2)}</td>
                          <td>{pago.percentagePaid.toFixed(2)}</td>
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
    </div>
  );
}
