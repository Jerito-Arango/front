import { MakeupForm } from "./MakeupForm";
import { MakeupList } from "./MakeupList";

export default function MakeupPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Administrar Productos de Maquillaje</h1>
      <MakeupForm />
      <MakeupList />
    </div>
  );
}