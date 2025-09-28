import { clientConfig, type ClientConfig } from "../../config";
import { publicProcedure, router } from "../init";

export const clientConfigRouter = router({
  getConfig: publicProcedure
    .query((): ClientConfig => {
      return clientConfig;
  })
})