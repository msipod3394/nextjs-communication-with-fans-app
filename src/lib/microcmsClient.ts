import { createClient } from "microcms-js-sdk";

export const microcmsClient = createClient({
  serviceDomain: "dgtr9dmtkg",
  apiKey: process.env.MICROCMS_APIKEY!,
});
