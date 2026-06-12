"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Pencil, Plus } from "lucide-react";
import { CreateFoodDialog } from "./_components/CreateFood";
import { EditFoodDialog } from "./_components/EditFoodDialog";

type Category = { id: string; name: string };
type Food = {
  id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  categories: Category[];
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editFood, setEditFood] = useState<Food | null>(null);

  const fetchData = useCallback(async () => {
    const [foodsRes, catsRes] = await Promise.all([
      api.get<Food[]>("/foods"),
      api.get<Category[]>("/categories"),
    ]);
    setFoods(foodsRes.data);
    setCategories(catsRes.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const allCount = foods.length;

  const visibleCategories =
    activeTab === "all"
      ? categories.filter((c) => foods.some((f) => f.categories.some((fc) => fc.id === c.id)))
      : categories.filter((c) => c.id === activeTab);

  const foodsByCategory = (catId: string) =>
    foods.filter((f) => f.categories.some((c) => c.id === catId));

  const countByCategory = (catId: string) => foodsByCategory(catId).length;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dishes category</h1>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "border-red-400 text-red-500"
              : "border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          All Dishes
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "all" ? "bg-red-500 text-white" : "bg-black text-white"}`}>
            {allCount}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              activeTab === cat.id
                ? "border-red-400 text-red-500"
                : "border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {cat.name}
            <span className="text-xs bg-black text-white px-1.5 py-0.5 rounded-full">
              {countByCategory(cat.id)}
            </span>
          </button>
        ))}

        <button className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
          <Plus size={18} />
        </button>
      </div>

      {/* Foods by category */}
      <div className="space-y-8">
        {visibleCategories.map((cat) => {
          const catFoods = foodsByCategory(cat.id);
          return (
            <div key={cat.id} className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {cat.name}{" "}
                <span className="text-gray-400 font-normal">({catFoods.length})</span>
              </h2>

              <div className="grid grid-cols-4 gap-4">
                {/* Add new dish card */}
                <CreateFoodDialog onCreated={fetchData} defaultCategoryId={cat.id}>
                  <div className="border-2 border-dashed border-red-300 rounded-xl flex flex-col items-center justify-center gap-2 p-6 cursor-pointer hover:border-red-400 transition-colors min-h-[200px]">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Plus size={20} className="text-white" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">Add new Dish to {cat.name}</p>
                  </div>
                </CreateFoodDialog>

                {/* Food cards */}
                {catFoods.map((food) => (
                  <div key={food.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img src={food.image} alt={food.name} className="w-full h-36 object-cover" />
                      <button
                        onClick={() => setEditFood(food)}
                        className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                      >
                        <Pencil size={14} className="text-red-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-red-500 text-sm">{food.name}</p>
                        <p className="text-sm font-bold">${food.price}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{food.ingredients}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit modal */}
      {editFood && (
        <EditFoodDialog
          food={editFood}
          categories={categories}
          onClose={() => setEditFood(null)}
          onSaved={fetchData}
        />
      )}
    </div>
  );
}
