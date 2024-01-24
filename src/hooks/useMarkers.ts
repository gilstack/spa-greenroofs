import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/marker`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  const refreshMarkers = async () => {
    setLoading(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { markers, loading, refreshMarkers };
};

export const useMarker = (id: string) => {
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${apiUrl}/marker/find/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setMarker(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do marcador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { marker, loading };
};
