import CreateForm from "./ui/create-form";
import Table from "./ui/table";
import { fetchLoanData } from "./lib/data";
import BarChart from "./ui/bar-chart";

export default async function Home() {

  const data = await fetchLoanData();

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
        <CreateForm />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <BarChart data={data} />
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}
