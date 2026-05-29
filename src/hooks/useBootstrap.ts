import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { getToken } from '../storage/auth.storage';

export const useBootstrap = () => {
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore(state => state.setToken);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await getToken();

        if (token) {
          setToken(token);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  return {
    loading,
  };
};
