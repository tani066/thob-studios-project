import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://thob-studios-project.vercel.app/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Dynamic Product Catalog</h1>
        <p className="text-gray-600 mt-2">
          Configure products and see real-time pricing. Select a product to get started.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-700">{product.name}</h2>
            <p className="text-gray-700">Base Price: ₹{product.basePrice}</p>

            <Link
              href={`/product/${product.id}`}
              className="inline-block mt-3 bg-black text-white px-3 py-2 rounded"
            >
              Configure
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
