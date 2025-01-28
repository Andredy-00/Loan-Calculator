import { PagoPorAno, Payment } from "./definitions";


export const calculateCost = (
    principal: number,
    annualInterestRate: number,
    years: number
  ): number => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalCost = monthlyPayment * numberOfPayments;
    return totalCost - principal;
  };
  

  
  export function calcularPago(
    principal: number,
    annualInterestRate: number,
    years: number,
    fechaInicio: Date
  ) {

    const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = years * 12;

  const monthlyPayment = 
    (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / 
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    const payments: Payment[] = [];
    
    
    let currentDate = new Date(fechaInicio);
    let balance = principal;
    let mesInicial = currentDate.getMonth();
    
    for (let month = 0; month < totalMonths; month++) {
      const interest = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      
      const currentMonth = (mesInicial + month) % 12;
      const currentYear = fechaInicio.getFullYear() + Math.floor((mesInicial + month) / 12);
  
      payments.push({
        month: currentMonth,
        year: currentYear,
        principal: principalPayment,
        interest,
        total: monthlyPayment,
        balance: Math.max(0, balance),
        percentagePaid: ((principal - balance) / principal) * 100
      });
    }
  
    return payments;
  }
  
  export function agruparPorAno(payments: Payment[]) {
    return payments.reduce((grupos, pago) => {
      const año = pago.year;
      if (!grupos[año]) {
        grupos[año] = [];
      }
      grupos[año].push(pago);
      return grupos;
    }, {} as Record<number, Payment[]>);
  }
  
  