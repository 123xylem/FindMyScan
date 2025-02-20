import { supabase } from "./supabase";
import type { ScanCenter } from "../types";

export const getCenters = async (): Promise<ScanCenter[]> => {
  const { data, error } = await supabase
    .from("scan_centers")
    .select(
      `
      *,
      scan_center_types (
        scan_type,
        price_range,
        wait_time_days
      )
    `
    )
    .order("name");

  if (error) throw error;
  return data;
};
