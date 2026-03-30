import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, folder: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage.from("site-media").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("site-media").getPublicUrl(fileName);
  return data.publicUrl;
}