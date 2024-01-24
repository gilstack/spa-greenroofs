import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/marker`);
        const responseData = response.data;
        const markersData = responseData.results.map((item: any) => ({
          ...item,
          key: item.id,
        }));

        setMarkers(markersData);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { markers, loading };
};
