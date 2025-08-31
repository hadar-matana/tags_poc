import z from "zod";

export const ground2ImageSchema = z.object({
  imageId: z.string().min(5),
  lon: z.number().min(1),
  lat: z.number().min(1),
});