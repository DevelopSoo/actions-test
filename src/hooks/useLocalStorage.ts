// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("로컬스토리지 읽기 오류:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("로컬스토리지 쓰기 오류:", error);
    }
  };

  useEffect(() => {
    // 스토리지 변경 이벤트가 발생할 때마다 실행되는 핸들러 함수
    const handleStorageChange = (e: StorageEvent) => {
      // 변경된 키가 우리가 관심 있는 키와 같고, 새 값이 존재하는 경우
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error("로컬스토리지 동기화 오류:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
