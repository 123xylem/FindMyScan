import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../services/centers";
import type { ScanCenter } from "../types";

const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

export const useCenters = () => {
  return useQuery<ScanCenter[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2,
    retry: 2,
  });
};
