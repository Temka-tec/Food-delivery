"use client";
import { useState } from "react";
import { toast } from "sonner";
export default function FoodModal({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
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
          src="/dish.png"
          className="w-[377] h-[364]  rounded-xl object-cover"
          alt="food"
        />

        <div className="flex flex-col justify-between w-1/2">
          <div>
            <h2 className="text-2xl font-semibold text-red-500">
              Sunshine Stackers
            </h2>

            <p className="text-gray-500 mt-2">
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </p>

            <p className="mt-6 text-sm text-gray-400">Total price</p>

            <p className="text-2xl font-bold">$12.99</p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded-full px-3">
              <button>-</button>
              <span className="px-4">1</span>
              <button>+</button>
            </div>

            <button
              className="flex-1 bg-black text-white py-3 rounded-full"
              onClick={() => {
                toast.success("Food is being added to the cart!", {
                  duration: 2000,
                });
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
