import { ProductTestForm } from "./ProductTestForm";
import { ProductTestList } from "./ProductTestList";

export default function ProductTestPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Administrar Tests de Productos</h1>
      <ProductTestForm />
      <ProductTestList />
    </div>
  );
}
