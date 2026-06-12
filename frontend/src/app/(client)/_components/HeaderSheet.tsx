"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HandPlatter,
  MapPin,
  ShoppingCart,
  User,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartProvider";

type Order = {
  id: string;
  total: number;
  status: string;
  address: string | null;
  createdAt: string;
  items: { id: string; quantity: number; food: { name: string } }[];
};

export const HeaderSheet = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const isLoggedIn = !!user;

  const [openAuthChoice, setOpenAuthChoice] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [orders, setOrders] = React.useState<Order[]>([]);

  const fetchOrders = async () => {
    if (!user) return;
    const { data } = await import("@/lib/axios").then((m) =>
      m.api.get(`/orders/user/${user.id}`)
    );
    setOrders(data.orders);
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setOpenAuthChoice(true);
      return;
    }
    await import("@/lib/axios").then((m) =>
      m.api.post("/orders", {
        userId: user!.id,
        address,
        total: total + 0.99,
        items: items.map((i) => ({ foodId: i.id, quantity: i.quantity, price: i.price })),
      })
    );
    clearCart();
    setOpenSuccess(true);
  };

  return (
    <>
      <footer className="text-gray-300">
        <div className="w-full h-[70px] bg-black flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <HandPlatter className="text-red-400 w-10 h-10" />
            <div className="leading-tight">
              <p className="text-white font-bold">
                Nom<span className="text-red-500">Nom</span>
              </p>
              <p className="text-xs text-zinc-400">Swift delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin size={16} className="text-red-500" />
                  <span className="text-neutral-500">Delivery:</span>
                  <span>Add location</span>
                </button>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="relative w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center py-5">
                      <ShoppingCart size={18} />
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[533px]! max-w-[533px]! bg-zinc-900 text-zinc-100 rounded-b-md px-6"
                  >
                    <SheetHeader className="mb-4">
                      <SheetTitle className="flex items-center gap-2 text-white">
                        <ShoppingCart className="h-5 w-5" />
                        Order detail
                      </SheetTitle>
                    </SheetHeader>

                    <Tabs defaultValue="cart">
                      <TabsList className="grid grid-cols-2 mb-4 bg-white p-1 rounded-2xl w-120 h-10">
                        <TabsTrigger value="cart" className="rounded-2xl data-[state=active]:bg-red-600 data-[state=active]:text-white">
                          Cart
                        </TabsTrigger>
                        <TabsTrigger value="order" className="rounded-2xl data-[state=active]:bg-red-600 data-[state=active]:text-white" onClick={fetchOrders}>
                          Order
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="cart" className="space-y-4">
                        <Card className="bg-zinc-100 text-zinc-900 p-4 rounded-2xl">
                          <h3 className="font-semibold mb-3">My cart</h3>
                          {items.length === 0 ? (
                            <p className="text-sm text-zinc-400 text-center py-4">Сагс хоосон байна</p>
                          ) : (
                            items.map((item, i) => (
                              <div key={item.id} className="space-y-3">
                                <div className="flex gap-3">
                                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-xl object-cover" />
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <p className="font-semibold text-red-600">{item.title}</p>
                                        <p className="text-sm text-zinc-600 line-clamp-1">{item.desc}</p>
                                      </div>
                                      <button className="text-red-500" onClick={() => removeItem(item.id)}>
                                        <X size={16} />
                                      </button>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                          <Minus size={14} />
                                        </Button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                          <Plus size={14} />
                                        </Button>
                                      </div>
                                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  </div>
                                </div>
                                {i < items.length - 1 && <Separator className="border-dashed" />}
                              </div>
                            ))
                          )}
                        </Card>

                        <Card className="bg-zinc-100 text-zinc-900 p-4 rounded-2xl">
                          <h3 className="font-semibold mb-2">Delivery location</h3>
                          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Хаяг оруулна уу" />
                        </Card>

                        <Card className="bg-zinc-100 text-zinc-900 p-4 rounded-2xl">
                          <h3 className="font-semibold mb-3">Payment info</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Items</span>
                              <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping</span>
                              <span>$0.99</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${(total + 0.99).toFixed(2)}</span>
                            </div>
                          </div>
                          <Button onClick={handleCheckout} className="w-full mt-4 rounded-full bg-red-600 hover:bg-red-700">
                            Checkout
                          </Button>
                        </Card>
                      </TabsContent>

                      <TabsContent value="order">
                        <Card className="bg-zinc-100 text-zinc-900 p-4 rounded-2xl">
                          <h3 className="font-semibold mb-4">Order history</h3>
                          {orders.length === 0 ? (
                            <p className="text-sm text-zinc-400 text-center py-4">Захиалга байхгүй байна</p>
                          ) : (
                            orders.map((order, i) => (
                              <div key={order.id}>
                                <div className="space-y-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <p className="font-bold text-base">
                                      ${order.total.toFixed(2)}{" "}
                                      <span className="text-zinc-500 font-normal text-sm">(#{order.id.slice(-5).toUpperCase()})</span>
                                    </p>
                                    <span className={`text-xs font-semibold border px-3 py-1 rounded-full ${order.status === "pending" ? "border-red-400 text-red-500" : "border-zinc-300 text-zinc-500"}`}>
                                      {order.status === "pending" ? "Pending" : "Delivered"}
                                    </span>
                                  </div>
                                  {order.items.map((oi) => (
                                    <div key={oi.id} className="flex items-center gap-2 text-sm text-zinc-600">
                                      <HandPlatter size={14} />
                                      <span className="flex-1">{oi.food.name}</span>
                                      <span>x {oi.quantity}</span>
                                    </div>
                                  ))}
                                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <MapPin size={14} />
                                    <span className="line-clamp-1">{order.address ?? "Хаяг байхгүй"}</span>
                                  </div>
                                </div>
                                {i < orders.length - 1 && <Separator className="border-dashed" />}
                              </div>
                            ))
                          )}
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </SheetContent>
                </Sheet>

                <button
                  onClick={() => router.push("/profile")}
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
                >
                  <User size={18} />
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="rounded-full border-white text-white bg-transparent hover:bg-white hover:text-black"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => router.push("/Signup")}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </footer>

      <Dialog open={openAuthChoice} onOpenChange={setOpenAuthChoice}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-xl">
              You need login first!!
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-zinc-500 mb-6">
            Please login or create an account to place your order
          </p>

          <div className="flex flex-col gap-3">
            <Button
              className="rounded-full bg-black hover:bg-gray-600"
              onClick={() => {
                setOpenAuthChoice(false);
                router.push("/login");
              }}
            >
              Login
            </Button>

            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setOpenAuthChoice(false);
                router.push("/Signup");
              }}
            >
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Your order has been successfully placed!
            </DialogTitle>
          </DialogHeader>

          <img src="/success.png" alt="success" className="mx-auto my-4 h-40" />

          <Button
            variant="secondary"
            onClick={() => {
              setOpenSuccess(false);
              router.push("/");
            }}
          >
            Back to home
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
