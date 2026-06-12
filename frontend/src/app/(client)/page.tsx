"use client";
import Snowfall from "react-snowfall";
import { FoodList } from "./_components/FoodList";
import { HeaderSheet } from "./_components/HeaderSheet";

export default function Home() {
  return (
    <div className="bg-gray-800 ">
      <HeaderSheet />

      <Snowfall color="#82C3D9" />

      <img src="offer.png" alt="offer" className="w-full h-200"></img>
      <FoodList />
    </div>
  );
}
