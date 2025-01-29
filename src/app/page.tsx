'use client';

import { useState } from "react";
import { Loan } from "./lib/definitions";
import CreateForm from "./ui/create-form";
import Table from "./ui/table";

export default function Home() {

  const [loanData, setLoanData] = useState<Loan | null>(null);

  const handleLoanDataChange = (newData: Loan | null) => {
    setLoanData(newData);
  };

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
        <CreateForm onDataChange={handleLoanDataChange} />
        <Table loanData={loanData} />
      </div>
    </div>
  );
}
