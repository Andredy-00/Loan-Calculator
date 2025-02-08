"use client";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

interface initialValues {
  numberformat: number;
}

const initialValues: initialValues = {
  numberformat: 0,
};

export default function InputsEx(){
  const [values, setValues] = useState<initialValues>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    console.log(values);
    
  };

  const handleBlur = () => {
    console.log("Enviar data: "+ values.numberformat);
    
  };

  return (
    <NumericFormat
      value={values.numberformat}
      onChange={handleChange}
      onBlur={handleBlur}
      thousandSeparator
      valueIsNumericString
      prefix="$"
      name="numberformat"
    />
  );
};
