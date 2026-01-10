"use client";

import { useEffect, useState, use } from "react";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [finalPrice, setFinalPrice] = useState(null);
  const [configId, setConfigId] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);

    fetch(`/api/products/${id}/options`)
      .then((res) => res.json())
      .then(setCategories);
  }, [id]);

  async function calculatePrice(options) {
    const res = await fetch("/api/configurations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 3,
        productId: Number(id),
        selectedOptions: options,
      }),
    });

    const data = await res.json();
    setFinalPrice(data.finalPrice);
    setConfigId(data.id);
  }

  function handleSelect(category, option) {
    const updated = {
      ...selectedOptions,
      [category]: option,
    };

    setSelectedOptions(updated);
    if (Object.keys(updated).length > 0) {
      calculatePrice(updated);
    }
  }

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mb-4">Base Price: ₹{product.basePrice}</p>

      {categories.map((cat) => (
        <div key={cat.id} className="mb-4">
          <h3 className="font-semibold">{cat.name}</h3>

          {cat.options.map((opt) => (
            <label key={opt.id} className="block">
              <input
                type="radio"
                name={cat.name}
                onChange={() => handleSelect(cat.name, opt.name)}
              />
              {opt.name} (+₹{opt.priceDelta})
            </label>
          ))}
        </div>
      ))}

      {finalPrice !== null && (
        <h2 className="text-xl font-bold mt-4">Final Price: ₹{finalPrice}</h2>
      )}

      <button
        disabled={!finalPrice}
        className="mt-4 bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={async () => {
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: 3,
              productId: Number(id),
              totalPrice: finalPrice,
              configurationId: configId,
            }),
          });

          alert("Order placed successfully!");
        }}
      >
        Place Order
      </button>
    </main>
  );
}
