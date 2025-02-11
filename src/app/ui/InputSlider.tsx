"use client";
import { useEffect, useState } from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Mark } from "../lib/definitions";
import { Box, Slider } from "@mui/material";

interface initialValues {
  numberformat: number;
}

const initialValues: initialValues = {
  numberformat: 500000,
};

interface InputSliderProps {
  title: string;
  name: string;
  min: number;
  max: number;
  step: number;
  formValue: number;
  markers: Mark[];
  simbol?: string;
  onChange: (name:string, value: number) => void;
}

export default function InputSlider(props: InputSliderProps) {
  const { title, name, min, max, step, formValue, markers, simbol, onChange } = props;

  const [values, setValues] = useState<initialValues>(initialValues);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  /* Evento change Input*/
  const handleChange = (values: NumberFormatValues) => {
    const { floatValue } = values;

    setValues({
      ...values,
      numberformat: floatValue || 0, // Usar 0 como valor por defecto si floatValue es undefined
    });
  };

  /* Evento change Slider */
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValues({
      ...values,
      numberformat: newValue as number, // Asegúrate de que newValue sea un número
    });
  };

  /* Evento focus */
  const handleBlur = () => {
    sendData();
  };

  /* Evento keydown */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  /* Función que se ejecuta cuando el usuario suelta el slider */
  const handleSliderChangeCommitted = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    sendData();
  };

  /* Inicializar estados */
  useEffect(() => {
    /* setPreviousValue(values.numberformat); */
    setValues({
      ...values,
      numberformat: formValue,
    });

    console.log(formValue);
    
  }, [formValue]);

  const sendData = () => {
    console.log(`${values.numberformat} : ${formValue}`);
    
    if (values.numberformat !== formValue) {
      /* console.log("Enviar data: " + values.numberformat); */
      /* setPreviousValue(values.numberformat); */
      onChange(name, values.numberformat);
    }
  };

  return (
    <div className="mb-8">
      <div className="w-full flex items-center justify-center gap-8 mb-1">
        <h2 className="text-base">{title}</h2>
        <div className="flex items-center">
          <NumericFormat
            value={values.numberformat}
            onValueChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            thousandSeparator
            valueIsNumericString
            prefix="$"
            name="numberformat"
            className="p-2 border border-gray-300 rounded-l-md text-left text-normal color-form-input bg-gray-100 w-64 focus:outline-none"
          />
          <div className="border border-gray-300 border-l-0 rounded-r-md h-full grid place-items-center w-8 p-2 bg-currency">
            <span>{simbol}</span>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%", padding: "0" }}>
        <Slider
          value={values.numberformat}
          min={min}
          max={max}
          step={step}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
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
    </div>
  );
}
