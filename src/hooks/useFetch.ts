//? Centralizes loading and error states, plus possible re-fetches

import { useEffect, useState } from "react";

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFn()
      .then((res) => isMounted && setData(res))
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
};
