import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

type MenuCardProps = {
  id: string;
  name: string;
  price: number;
  ingredients: string;
  image: string;
};

export const MenuCard = ({
  id,
  name,
  price,
  ingredients,
  image,
}: MenuCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video">
        <img src={image} alt={name} className="w-full h-full object-cover" />

        <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-md">
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm leading-tight flex-1">{name}</h4>
          <span className="text-sm font-semibold ml-2">${price}</span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2">{ingredients}</p>
      </div>
    </Card>
  );
};
