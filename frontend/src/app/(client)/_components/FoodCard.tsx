"use client";

import { useState } from "react";
import FoodModal from "./FoodModal";

type FoodCardProps = {
  id: string;
  title: string;
  price: string;
  desc: string;
  image: string;
};

export const FoodCard = ({ id, title, price, desc, image }: FoodCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[380px] bg-white rounded-xl p-3 flex flex-col gap-3">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[210px] object-cover rounded-lg"
        />

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 font-bold shadow"
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-red-500 font-semibold text-lg">{title}</h3>
        <span className="font-bold">{price}</span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
      {open && (
        <FoodModal
          id={id}
          title={title}
          price={price}
          desc={desc}
          image={image}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
