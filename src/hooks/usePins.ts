import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePins = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pin`);
        const responseData = response.data;
        const pinsData = responseData.results.map((item: any) => ({
          ...item,
          key: item.id,
        }));

        setPins(pinsData);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pins, loading };
};
