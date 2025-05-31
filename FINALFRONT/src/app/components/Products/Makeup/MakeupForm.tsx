'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createMakeup } from "@/src/api/api";
import { CreateMakeupDto } from "@/src/types/CreateMakeup";
import { CategoryMakeUp } from "@/src/types/category";

export function MakeupForm() {
  const [form, setForm] = useState<CreateMakeupDto>({
    name: '',
    category: CategoryMakeUp.Lipstick, // Enum por defecto
    stock: 0,
    ware_house_location: '',
    durability_score: 1,
  });

  const handleChange = <K extends keyof CreateMakeupDto>(key: K, value: CreateMakeupDto[K]) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMakeup(form);
    alert("Producto creado");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
      <div>
        <Label>Nombre</Label>
        <Input
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div>
        <Label>Categoría</Label>
        <Select
          value={form.category}
          onValueChange={(value) => handleChange('category', value as CategoryMakeUp)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona categoría" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CategoryMakeUp).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={form.stock}
          onChange={(e) => handleChange('stock', +e.target.value)}
        />
      </div>
      <div>
        <Label>Ubicación en almacén</Label>
        <Input
          value={form.ware_house_location}
          onChange={(e) => handleChange('ware_house_location', e.target.value)}
        />
      </div>
      <div>
        <Label>Durabilidad (1-10)</Label>
        <Input
          type="number"
          value={form.durability_score}
          onChange={(e) => handleChange('durability_score', +e.target.value)}
        />
      </div>
      <Button type="submit">Crear Producto</Button>
    </form>
  );
}

// Este componente es un formulario para crear productos de maquillaje.