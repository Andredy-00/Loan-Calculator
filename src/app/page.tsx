import CreateForm from "./ui/create-form";
import Table from "./ui/table";
import { getLoanData } from "./lib/action";
import MyChart from "./ui/bar-chart";

export default async function Home() {
  const initialData = await getLoanData();

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
        <CreateForm />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <MyChart />
        </div>
        <Table loanData={initialData} />
      </div>
    </div>
  );
}
