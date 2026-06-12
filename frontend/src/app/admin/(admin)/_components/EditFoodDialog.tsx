"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, X } from "lucide-react";
import { api } from "@/lib/axios";

type Category = { id: string; name: string };
type Food = { id: string; name: string; price: number; ingredients: string; image: string; categories: Category[] };

type Props = {
  food: Food;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
};

export function EditFoodDialog({ food, categories, onClose, onSaved }: Props) {
  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(String(food.price));
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [image, setImage] = useState(food.image);
  const [categoryId, setCategoryId] = useState(food.categories[0]?.id ?? "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, { method: "POST", body: file });
    const blob = await res.json();
    setImage(blob.url);
    setUploading(false);
  };

  const handleSave = async () => {
    await api.put(`/foods/${food.id}`, { name, price, ingredients, image, categoryIds: [categoryId] });
    onSaved();
    onClose();
  };

  const handleDelete = async () => {
    await api.delete(`/foods/${food.id}`);
    onSaved();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Dishes info</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-gray-400 text-sm">Dish name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-gray-400 text-sm">Dish category</span>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-gray-400 text-sm mt-2">Ingredients</span>
            <Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="rounded-xl min-h-[80px]" />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-gray-400 text-sm">Price</span>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-xl" />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-gray-400 text-sm mt-2">Image</span>
            <div>
              {image ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="food" className="w-full h-48 object-cover" />
                  <button onClick={() => setImage("")} className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed rounded-xl p-8 flex items-center justify-center cursor-pointer hover:border-gray-400 text-gray-400 text-sm">
                  {uploading ? "Uploading..." : "Click to upload image"}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" size="icon" onClick={handleDelete} className="border-red-300 text-red-500 hover:bg-red-50 rounded-xl">
            <Trash2 size={16} />
          </Button>
          <Button onClick={handleSave} className="bg-black text-white hover:bg-black/90 px-8 rounded-xl">
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
