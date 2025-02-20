import { supabase } from "./supabase";
import { ScanType } from "../types";

export type UploadScanParams = {
  file: any; // ImagePicker result asset
  scanType: ScanType;
  scanDate: Date;
  notes?: string;
};

const SIGNED_URL_EXPIRY = 30 * 24 * 60 * 60; // 30 days in seconds

export const uploadScan = async ({
  file,
  scanType,
  scanDate,
  notes,
}: UploadScanParams) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user");

    // Create filename with proper extension
    const timestamp = Date.now();
    const fileExt = file.mimeType.split("/")[1] || "jpg";
    const fileName = `${timestamp}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Create FormData for upload
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: fileName,
    } as any);

    // Direct upload using fetch
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user_scans")
      .upload(filePath, formData, {
        contentType: file.mimeType,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get signed URL with longer expiry
    const { data: signedData, error: signedError } = await supabase.storage
      .from("user_scans")
      .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days

    if (signedError) throw signedError;

    // Store in database
    const { data: scan, error: insertError } = await supabase
      .from("user_scans")
      .insert({
        user_id: user.id,
        scan_type: scanType,
        file_url: signedData.signedUrl,
        file_path: filePath,
        scan_date: scanDate.toISOString().split("T")[0], // Store date only
        notes,
      })
      .single();

    if (insertError) throw insertError;
    return scan;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const getUserScans = async () => {
  const { data, error } = await supabase
    .from("user_scans")
    .select("*")
    .order("scan_date", { ascending: false });

  if (error) throw error;

  // Transform the data and get signed URLs
  return await Promise.all(
    data?.map(async (scan) => {
      // Get signed URL without transformations
      const { data: signedData } = await supabase.storage
        .from("user_scans")
        .createSignedUrl(scan.file_path, 3600); // Remove transform options

      return {
        id: scan.id,
        userId: scan.user_id,
        scanType: scan.scan_type,
        fileUrl: signedData?.signedUrl || "",
        filePath: scan.file_path,
        notes: scan.notes,
        scanDate: scan.scan_date,
        createdAt: scan.created_at,
        updatedAt: scan.updated_at,
      };
    }) || []
  );
};

export const updateScan = async (
  scanId: string,
  updates: {
    scan_type?: ScanType;
    notes?: string;
  }
) => {
  const { data, error } = await supabase
    .from("user_scans")
    .update(updates)
    .eq("id", scanId)
    .single();

  if (error) throw error;
  return data;
};

export const deleteScan = async (scanId: string, filePath: string) => {
  // First delete the file
  const { error: storageError } = await supabase.storage
    .from("user_scans")
    .remove([filePath]);

  if (storageError) throw storageError;

  // Then delete the database record
  const { error: dbError } = await supabase
    .from("user_scans")
    .delete()
    .eq("id", scanId);

  if (dbError) throw dbError;
};
