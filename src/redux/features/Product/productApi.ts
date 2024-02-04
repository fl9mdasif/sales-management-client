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
      }),
    }),
  }),
});

const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<TProduct[], void>({
      query: (shoesData) => ({
        url: "/shoes/create-shoes",
        method: "POST",
        body: shoesData,
      }),
    }),
    deleteProducts: builder.mutation<ResponseType, string>({
      query: (ids) => ({
        url: `/shoes/shoeIds`,
        method: "DELETE",
        body: ids,
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
export const { useCreateProductMutation, useDeleteProductsMutation } =
  createProductApi;
