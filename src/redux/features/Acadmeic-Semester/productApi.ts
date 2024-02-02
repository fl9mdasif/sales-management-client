import { TProduct } from "../../../types/product.types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      TProduct[],
      {
        sortBy?: string;
        sortOrder?: string;
        minPrice?: number;
        maxPrice?: number;
        releasedAt?: string;
        brand?: string;
        model?: string;
        size?: string;
        category?: string;
        color?: string;
        gender?: string;
        rawMaterial?: string;
      }
    >({
      query: (options) => ({
        url: "/shoes", // Adjust the endpoint URL as needed
        method: "GET",
        params: options,
        // params: { brand: "n" },
      }),
    }),
  }),
});

// const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllProducts: builder.query<TProduct[], void>({
//       query: () => ({
//         url: "/shoes",
//         method: "GET",
//         // params: options,
//       }),
//     }),
//   }),
// });

export const { useGetAllProductsQuery } = productApi;
