import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Base Price: ₹{product.basePrice}</p>

            <Link
              href={`/product/${product.id}`}
              className="text-blue-600 underline"
            >
              Customize
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
