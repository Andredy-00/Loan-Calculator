"use client";

import { useEffect, useState } from "react";
import { getLoanData, updateLoanData } from "../lib/action";

export default function CreateForm() {
  const [pending, setPending] = useState(false);
  const [formValues, setFormValues] = useState({
    amount: 0,
    interest: 1,
    term: 1,
    date: "2025-01"
  });

  useEffect(() => {
    const loadInitialData = async () => {
      const data = await getLoanData();
      setFormValues(data);
    };
    loadInitialData();
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    
    // Update local state first
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Then update server
    const formData = new FormData();
    formData.append("amount", name === 'amount' ? value : formValues.amount.toString());
    formData.append("interest", name === 'interest' ? value : formValues.interest.toString());
    formData.append("term", name === 'term' ? value : formValues.term.toString());
    formData.append("date", name === 'date' ? value : formValues.date);

    setPending(true);
    await updateLoanData(formData);
    setPending(false);
  };

  return (
    <div className="border-solid border-black">
      <form
        className="w-3/5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block mb-2">
              Home Loan Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formValues.amount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
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
              value={formValues.interest}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
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
              value={formValues.term}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
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
              value={formValues.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
