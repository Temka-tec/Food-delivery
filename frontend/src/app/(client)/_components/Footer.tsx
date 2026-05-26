"use client";
import { Facebook, FacebookIcon, HandPlatter, Instagram } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300">
      <div className="bg-red-500 py-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-white font-semibold text-lg">
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-red-500">
              <HandPlatter />
            </span>
            Nom<span className="text-red-500">Nom</span>
          </div>
          <p className="text-sm mt-2 text-gray-400">Swift delivery</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-4">NOMNOM</h4>
          <ul className="space-y-3">
            <li>Home</li>
            <li>Contact us</li>
            <li>Delivery zone</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-4">MENU</h4>
          <ul className="space-y-3">
            <li>Appetizers</li>
            <li>Salads</li>
            <li>Pizzas</li>
            <li>Main dishes</li>
            <li>Desserts</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-4 invisible">
            MENU
          </h4>
          <ul className="space-y-3">
            <li>Side dish</li>
            <li>Brunch</li>
            <li>Desserts</li>
            <li>Beverages</li>
            <li>Fish & Sea foods</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-4">
            FOLLOW US
          </h4>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer">
              <Facebook />
            </span>
            <span className="cursor-pointer">
              <Instagram />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 max-w-[1200px] mx-auto" />

      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 justify-between text-sm text-gray-500">
        <p>Copyright 2024 © Nomnom LLC</p>
        <div className="flex gap-6">
          <span>Privacy policy</span>
          <span>Terms and condition</span>
          <span>Cookie policy</span>
        </div>
      </div>
    </footer>
  );
};
