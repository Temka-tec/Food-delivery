"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FoodCard } from "./FoodCard";
import { api } from "@/lib/axios";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((current) => ({
      ...current,
      [categoryId]: !current[categoryId],
    }));
  };

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
                {category.foods.length > 3 && (
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={Boolean(expandedCategories[category.id])}
                  >
                    {expandedCategories[category.id] ? (
                      <>
                        See less <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        See more <ChevronDown className="size-4" />
                      </>
                    )}
                  </Button>
                )}
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
                {(expandedCategories[category.id]
                  ? category.foods
                  : category.foods.slice(0, 3)
                ).map((food) => (
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
