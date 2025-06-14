// src/hooks/use-managed-restaurant.ts
import { useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";

export function useManagedRestaurant() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
  });

  return {
    managedRestaurant: data,
    isLoading,
    error,
  };
}
