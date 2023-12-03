import { useState, useEffect } from "react";
import axios from "axios";

const useCachedApiData = (apiEndpoint, postId = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = postId
          ? `${apiEndpoint}/comments/${postId}`
          : apiEndpoint;

        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsLoading(false);
        } else {
          const response = await axios.get(apiEndpoint);
          const fetchedData = response.data;

          localStorage.setItem(cacheKey, JSON.stringify(fetchedData));

          setData(fetchedData);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, postId]);

  return { data, isLoading, error };
};

export default useCachedApiData;
