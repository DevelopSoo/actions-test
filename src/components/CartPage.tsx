'use client';
import useCounterStore from '../stores/useCounterStore';
import { useAuthStore } from '../stores/useAuthStore';

const CartPage = () => {
  const { count, increment, decrement } = useCounterStore();
  const { isAuthenticated, email, login, logout } = useAuthStore();

  const handleIncrement = () => {
    if (!isAuthenticated) {
      alert('로그인하지 않으면 추가할 수 없습니다.');
      return;
    }
    increment();
  };

  const handleDecrement = () => {
    if (!isAuthenticated) {
      alert('로그인하지 않으면 제거할 수 없습니다.');
      return;
    }
    decrement();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>

      {/* 유저 정보 */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-semibold">유저 정보</h2>
        {isAuthenticated ? (
          <div className="space-y-2">
            <p className="text-gray-700">로그인됨: {email}</p>
            <button
              onClick={() => logout()}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-700">로그인되지 않음</p>
            <button
              onClick={() => login('user@example.com')}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              로그인
            </button>
          </div>
        )}
      </div>

      {/* 장바구니 상품 개수 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-semibold">장바구니 상품</h2>
        <p className="mb-4 text-gray-700">상품 개수: {count}</p>
        <div className="space-x-2">
          <button
            onClick={handleIncrement}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            추가
          </button>
          <button
            onClick={handleDecrement}
            disabled={count === 0}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          >
            제거
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
