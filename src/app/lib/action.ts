"use server";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";
import { Loan } from "./definitions";

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'loan-data.json');

export async function updateLoanData(formData: FormData) {
  interface LoanData {
    amount: number;
    interest: number;
    term: number;
    date: string;
  }

  const data: LoanData = {
    amount: Number(formData.get("amount")),
    interest: Number(formData.get("interest")),
    term: Number(formData.get("term")),
    date: formData.get("date") as string,
  };

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ loanData: data }, null, 2));
  await new Promise(resolve => setTimeout(resolve, 500));
  revalidatePath("/");
  return data;
}

export async function getLoanData():Promise<Loan> {
  const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf8"));
  return data.loanData;
}
