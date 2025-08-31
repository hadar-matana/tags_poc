import { CoordConverterClient } from "../../services/coord-converter-client";
import { publicProcedure, router } from "../init";
import { ground2ImageSchema } from "./coord-converter-validation-schemas";

const coordConverterClient = new CoordConverterClient();

export const coordConvertorRouter = router({
  ground2Image: publicProcedure
    .input(ground2ImageSchema)
    .mutation(async ({ input }): Promise<{imageX: number, imageY: number}> => {
      return await coordConverterClient.ground2Image(input);
  })
})