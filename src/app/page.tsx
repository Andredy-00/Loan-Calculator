import CreateForm from "./ui/create-form";
import Table from "./ui/table";
import { getLoanData } from "./lib/action";

export default async function Home() {

  const initialData = await getLoanData()

  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
        <CreateForm />
        <Table loanData={initialData} />
      </div>
    </div>
  );
}
