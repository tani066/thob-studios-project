"use client";

import { useEffect, useState, use } from "react";
import { useUser } from "@/lib/use-user";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const user = useUser();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [finalPrice, setFinalPrice] = useState(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);

    fetch(`/api/products/${id}/options`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const run = async () => {
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: Number(id),
          selectedOptions,
        }),
      });
      if (!res.ok) {
        console.error("Pricing error");
        return;
      }
      const { finalPrice } = await res.json();
      setFinalPrice(finalPrice);
    };
    run();
  }, [product, selectedOptions, id]);

  function handleSelect(category, option) {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: option,
    }));
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

      {!user && (
        <p className="mt-2 text-sm text-red-600">
          Please <a className="underline" href="/login">log in</a> to place an order.
        </p>
      )}

      <button
        disabled={!finalPrice || !user || placing}
        className="mt-4 cursor-pointer bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={async () => {
          setPlacing(true);
          try {
            const res = await fetch("/api/configurations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                productId: Number(id),
                selectedOptions,
              }),
            });

            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              alert(err.error || "Failed to save configuration");
              setPlacing(false);
              return;
            }

            const config = await res.json();

            const resOrder = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                productId: Number(id),
                totalPrice: config.finalPrice ?? finalPrice,
                configurationId: config.id,
              }),
            });

            if (!resOrder.ok) {
              const err = await resOrder.json().catch(() => ({}));
              alert(err.error || "Failed to place order");
              setPlacing(false);
              return;
            }

            alert("Order placed successfully!");
          } catch (e) {
            alert("Unexpected error placing order");
          } finally {
            setPlacing(false);
          }
        }}
      >
        {placing ? "Placing..." : "Place Order"}
      </button>
    </main>
  );
}
