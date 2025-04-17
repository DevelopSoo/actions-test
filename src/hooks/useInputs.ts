// hooks/useInputs.ts
import { useState, ChangeEvent } from "react";

interface FormValues {
  [key: string]: string;
}

interface UseInputsReturn {
  values: FormValues;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

function useInputs(initialValues: FormValues): UseInputsReturn {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}

export default useInputs;
