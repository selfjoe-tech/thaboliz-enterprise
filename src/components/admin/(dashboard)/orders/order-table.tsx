"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Usage:
// <OrderChecklist order={order} />
// where order.items is an array of { id, product_name, product_price, quantity }

export function OrderChecklist({ order }: { order: any }) {
  const [selected, setSelected] = useState<Set<any>>(new Set());

  const toggle = (id: any) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // compute total if not provided
  const computedTotal =
    order?.total ??
    order?.items?.reduce((s: number, it: any) => s + it.product_price * it.quantity, 0) ??
    0;

  return (
    <div className="overflow-hidden rounded-md border">
      {/* Desktop table (visible on md+) */}
      <table className="hidden md:table w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 p-3 text-left" />
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-center">Qty</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order?.items?.map((it: any) => {
            const isSel = selected.has(it.id);
            return (
              <tr
                key={it.id}
                role="button"
                tabIndex={0}
                onClick={() => toggle(it.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(it.id);
                  }
                }}
                aria-pressed={isSel}
                className={`cursor-pointer border-t transition-colors duration-150 ${
                  isSel ? "bg-green-600 text-white" : "bg-white hover:bg-green-50"
                }`}
              >
                <td className="p-3 align-middle">
                  <div onClick={(e) => e.stopPropagation()}>
                    {/* make checkbox a bit more visible with size + gray accent */}
                    <Checkbox
                      checked={isSel}
                      onCheckedChange={() => toggle(it.id)}
                      className="h-4 w-4 border-gray-300 bg-gray-100"
                      style={{ accentColor: "#9CA3AF" }}
                    />
                  </div>
                </td>

                <td className="p-3">{it.product_name}</td>
                <td className="p-3 text-right">R {it.product_price.toFixed(2)}</td>
                <td className="p-3 text-center">{it.quantity}</td>
                <td className="p-3 text-right">R {(it.product_price * it.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t bg-gray-50">
            <td colSpan={3} className="text-right font-bold p-3">
              Total
            </td>
            <td colSpan={2} className="font-bold p-3 text-right">
              R {computedTotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Mobile list (visible below md) */}
      <div className="md:hidden">
        {order?.items?.map((it: any) => {
          const isSel = selected.has(it.id);
          return (
            <div
              key={it.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(it.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(it.id);
                }
              }}
              aria-pressed={isSel}
              className={`flex items-center justify-between gap-3 p-3 border-t transition-colors duration-150 ${
                isSel ? "bg-green-600 text-white" : "bg-white hover:bg-green-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSel}
                    onCheckedChange={() => toggle(it.id)}
                    className="h-4 w-4 border-gray-300 bg-gray-100"
                    style={{ accentColor: "#9CA3AF" }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{it.product_name}</span>
                  <span className="text-sm opacity-80">Qty: {it.quantity}</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-medium">R {it.product_price.toFixed(2)}</span>
                <span className="text-sm opacity-80">R {(it.product_price * it.quantity).toFixed(2)}</span>
              </div>
            </div>
          );
        })}

        {/* mobile total */}
        <div className="flex justify-between items-center p-3 border-t bg-gray-50">
          <div className="font-bold">Total</div>
          <div className="font-bold">R {computedTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
