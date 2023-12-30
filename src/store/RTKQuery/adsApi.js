import { createApi, fetchBaseQuery,retry } from "@reduxjs/toolkit/query/react";
const DATA_TAG = { type: "Ads", id: "LIST" };

export const productsApi = createApi({
    reducerPath: "productsApi",
    tagTypes: ["Ads"],
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8090/",
    }), 
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: () => "/ads",
        providesTags: (result) => (result ? [DATA_TAG] : []),
      }),
  
      getOneProduct: builder.query({
        query: (id) => `/ads/${id}`,
        providesTags: (result) => (result ? [DATA_TAG] : []),
      }),
  
      getMeProducts: builder.query({
        query:  () =>  {
  
          return {
            url: "/ads/me",
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          };
        },
        extraOptions: { maxRetries: 0 },
        providesTags: [{ type: "ADS", id: "LIST" }],
      }),
  
     
      }),
    })
  
  export const {
    useGetAllProductsQuery,
    useGetMeProductsQuery,
    useGetOneProductQuery,
  } = productsApi;