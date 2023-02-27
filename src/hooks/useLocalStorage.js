import { useEffect } from "react";

function getSavedValue(key, initialValue)

export default function useLocalStorage(initialValue) {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}