"use client";

import { useEffect, useState, useCallback } from "react";
import { getLoanData, updateLoanData } from "../lib/action";
import { EmiMora, LoanData, Mark } from "../lib/definitions";
import { Box, Slider } from "@mui/material";
import PieChartComponent from "./pie-chart";
import CheckIcon from "@mui/icons-material/Check";

const initialFormValues: LoanData = {
  amount: 20000000,
  interest: 6,
  term: 4,
  date: "2025-01",
  feesCharges: 0,
};

// todo: Crear funcion reutilizable
const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function LoanCalculator({ data }: { data: EmiMora }) {
  
  const [formValues, setFormValues] = useState<LoanData>(initialFormValues);
  const [inputValues, setInputValues] = useState<LoanData>(initialFormValues);

  // Carga los datos iniciales desde el servidor
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await getLoanData();
        setFormValues(data);
      } catch (error) {
        // todo: Implementar manejo de errores
        console.error("Error loading initial data:", error);
      }
    };
    loadInitialData();
  }, []);


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);


  const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    
    const { name, value } = e.target 

    setInputValues((prev) => ({...prev, [name]: parseInt(value)})); // Actualizamos el estado  
    console.log(inputValues);
    
  };

  const handleMouseUp = useCallback(async () => {
    try {
      
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      await updateLoanData(formData);
    } catch (error) {
      console.error("Error updating loan data:", error);
    } finally {
      // todo: pendiente de implementar el toast
    }
  }, [formValues]);

  const handleSliderChange =
    (name: keyof LoanData) => (event: Event, value: number | number[]) => {
      setFormValues((prev) => ({
        ...prev,
        [name]: Number(value), // Asegúrate de que el valor sea un número
      }));
    };

    function valuetext(value: number) {
      return `${value}`;
    }

  const renderSliderSection = (
    title: string,
    name: keyof LoanData,
    min: number,
    max: number,
    step: number,
    displayValue: string,
    markers: Mark[],
    simbol?: string,
  ) => (
    <div className="mb-8">
      <div className="w-full flex items-center justify-center gap-8 mb-1">
        <h2 className="text-base">{title}</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={displayValue}
            onChange={handleInpChange}
            className="p-2 border border-gray-300 rounded-l-md text-left text-normal color-form-input bg-gray-100 w-64 focus:outline-none"
          />
          <div className="border border-gray-300 border-l-0 rounded-r-md h-full grid place-items-center w-8 p-2 bg-currency">
            <span>{simbol}</span>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%", padding: "0" }}>
        <Slider
          value={Number(formValues[name])}
          min={min}
          max={max}
          step={step}
          onChange={handleSliderChange(name)}
          onMouseUp={handleMouseUp}
          marks={markers}
          sx={{
            color: "#ED8C2B",
            height: 7,
            "& .MuiSlider-thumb": {
              backgroundColor: "#ED8C2B",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "#ED8C2B",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#969696",
            },
          }}
        />
      </Box>
      {/* Markers */}
     {/*  <div className="flex justify-between text-xs text-gray-600">
        {markers.map((marker, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="rayita-slider"></div>
            <span>{marker}</span>
          </div>
        ))}
      </div> */}
    </div>
  );

  return (
    <div className="w-8/12 bg-gris-principal border-s-gris">
      <div className="p-6 pb-2">

        <input type="text" name="amount" value={currencyFormatter.format(formValues.amount)} onChange={handleInputChange} />

        {renderSliderSection(
          "Loan Amount",
          "amount",
          0,
          1000000,
          100000,
          currencyFormatter.format(formValues.amount),
          [{
            value: 0,
            label: '0',
            },
            {
            value: 250000,
            label: '250k',
            },
            {
            value: 500000,
            label: '500k',
            },
            {
            value: 750000,
            label: '750k',
            },
            {
              value: 1000000,
              label: '1M',
              },
           ],
          "$"
        )}

        {renderSliderSection(
          "Interest Rate",
          "interest",
          5,
          20,
          0.25,
          `${formValues.interest}`,
          [{
            value: 5,
            label: '5%',
            },
            {
              value: 10,
              label: '10%',
              },
              {
                value: 15,
                label: '15%',
                },
                {
                  value: 20,
                  label: '20%',
                  },
            ],
          "%"
        )}

        {renderSliderSection(
          "Loan Tenure",
          "term",
          0,
          30,
          0.5,
          `${formValues.term}`,
          [{
            value: 0,
            label: '0',
            },
            {
              value: 10,
              label: '10',
              },
              {
                value: 20,
                label: '20',
                },
                {
                  value: 30,
                  label: '30',
                  },
          ],
          "Yr"
        )}

        {renderSliderSection(
          "Fees & Charges",
          "feesCharges",
          0,
          100000,
          10000,
          currencyFormatter.format(formValues.feesCharges!),
          [
            {
              value: 0,
              label: '0',
              },
              {
                value: 20000,
                label: '20k',
                },

                {
                  value: 40000,
                  label: '40k',
                  },

                  {
                    value: 60000,
                    label: '60k',
                    },

                    {
                      value: 80000,
                      label: '80k',
                      },

                      {
                        value: 100000,
                        label: '100k',
                        },
          ],
          "$",
        )}

        <div className="w-full flex items-center justify-center gap-5 p-3">
          <h1>EMI Scheme</h1>
          <div className="bg-form-content p-2 px-3 rounded-md flex items-center gap-1">
            <CheckIcon style={{ color: "#212529", fontSize: '20px', stroke: '#212529', strokeWidth: 2 }} />
            <h1>EMI in Arrears</h1>
          </div>
        </div>
      </div>

      <div className="w-full flex border-t color-border-gris border-b">
        <div className="w-2/4">
          <div className="border-b border-dashed color-border-gris p-3 grid place-items-center gap-3 pt-5">
            <h3 className="color-form-input">Loan EMI</h3>
            <h1 className="font-medium text-3xl">
              {currencyFormatter.format(data.loanEmi)}
            </h1>
          </div>
          <div className="border-b border-dashed color-border-gris p-3 grid place-items-center gap-3">
            <h3 className="color-form-input">Loan APR</h3>
            <h1 className="font-medium text-xl">{data.loanApr.toFixed(2)}%</h1>
          </div>
          <div className="border-b border-dashed color-border-gris p-3 grid place-items-center gap-3">
            <h3 className="color-form-input">Total Interest Payable</h3>
            <h1 className="font-medium text-xl">
              {currencyFormatter.format(data.totalInterestPayable)}
            </h1>
          </div>
          <div className="p-3 grid place-items-center gap-3 text-center pt-7">
            <h3 className="color-form-input">
              Total Payment <br /> (Principal + Interest + Fees & Charges)
            </h3>
            <h1 className="font-medium text-xl">
              {currencyFormatter.format(data.totalPayment)}
            </h1>
          </div>
        </div>
        <div className="w-2/4 text-center border-l color-border-gris p-3">
          <h1 className="font-medium">Break-up of Total Payment</h1>
          <PieChartComponent data={data} />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-4">
        <h2 className="text-base ">
          Schedule showing EMI payments starting from
        </h2>
        <input
          type="month"
          value={formValues.date}
          onChange={handleInputChange}
          onBlur={handleMouseUp}
          name="date"
          className="w-56 p-2 border border-gray-300 rounded-md text-left text-lg color-form-input pl-3 bg-white "
        />
      </div>
    </div>
  );
}
