import CreateForm from "./ui/create-form";

export default function Home() {
  return (
    <div className="bg-gris-principal w-3/4 p-3 rounded-md">
      <div className="outline-dashed-gris h-full p-5">
      <CreateForm />
      </div>
    </div>
  );
}
