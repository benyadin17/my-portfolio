"use client";
import * as React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function ComponentB() {
  const products = useSelector((state: RootState) => state.product.products);

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Rp {p.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
