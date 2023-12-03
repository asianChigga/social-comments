import { useState, useEffect } from "react";
import axios from "axios";

interface CachedApiData {
  data: postData | commentData;
  isLoading: boolean;
  error: Error | unknown;
}

const useCachedApiData = (
  apiEndpoint: string,
  postId?: string | null
): CachedApiData => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

type postData = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

type commentData = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}[];
