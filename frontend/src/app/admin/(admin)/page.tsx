"use client";

import { Card } from "@/components/ui/card";
import { CreateFoodDialog } from "./_components/CreateFood";
import { useCallback, useEffect, useState } from "react";
import { MenuCard } from "./_components/MenuCard";
import { api } from "@/lib/axios";

type Food = {
  id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  categories: {
    id: string;
    name: string;
  }[];
};

export default function AdminPage() {
  const [foods, setFoods] = useState<Food[]>([]);

  const getData = useCallback(async () => {
    const { data } = await api.get<Food[]>("/foods");
    setFoods(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className="flex-1 p-8">
      <Card className="grid grid-cols-5 gap-4 p-6">
        <CreateFoodDialog onCreated={getData} />

        {foods.map((food) => (
          <MenuCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            ingredients={food.ingredients}
            image={food.image}
          />
        ))}
      </Card>
    </main>
  );
}
