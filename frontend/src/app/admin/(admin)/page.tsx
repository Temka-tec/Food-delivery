"use client";

import { Card } from "@/components/ui/card";
import { CreateFoodDialog } from "./_components/CreateFood";
import { useEffect, useState } from "react";
import { MenuCard } from "./_components/MenuCard";
import { api } from "@/lib/axios";

type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  categoryIds: {
    _id: string;
    name: string;
  }[];
};

export default function AdminPage() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    };

    getData();
  }, []);

  return (
    <main className="flex-1 p-8">
      <Card className="grid grid-cols-5 gap-4 p-6">
        <CreateFoodDialog />

        {foods.map((food) => (
          <MenuCard
            key={food._id}
            id={food._id}
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
