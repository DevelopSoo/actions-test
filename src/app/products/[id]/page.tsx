// src/app/products/[id]/page.tsx

'use client';
import { useParams, useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<{
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  } | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id}`
      );
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  return (
    <div>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="h-auto w-78 border">
          <img className="w-78" src={product?.image} alt={product?.title} />
          <h1>{product?.title}</h1>
          <p>{product?.price}</p>
          <p>{product?.description}</p>
        </div>
      )}
      <div className="flex items-center gap-4">
        <button
          className="rounded-md border bg-gray-200 px-4 py-2"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          className="rounded-md border bg-gray-200 px-4 py-2"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            router.push('/purchase/complete');
          }}
        >
          구매
        </button>
      </div>
      <button
        type="button"
        onClick={async () => {
          await Sentry.startSpan(
            {
              name: '제바알',
              op: '23123',
            },
            async () => {
              const res = await fetch('/api/sentry-example-api');
              if (!res.ok) {
                throw new Error('하하하하');
              }
            }
          );
        }}
      >
        <span>Throw Sample Error</span>
      </button>
    </div>
  );
}
