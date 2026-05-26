import { Button } from "@/components/ui/button";
import { FoodCard } from "./FoodCard";
export const FoodList = () => {
  const foods = [
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
    {
      title: "Finger Food",
      price: "$12.99",
      desc: "Fluffy pancakes stacked with fruits, cream, syrup.",
      img: "/dish.png",
    },
  ];

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-[1200px] px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white text-2xl font-semibold">Appetizers</h2>
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
          {foods.map((food, index) => (
            <FoodCard
              key={index}
              title={food.title}
              price={food.price}
              desc={food.desc}
              image={food.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
