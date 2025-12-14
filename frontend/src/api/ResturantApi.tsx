import { SearchState } from "@/pages/SearchPage";
import { Resturant, ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchResturant = (
  searchState?: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<ResturantSearchResponse> => {
    try {
      const params = new URLSearchParams();
      params.append("searchQuery", searchState?.searchQuery as string);
      params.append(
        "selectedCusine",
        `${searchState?.selectedCusine.join(",")}`
      );
      params.append("sortOptions", `${searchState?.sortOptions}`);
      params.append("page", `${searchState?.page}`);
      const response = await fetch(
        `${API_BASE_URL}/api/resturant/search/${city}?${params.toString()}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Unable to get resturnat");
      }
      return response.json();
    } catch (error) {
      throw new Error(error as string);
    }
  };
  const { data: results, isLoading } = useQuery(
    ["searchResturant", searchState],
    createSearchRequest,
    {
      enabled: !!city,
    }
  );
  return { results, isLoading };
};

export const useGetResturantById = (resturantId?: string) => {
  const getResturant = async (): Promise<Resturant> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/resturant/${resturantId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Unable to get resturnat");
      }
      return response.json();
    } catch (error) {
      throw new Error(error as string);
    }
  };
  const { data: result, isLoading } = useQuery("getResturant", getResturant, {
    enabled: !!resturantId,
  });
  return { result, isLoading };
};
