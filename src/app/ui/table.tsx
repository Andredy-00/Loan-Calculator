"use client";
import { DataProps, Payment } from "../lib/definitions";
import { useState, useCallback } from "react";
import React from "react";

export default function Table({ data }: DataProps) {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  // Memorizar la función para evitar recrearla en cada render
  const handleExpandYear = useCallback(
    (year: string) => {
      setExpandedYear((prev) => (prev === year ? null : year));
    },
    []
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-center">
                <th className="pb-6 bg-table-gris border-s-gris w-20 color-table-gris-oscuro">
                  Year
                </th>
                <th className="py-2 bg-table-principal border-s-gris w-44">
                  Principal <br /> (A)
                </th>
                <th className="px-4 py-2 bg-table-amarillo border-s-gris w-44">
                  Interest <br /> (B)
                </th>
                <th className="px-4 py-2 bg-table-gris border-s-gris w-64 color-table-gris-oscuro">
                  Total Payment <br /> (A + B)
                </th>
                <th className="pb-6 px-4 bg-table-rojo border-s-gris">
                  Balance
                </th>
                <th className="py-2 bg-table-gris border-s-gris w-20 color-table-gris-oscuro">
                  Loan Paid <br /> To Date
                </th>
              </tr>
            </thead>
            <tbody className="color-table-gris-oscuro-tr">
              {Object.entries(data).map(([ano, pagos]) => {
                const totalInteresAno = pagos.reduce(
                  (sum, pago) => sum + pago.interest,
                  0
                );
                const totalPrincipalAno = pagos.reduce(
                  (sum, pago) => sum + pago.principal,
                  0
                );
                const totalPagoAno = pagos.reduce(
                  (sum, pago) => sum + pago.total,
                  0
                );
                const ultimoBalanceAno = pagos[pagos.length - 1].balance;
                const ultimoPorcentajePagado =
                  pagos[pagos.length - 1].percentagePaid;

                return (
                  <React.Fragment key={ano}>
                    <tr className="border-b transition color-table-gris-oscuro-tr duration-200 text-table-size">
                      <td className="py-1 border-s-gris">
                        <div className="w-full flex items-center justify-center">
                          <button
                            onClick={() => handleExpandYear(ano)}
                            className="flex items-center gap-1 color-table-gris-oscuro font-semibold"
                            type="button"
                            aria-expanded={expandedYear === ano}
                          >
                            <div className="flex items-center justify-center w-3 h-3 border-2 border-gray-700">
                              <span className="transition-transform duration-200">
                                {expandedYear === ano ? "-" : "+"}
                              </span>
                            </div>
                            {ano}
                          </button>
                        </div>
                      </td>
                      <td className="pr-2 text-right border-s-gris">
                        {totalPrincipalAno.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                      <td className="pr-2 text-right border-s-gris">
                        {totalInteresAno.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                      <td className="pr-2 text-right border-s-gris">
                        {totalPagoAno.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                      <td className="pr-2 text-right border-s-gris">
                        {ultimoBalanceAno.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                      <td className="pr-2 text-right border-s-gris">
                        {ultimoPorcentajePagado.toFixed(2)}%
                      </td>
                    </tr>

                    {expandedYear === ano &&
                      pagos.map((pago: Payment) => (
                        <tr
                          key={`${ano}-${pago.month}`}
                          className="bg-table-gris transition duration-300 color-table-gris-oscuro-tr text-table-size"
                        >
                          <td className="text-center py-1 border-s-gris">
                            {pago.monthName}
                          </td>
                          <td className="pr-2 text-right border-s-gris">
                            {pago.principal.toLocaleString("es-CO", {
                              style: "currency",
                              currency: "COP",
                            })}
                          </td>
                          <td className="pr-2 text-right border-s-gris">
                            {pago.interest.toLocaleString("es-CO", {
                              style: "currency",
                              currency: "COP",
                            })}
                          </td>
                          <td className="pr-2 text-right border-s-gris">
                            {pago.total.toLocaleString("es-CO", {
                              style: "currency",
                              currency: "COP",
                            })}
                          </td>
                          <td className="pr-2 text-right border-s-gris">
                            {pago.balance.toLocaleString("es-CO", {
                              style: "currency",
                              currency: "COP",
                            })}
                          </td>
                          <td className="pr-2 text-right border-s-gris">
                            {pago.percentagePaid.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}