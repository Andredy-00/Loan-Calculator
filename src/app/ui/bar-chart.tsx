"use client";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TableProps } from "../lib/definitions";
import { transformData } from "../lib/utils";

// Función para formatear números como pesos colombianos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // No mostrar decimales
  }).format(value);
};

export default function BarChart(data: TableProps) {
  const dataTransformed = transformData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={dataTransformed}
        margin={{ top: 20, right: 50, left: 50, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          angle={-45} // Rotar las etiquetas 45 grados
          textAnchor="end" // Alinear el texto correctamente
          interval={0} // Mostrar todas las etiquetas
          tick={{ fontSize: 9, fill: "#333333" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={formatCurrency} // Formatear valores del eje Y derecho
          tick={{ fontSize: 12, fill: "#333333" }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={formatCurrency} // Formatear valores del eje Y izquierdo
          tick={{ fontSize: 12, fill: "#333333" }}
        />
        <Tooltip formatter={(value) => formatCurrency(value as number)} />{" "}
        {/* Formatear valores en el Tooltip */}
        <Legend />
        <Bar
          yAxisId="right"
          stackId="a"
          dataKey="principal"
          barSize={80}
          fill="#88A825"
        />
        <Bar
          yAxisId="right"
          stackId="a"
          dataKey="interest"
          barSize={80}
          fill="#ED8C2B"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="balance"
          stroke="#B8204C"
          strokeWidth={2}
          dot={{ fill: "#B8204C", r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
