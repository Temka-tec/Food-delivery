"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FoodCard } from "./FoodCard";
import { api } from "@/lib/axios";

type Food = {
  id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
};

type Category = {
  id: string;
  name: string;
  foods: Food[];
};

export const FoodList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get<Category[]>("/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch foods", err);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {categories
        .filter((category) => category.foods.length > 0)
        .map((category) => (
          <div key={category.id} className="w-full flex justify-center py-6">
            <div className="w-full max-w-[1200px] px-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white text-2xl font-semibold">
                  {category.name}
                </h2>
                <Button variant="ghost" className="text-white">
                  See more
                </Button>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                "
              >
                {category.foods.map((food) => (
                  <FoodCard
                    key={food.id}
                    id={food.id}
                    title={food.name}
                    price={`$${food.price}`}
                    desc={food.ingredients}
                    image={food.image}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
