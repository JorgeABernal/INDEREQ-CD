import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export const useFetchClave = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getClave = useCallback(async () => {
    setLoading(true);
    const response = await AsyncStorage.getItem("data");
    if (response) {
      setData(response);
    }
    setLoading(false);
  }, [AsyncStorage]);

  useEffect(() => {
    getClave();
  }, [getClave]);

  return [ data, loading ];
};