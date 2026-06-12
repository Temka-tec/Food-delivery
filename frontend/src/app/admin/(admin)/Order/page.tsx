"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type OrderItem = { id: string; quantity: number; food: { name: string } };
type Order = {
  id: string;
  total: number;
  status: string;
  address: string | null;
  createdAt: string;
  user: { email: string; username: string };
  items: OrderItem[];
};

const STATUSES = ["pending", "delivered", "cancelled"];

const statusStyle: Record<string, string> = {
  pending: "border-red-400 text-red-500",
  delivered: "border-zinc-400 text-zinc-600",
  cancelled: "border-zinc-300 text-zinc-400",
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data.orders);
  };

  const changeStatus = async (ids: string[], status: string) => {
    await Promise.all(ids.map((id) => api.patch(`/orders/${id}/status`, { status })));
    setOrders((prev) =>
      prev.map((o) => (ids.includes(o.id) ? { ...o, status } : o))
    );
    setSelected(new Set());
    setBulkDialogOpen(false);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filteredOrders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">{filteredOrders.length} items</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Bulk change button */}
          <button
            onClick={() => selected.size > 0 && setBulkDialogOpen(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              selected.size > 0
                ? "bg-black text-white hover:bg-black/80"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Change delivery state
            {selected.size > 0 && (
              <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {selected.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="w-10 p-4">
                <input
                  type="checkbox"
                  checked={selected.size === filteredOrders.length && filteredOrders.length > 0}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              <th className="p-4 text-left text-gray-500 font-medium">№</th>
              <th className="p-4 text-left text-gray-500 font-medium">Customer</th>
              <th className="p-4 text-left text-gray-500 font-medium">Food</th>
              <th className="p-4 text-left text-gray-500 font-medium">Date</th>
              <th className="p-4 text-left text-gray-500 font-medium">Total</th>
              <th className="p-4 text-left text-gray-500 font-medium">Delivery Address</th>
              <th className="p-4 text-left text-gray-500 font-medium">Delivery state</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr
                key={order.id}
                className={`border-b hover:bg-gray-50 ${selected.has(order.id) ? "bg-gray-50" : ""}`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.has(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-4 text-gray-500">{i + 1}</td>
                <td className="p-4 font-medium">{order.user.email}</td>
                <td className="p-4">
                  <span>{order.items.length} foods</span>
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-CA")}
                </td>
                <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="p-4 text-gray-500 max-w-50 truncate">
                  {order.address ?? "-"}
                </td>
                <td className="p-4">
                  <span
                    className={`border px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[order.status] ?? "border-gray-300 text-gray-500"}`}
                  >
                    {statusLabel[order.status] ?? order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk status dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mb-4">
            {selected.size} захиалгын статусыг сонгоно уу
          </p>
          <div className="space-y-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => changeStatus(Array.from(selected), s)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border hover:bg-gray-50 transition-colors"
              >
                <span className="capitalize font-medium">{statusLabel[s]}</span>
                <span
                  className={`text-xs border px-3 py-1 rounded-full font-semibold ${statusStyle[s]}`}
                >
                  {statusLabel[s]}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
