import { BarChart, DataProps, Payment } from "./definitions";

export const calculateCost = (
  principal: number,
  annualInterestRate: number,
  years: number
): number => {
  // Calcula la tasa de interés mensual (tasa anual dividida por 12 y convertida a decimal)
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  // Calcula el número total de pagos mensuales
  const numberOfPayments = years * 12;
  // Calcula el pago mensual usando la fórmula de amortización
  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  // Calcula el costo total multiplicando el pago mensual por el número de pagos
  const totalCost = monthlyPayment * numberOfPayments;
  // Retorna el costo total de los intereses (costo total menos el principal)
  return totalCost - principal;
};

export function calcularPago(
  principal: number,
  annualInterestRate: number,
  years: number,
  fechaInicio: Date
) {
  // Calcula la tasa de interés mensual (tasa anual dividida por 12 meses y convertida a decimal)
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  // Calcula el número total de meses del préstamo
  const totalMonths = years * 12;

  // Calcula el pago mensual usando la fórmula de amortización
  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  // Array para almacenar todos los pagos
  const payments: Payment[] = [];

  // Inicializa las variables de seguimiento
  let currentDate = new Date(fechaInicio);

  let balance = principal;
  let mesInicial = currentDate.getMonth();

  // Calcula los detalles de cada pago mensual
  for (let month = 0; month < totalMonths; month++) {
    // Calcula el interés del mes actual
    const interest = balance * monthlyInterestRate;
    // Calcula la parte del pago que va al principal
    const principalPayment = monthlyPayment - interest;
    // Actualiza el balance restante
    balance -= principalPayment;

    // Calcula el mes y año actual considerando el mes inicial
    const currentMonth = (mesInicial + month) % 12;
    const currentYear =
      fechaInicio.getFullYear() + Math.floor((mesInicial + month) / 12);

    // Agrega el pago actual al array de pagos
    payments.push({
      month: currentMonth,
      year: currentYear,
      principal: principalPayment,
      interest,
      total: monthlyPayment,
      balance: Math.max(0, balance),
      percentagePaid: ((principal - balance) / principal) * 100,
    });
  }

  return payments;
}

export function agruparPorAno(payments: Payment[]) {
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return payments.reduce((grupos, pago) => {
    const año = pago.year;
    if (!grupos[año]) {
      grupos[año] = [];
    }
    grupos[año].push({
      ...pago,
      monthName: MESES[pago.month],
    });
    return grupos;
  }, {} as Record<number, Payment[]>);
}

export const transformData = (data: DataProps): BarChart[] => {
  // Convertir el objeto en un array de [year, payments]
  const yearlyData = Object.entries(data.data).map(([year, payments]) => {
    // payments es siempre un array, según la definición de TableProps
    const totalsByYear: BarChart = {
      year, // year es un string (las claves de Object.entries son siempre strings)
      principal: payments.reduce((sum, payment) => sum + payment.principal, 0),
      interest: payments.reduce((sum, payment) => sum + payment.interest, 0),
      totalPayment: 0,
      balance: payments[payments.length - 1].balance, // Último balance del año
    };

    // Calcular el totalPayment
    totalsByYear.totalPayment = totalsByYear.principal + totalsByYear.interest;

    return totalsByYear;
  });

  return yearlyData;
};







