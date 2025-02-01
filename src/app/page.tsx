import Table from "./ui/table";
import { fetchLoanData } from "./lib/data";
import BarChart from "./ui/bar-chart";
import LoanSlider from "./ui/slider";
import PieChartComponent from "./ui/pie-chart";

export default async function Home() {
  const data = await fetchLoanData();

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5 grid gap-6">
        <div className="grid bg-gris-principal">
          <LoanSlider />
          <div className="border-s-gris w-8/12">
            <PieChartComponent />
          </div>
        </div>
        <div className="flex items-center justify-center bg-gris-principal border-s-gris pt-5">
          <BarChart data={data} />
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}
