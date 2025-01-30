import Table from "./ui/table";
import { fetchLoanData } from "./lib/data";
import BarChart from "./ui/bar-chart";
import LoanSlider from "./ui/slider";
import PieChartComponent from "./ui/pie-chart";

export default async function Home() {
  const data = await fetchLoanData();

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
        <LoanSlider />
        <div className="flex items-center justify-center bg-gray-100">
          <PieChartComponent/>
        </div>
        <div className="flex items-center justify-center bg-gray-100">
          <BarChart data={data} />
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}
