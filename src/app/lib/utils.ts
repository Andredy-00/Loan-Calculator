import { Payment } from "./definitions";


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
  

  
  export const calcularPago = (
    principal: number,
    annualInterestRate: number,
    years: number
  ): Payment[] => {

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    let balance = principal;
    const payments: Payment[] = [];
  
    for (let i = 0; i < numberOfPayments; i++) {
      const interest = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      const percentagePaid = ((principal - balance) / principal) * 100;
  
      payments.push({
        year: Math.floor(i / 12) + 1,
        month: (i % 12) + 1,
        principal: principalPayment,
        interest: interest,
        total: monthlyPayment,
        balance: balance,
        percentagePaid: percentagePaid,
      });
    }
  
    return payments;
  };