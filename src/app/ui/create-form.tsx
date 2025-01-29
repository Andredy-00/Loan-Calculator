"use client";

import { useState } from "react";
import { postForm } from "../lib/action";
import { CreateFormProps } from "../lib/definitions";

export default function CreateForm({onDataChange}: CreateFormProps) {
  const [formData, setFormData] = useState({
    amount: 0,
    interest: 5,
    term: 1,
    date: "2025-01"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const handleBlur = () => {
    const loanData = postForm(formData);
    onDataChange(loanData);
  };

  return (
    <div className="border-solid border-black">
      <form className="w-3/5">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block mb-2">
              Home Loan Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label htmlFor="interest" className="block mb-2">
              Interest Rate
            </label>
            <input
              type="number"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label htmlFor="term" className="block mb-2">
              Loan Tenure
            </label>
            <input
              type="number"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label htmlFor="date" className="block mb-2">
              Select Month
            </label>
            <input
              type="month"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              onBlur={handleBlur}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
