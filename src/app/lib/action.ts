"use server";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";
import { LoanData } from "./definitions";

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'loan-data.json');

export async function updateLoanData(formData: FormData) {
  
  const newData: LoanData = {
    amount: Number(formData.get("amount")),
    interest: Number(formData.get("interest")),
    term: Number(formData.get("term")),
    date: formData.get("date") as string,
  };

  try {
    // Leer los datos actuales
    let currentData: { loanData: LoanData } = { loanData: { amount: 0, interest: 0, term: 0, date: "" } };
    if (fs.existsSync(DATA_FILE_PATH)) {
      currentData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf8"));
    }

    // Verificar si los datos han cambiado
    if (JSON.stringify(currentData.loanData) !== JSON.stringify(newData)) {
      // Escribir los nuevos datos solo si hay cambios
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ loanData: newData }, null, 2));
      console.log("Datos actualizados correctamente.");
    } else {
      console.log("No hay cambios en los datos. No se actualiza el archivo.");
    }

    // Revalidar solo la ruta que necesita actualización
    revalidatePath("/ruta-de-tu-componente"); // Cambia esto por la ruta correcta
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    throw new Error("Error al actualizar los datos.");
  }

  return newData;
}

export async function getLoanData(): Promise<LoanData> {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Si el archivo no existe, devolver valores por defecto
      return { amount: 20000000, interest: 6, term: 4, date: "2025-01" };
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf8"));
    return data.loanData;
  } catch (error) {
    console.error("Error al leer los datos:", error);
    throw new Error("Error al leer los datos.");
  }
}