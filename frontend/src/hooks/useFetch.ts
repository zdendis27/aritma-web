import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>, dependencies: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Data se nepodařilo načíst.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
}
