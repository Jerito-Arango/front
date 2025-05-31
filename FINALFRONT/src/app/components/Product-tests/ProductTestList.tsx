'use client';

import { useEffect, useState } from "react";
import { getProductTests, deleteProductTest } from "@/src/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductTest} from "@/src/types/productTest";

export function ProductTestList() {
  const [tests, setTests] = useState<ProductTest[]>([]);

  const loadTests = async () => {
    const res = await getProductTests();
    setTests(res.data);
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProductTest(id);
    loadTests();
  };

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <Card key={test.id} className="p-4">
          <CardContent className="space-y-2">
            <p><strong>Tester:</strong> {test.tester_id}</p>
            <p><strong>Producto:</strong> {test.product_id}</p>
            <p><strong>Reacción:</strong> {test.reaction}</p>
            <p><strong>Rating:</strong> {test.rating}</p>
            <p><strong>Supervivencia:</strong> {test.survival_status}</p>
            <Button onClick={() => handleDelete(test.id)} variant="destructive">Eliminar</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}