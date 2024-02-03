import { TSales } from "../../../types/sales.types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    salesHistory: builder.query<
      TSales,
      {
        daily: string;
        weekly: string;
        monthly: string;
        yearly: string;
      }
    >({
      query: (options) => ({
        url: "/sales/sales-history", // Adjust the endpoint URL as needed
        method: "GET",
        params: options,
        // params: { brand: "n" },
      }),
    }),
  }),
});

export const { useSalesHistoryQuery } = productApi;
