"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/productSlice";
import type { AppDispatch } from "../store";

export default function ComponentA() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !price) return;
    dispatch(addProduct({ id: Date.now(), name, price: parseFloat(price) }));
    setName('');
    setPrice('');
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama produk" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Harga" type="number" />
      <button onClick={handleAdd}>Tambah Produk</button>
    </div>
  );
}
