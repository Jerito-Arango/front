'use client';

import { useEffect, useState } from "react";
import { getMakeups, deleteMakeup } from "@/src/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Makeup} from "@/src/types/CreateMakeup";

export function MakeupList() {
  const [makeups, setMakeups] = useState<Makeup[]>([]);

  const loadMakeups = async () => {
    const res = await getMakeups();
    setMakeups(res.data);
  };

  useEffect(() => {
    loadMakeups();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMakeup(id);
    loadMakeups();
  };

  const grouped = makeups.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {} as Record<string, Makeup[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-bold">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <CardContent className="space-y-2">
                  <p><strong>Nombre:</strong> {item.name}</p>
                  <p><strong>Stock:</strong> {item.stock}</p>
                  <p><strong>Ubicación:</strong> {item.ware_house_location}</p>
                  <p><strong>Durabilidad:</strong> {item.durability_score}</p>
                  <Button onClick={() => handleDelete(item.id)} variant="destructive">Eliminar</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}