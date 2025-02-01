"use client";  

import { useEffect, useState, useCallback } from "react";  
import { getLoanData, updateLoanData } from "../lib/action";  
import { LoanData } from "../lib/definitions";  
import { Box, Slider } from "@mui/material";  

const initialFormValues: LoanData = {  
  amount: 20000000,  
  interest: 6,  
  term: 4,  
  date: "2025-01",
  feesCharges: 0,
};  

const currencyFormatter = new Intl.NumberFormat("es-CO", {  
  style: "currency",  
  currency: "COP",  
  maximumFractionDigits: 0,  
});  

export default function LoanCalculator() {  
  const [pending, setPending] = useState(false);  
  const [formValues, setFormValues] = useState<LoanData>(initialFormValues);  

  useEffect(() => {  
    const loadInitialData = async () => {  
      try {  
        const data = await getLoanData();  
        setFormValues(data);  
      } catch (error) {  
        console.error("Error loading initial data:", error);  
      }  
    };  
    loadInitialData();  
  }, []);  

  const handleInputChange = useCallback(  
    (e: React.ChangeEvent<HTMLInputElement>) => {  
      const { name, value } = e.target;  
      setFormValues((prev) => ({  
        ...prev,  
        [name]: name === "date" ? value : Number(value),  
      }));  
    },  
    []  
  );  

  const handleMouseUp = useCallback(async () => {  
    try {  
      setPending(true);  
      const formData = new FormData();  
      Object.entries(formValues).forEach(([key, value]) => {  
        formData.append(key, value.toString());  
      });  
      await updateLoanData(formData);  
    } catch (error) {  
      console.error("Error updating loan data:", error);  
    } finally {  
      setPending(false);  
    }  
  }, [formValues]);  

  const handleSliderChange = (name: keyof LoanData) => (event: Event, value: number | number[]) => {  
    setFormValues((prev) => ({  
      ...prev,  
      [name]: Number(value), // Asegúrate de que el valor sea un número  
    }));  
  };  

  const renderSliderSection = (  
    title: string,  
    name: keyof LoanData,  
    min: number,  
    max: number,  
    step: number,  
    displayValue: string,  
    markers: string[],  
    simbol?: string  
  ) => (  
    <div className="mb-8">  
      <div className="w-full flex items-center justify-center gap-8 mb-1">  
        <h2 className="text-base">{title}</h2>  
        <div className="flex items-center">  
          <input  
            type="text"  
            value={displayValue}  
              
            className="p-2 border border-gray-300 rounded-l-md text-left text-normal color-form-input bg-gray-100 w-64"  
          />  
          <div className="border border-gray-300 border-l-0 rounded-r-md h-full grid place-items-center w-8 p-2 bg-currency">  
            <span>{simbol}</span>  
          </div>  
        </div>  
      </div>  
      <Box sx={{ width: '100%' }}>  
        <Slider  
          value={Number(formValues[name])} // Asegúrate de que sea un número  
          min={min}  
          max={max}  
          step={step}  
          onChange={handleSliderChange(name)} // Llama a la función adaptada para manejar cambios  
          onMouseUp={handleMouseUp}   
          sx={{  
            color: '#ED8C2B',  
            height: 7,  
            '& .MuiSlider-thumb': {  
              backgroundColor: '#ED8C2B',  
              boxShadow: 'none',  
              '&:hover': {  
                boxShadow: 'none',  
              },  
              '&:active': {  
                boxShadow: 'none',  
              },  
            },  
            '& .MuiSlider-track': {  
              backgroundColor: '#ED8C2B',  
            },  
            '& .MuiSlider-rail': {  
              backgroundColor: '#969696',  
            },  
          }}  
        />  
      </Box>  
      {/* Markers */}  
      <div className="flex justify-between text-xs text-gray-600">  
        {markers.map((marker, index) => (  
          <div key={index} className="flex flex-col items-center">  
            <div className="rayita-slider"></div>  
            <span>{marker}</span>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  

  return (  
    <div className="p-6 w-8/12 bg-gris-principal border-s-gris">  
      {renderSliderSection(  
        "Loan Amount",  
        "amount",  
        0,  
        20000000,  
        100000,  
        currencyFormatter.format(formValues.amount),  
        ["0", "2.5M", "5M", "7.5M", "10M", "12.5M", "15M", "17.5M", "20M"],  
        "$"  
      )}  

      {renderSliderSection(  
        "Interest Rate",  
        "interest",  
        5,  
        20,  
        0.25,  
        `${formValues.interest}`,  
        ["5%", "7.5%", "10%", "12.5%", "15%", "17.5%", "20%"],  
        "%"  
      )}  

      {renderSliderSection(  
        "Loan Tenure",  
        "term",  
        0,  
        30,  
        0.5,  
        `${formValues.term}`,  
        ["0", "5", "10", "15", "20", "25", "30"]  
      )}

      {renderSliderSection(  
        "Fees & Charges",  
        "feesCharges",  
        0,  
        1000000,  
        10000,  
        currencyFormatter.format(formValues.feesCharges!),  
        ["0", "20K", "40K", "60K", "80K", "100K"],
        "$"
      )}  

      <div>  
        <h2 className="text-lg font-semibold mb-4">  
          Schedule showing EMI payments starting from  
        </h2>  
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