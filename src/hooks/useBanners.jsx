import { useState, useEffect } from 'react';

export const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners',
          {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          }
        );
        const data = await response.json();
        setBanners(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
};
