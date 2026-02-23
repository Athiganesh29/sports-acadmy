import { useState, useEffect } from 'react';
import api from '../services/api';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { immediate = true } = options;

  const fetchData = async (overrideUrl) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(overrideUrl || url);
      const body = response.data;
      // Unwrap: API returns { success, data, count, total, page, pages }
      if (body && body.success !== undefined && body.data !== undefined) {
        setData(body.data);
        const { success, data: _, ...rest } = body;
        setMeta(rest);
      } else {
        setData(body);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [url]);

  return { data, meta, loading, error, refetch: fetchData };
};

export default useFetch;
