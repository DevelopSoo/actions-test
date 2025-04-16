import Link from "next/link";

export default async function ProductsPage() {
  const products = await fetch("https://fakestoreapi.com/products");
  const productsData = await products.json();
  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {productsData.map(
          (product: {
            id: number;
            title: string;
            price: number;
            description: string;
            category: string;
            image: string;
          }) => (
            <Link
              className="w-64 h-auto border"
              key={product.id}
              href={`/products/${product.id}`}
              data-testid={`product-${product.id}`}
              data-product-id={product.id}
            >
              <li>
                <img
                  className="w-full"
                  src={product.image}
                  alt={product.title}
                />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
}
