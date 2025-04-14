// hooks/useCounter.ts
import { useState } from "react";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  double: () => void;
}

function useCounter(initialValue: number = 0): CounterState {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  const double = () => setCount(count * 2);

  return { count, increment, decrement, reset, double };
}

export default useCounter;
