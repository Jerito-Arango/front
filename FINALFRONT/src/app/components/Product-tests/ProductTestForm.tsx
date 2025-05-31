'use client';

import { useState } from "react";
import { createProductTest } from "@/src/api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateProductTestDto } from "@/src/types/productTest";

export function ProductTestForm() {
  const [form, setForm] = useState<CreateProductTestDto>({
    tester_id: '',
    product_id: '',
    reaction: '',
    rating: 0,
    survival_status: 0,
  });

  const handleChange = (key: keyof CreateProductTestDto, value: string | number) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProductTest(form);
    alert('Test creado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
      <div>
        <Label>Tester ID</Label>
        <Input value={form.tester_id} onChange={(e) => handleChange('tester_id', e.target.value)} />
      </div>
      <div>
        <Label>Product ID</Label>
        <Input value={form.product_id} onChange={(e) => handleChange('product_id', e.target.value)} />
      </div>
      <div>
        <Label>Reacción</Label>
        <Input value={form.reaction} onChange={(e) => handleChange('reaction', e.target.value)} />
      </div>
      <div>
        <Label>Rating</Label>
        <Input type="number" value={form.rating} onChange={(e) => handleChange('rating', +e.target.value)} />
      </div>
      <div>
        <Label>Estado de supervivencia</Label>
        <Input type="number" value={form.survival_status} onChange={(e) => handleChange('survival_status', +e.target.value)} />
      </div>
      <Button type="submit">Crear Test</Button>
    </form>
  );
}