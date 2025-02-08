import Table from "./ui/table";
import { fetchEmiMora, fetchLoanData } from "./lib/data";
import BarChart from "./ui/bar-chart";
import LoanSlider from "./ui/slider";

export default async function Home() {
  const data = await fetchLoanData();
  const dataEmiMora = await fetchEmiMora();

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5 grid gap-6">
        <div className="grid bg-gris-principal">
          <LoanSlider data={dataEmiMora} />
        </div>
        <div className="flex items-center justify-center bg-gris-principal border-s-gris pt-5">
          <BarChart data={data} />
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}
