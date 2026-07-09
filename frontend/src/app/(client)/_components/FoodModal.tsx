"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartProvider";
import { useAuth } from "@/context/AuthProvider";
import { AuthRequiredDialog } from "./AuthRequiredDialog";

type FoodModalProps = {
  id: string;
  title: string;
  price: string;
  desc: string;
  image: string;
  onClose: () => void;
};

export default function FoodModal({ id, title, price, desc, image, onClose }: FoodModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [openAuthChoice, setOpenAuthChoice] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  const priceNum = parseFloat(price.replace("$", ""));
  const total = (priceNum * quantity).toFixed(2);

  const handleAddToCart = () => {
    if (!user) {
      setOpenAuthChoice(true);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({ id, title, price: priceNum, desc, image });
    }
    toast.success(`${title} сагсанд нэмэгдлээ!`, { duration: 2000 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[700px] p-6 relative flex gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <img
          src={image}
          className="w-[320px] h-[364px] rounded-xl object-cover"
          alt={title}
        />

        <div className="flex flex-col justify-between w-1/2">
          <div>
            <h2 className="text-2xl font-semibold text-red-500">{title}</h2>
            <p className="text-gray-500 mt-2">{desc}</p>
            <p className="mt-6 text-sm text-gray-400">Total price</p>
            <p className="text-2xl font-bold">${total}</p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded-full px-3">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button
              className="flex-1 bg-black text-white py-3 rounded-full"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <AuthRequiredDialog
        open={openAuthChoice}
        onOpenChange={setOpenAuthChoice}
      />
    </div>
  );
}
