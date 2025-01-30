'use client';

import { useEffect, useState, useCallback } from 'react';
import { getLoanData, updateLoanData } from '../lib/action';

interface LoanFormValues {
  amount: number;
  interest: number;
  term: number;
  date: string;
}

const initialFormValues: LoanFormValues = {
  amount: 20000000,
  interest: 6,
  term: 4,
  date: "2025-01"
};

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export default function LoanCalculator() {
  const [pending, setPending] = useState(false);
  const [formValues, setFormValues] = useState<LoanFormValues>(initialFormValues);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await getLoanData();
        setFormValues(data);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };
    loadInitialData();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'date' ? value : Number(value)
    }));
  }, []);

  const handleMouseUp = useCallback(async () => {
    try {
      setPending(true);
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      await updateLoanData(formData);
    } catch (error) {
      console.error('Error updating loan data:', error);
    } finally {
      setPending(false);
    }
  }, [formValues]);

  const renderSliderSection = (
    title: string,
    name: keyof LoanFormValues,
    min: number,
    max: number,
    step: number,
    displayValue: string,
    markers: string[]
  ) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <input
        type="text"
        value={displayValue}
        readOnly
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-left text-lg font-semibold bg-gray-100"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={formValues[name]}
        onChange={handleInputChange}
        onMouseUp={handleMouseUp}
        name={name}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        {markers.map((marker, index) => (
          <span key={index}>{marker}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {renderSliderSection(
        "Monto del Préstamo",
        "amount",
        0,
        20000000,
        100000,
        currencyFormatter.format(formValues.amount),
        ["$0", "$5M", "$10M", "$15M", "$20M"]
      )}

      {renderSliderSection(
        "Tasa de Interés",
        "interest",
        5,
        20,
        0.25,
        `${formValues.interest}%`,
        ["5%", "7.5%", "10%", "12.5%", "15%", "17.5%", "20%"]
      )}

      {renderSliderSection(
        "Plazo del Préstamo",
        "term",
        0,
        30,
        0.5,
        `${formValues.term} Años`,
        ["0", "5", "10", "15", "20", "25", "30"]
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Seleccionar Mes</h2>
        <input
          type="month"
          value={formValues.date}
          onChange={handleInputChange}
          onBlur={handleMouseUp}
          name="date"
          className="w-full p-2 border border-gray-300 rounded-md text-left text-lg font-semibold bg-gray-100"
          disabled={pending}
        />
      </div>
    </div>
  );
}