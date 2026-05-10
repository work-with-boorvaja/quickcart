import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {

  // Initialize state from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {

      // Get item from localStorage
      const item = window.localStorage.getItem(key);

      // Parse stored json or return initial value
      return item
        ? JSON.parse(item)
        : initialValue;

    } catch (error) {

      console.error(error);
      return initialValue;

    }
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    try {

      window.localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );

    } catch (error) {

      console.error(error);

    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}