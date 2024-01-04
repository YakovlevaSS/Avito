import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setToken, removeUser } from "../slices/userSlice";

/**
 * baseQueryWithReauth – это наша кастомная обертка над fetchBaseQuery, которая умеет обновлять access токен если запрос вернул 401 код.
 * Эта функция подразумевает, что access и refresh токены хранятся в redux сторе auth.
 *
 * args - это параметры конкретного запроса, там лежит url, method и другие параметры запроса
 * api и extraOptions - это доп. параметры с хелперами
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**
   * fetchBaseQuery - это обертка от rtk-quert над fetch функцией
   * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
   *
   * fetchBaseQuery возвращает функцию, которую можно воспринимать как аналог fetch или axios функции.
   * то есть вызов "await baseQuery(...)" можно воспринимать как вызов "await fetch(...)"
   */
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
    // prepareHeaders - это часть api fetchBaseQuery, которая позволяет сформировать общие заголовки для всех запросов
    prepareHeaders: (headers, { getState }) => {
      // Мы достаем из стора access токен и прикрепляем его ко всем запросам, чтобы не пробрасывать токен в каждый запрос вручную
      // Мы находимся внутри callback функции, которая вызывается непосредственно перед каждым запросом,
      // таким образом все запросы всегда используют актуальный acces токен из redux стора
      const token = getState().user.accessToken;

      // Чтобы выключить отображение debug логов в консоли браузера, включите уровень Verbose\Debug в консоли разработчика
      console.debug("Использую токен из стора", { token });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions);
  console.debug("Результат первого запроса", { result });

  // Если запрос выполнился не с 401 кодом, то все хорошо, просто отдаем результат запроса наружу
  if (result?.error?.status !== 401) {
    return result;
  }

  // Ниже обрабатываем 401 код

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug("Принудительная авторизация!");
    api.dispatch(removeUser());
    // window.location.navigate("/");
  };

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk query, она прилетает параметром запроса в функцию
  const { user } = api.getState();
  console.debug("Данные пользователя в сторе", { user });
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем, разлогиниваем его и отправляем авторизоваться руками
  if (!user.refreshToken) {
    return forceLogout();
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: "/auth/login/",
      method: "PUT",
      body: {
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
      },
      headers: {
        "content-type": "application/json",
      },
    },
    api,
    extraOptions
  );

  console.debug("Результат запроса на обновление токена", { refreshResult });

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  // Апи может не вернуть новый access токен по разным причинам, например у нас неверный refresh токен или refresh токен протух (обычно refresh токены не протухаю, но бывает и такое)
  // if (!refreshResult.data.access_token) {
  //   return forceLogout();
  // }
  if (refreshResult?.error?.status === 401) {
    return forceLogout();
  } else {
    if (!refreshResult.data.access_token) {
      return forceLogout();
    }

  // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
  api.dispatch(setToken({
    accessToken: refreshResult.data.access_token,
    refreshToken: refreshResult.data.refresh_token,
    typeToken: refreshResult.data.token_type,
  }))
}

  // Делаем повторный запрос с теми же параметрами что и исходный,
  // но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions);

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

export const productsApi = createApi({
    reducerPath: "productsApi",
    tagTypes: ["ADS", "USER", "COMMENTS"],
    // baseQuery: fetchBaseQuery({
    //   baseUrl: "http://localhost:8090/",
    // }), 
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: () => "/ads",
        providesTags: ["ADS"],
      }),
  
      getOneProduct: builder.query({
        query: (id) => `/ads/${id}`,
        providesTags: ["ADS"],
      }),
  
      getMeProducts: builder.query({
        query:  () =>  {
  
          return {
            url: "/ads/me",
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          };
        },
        providesTags: ["ADS"],
      }),
  
      addProductText: builder.mutation({
        query: (body) => ({
          url: "/adstext",
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: body.nameAdv,
            description: body.descriptionAdv,
            price: body.priceAdv,
          }),
        }),
        invalidatesTags: ["ADS"],
      }),

      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/ads/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["ADS"],
      }),
  
      updateProduct: builder.mutation({
        query: (body) => {
          return {
            url: `/ads/${body.id}`,
            method: "PATCH",
            body: JSON.stringify({
              title: body.nameAdv,
              description: body.descriptionAdv,
              price: body.priceAdv,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
        invalidatesTags: ["ADS"],
      }),
  
      addProductImage: builder.mutation({
        query: (body) => {
          const formData = new FormData();
          console.log(body.file);
          formData.append("file", body.file);
  
          return {
            url: `/ads/${body.id}/image`,
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": undefined,
            },
          };
        },
        invalidatesTags: ["ADS"],
      }),
  
      deleteProductImage: builder.mutation({
        query: (body) => {
          return {
            url: `/ads/${body.id}/image/?${new URLSearchParams({
              file_url: body.url,
            })}`,
            method: "DELETE",
            headers: {},
          };
        },
        invalidatesTags: ["ADS"],
      }),

      getComments: builder.query({
        query:  (id) =>  {
  
          return {
            url: `/ads/${id}/comments`,
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          };
        },
        providesTags: ["COMMENTS"],
      }),

      addComment: builder.mutation({
        query: (body) => ({
          url: `/ads/${body.id}/comments`,
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            text: body.text,
          }),
        }),
        invalidatesTags: ["COMMENTS"],
      }),

      getUser: builder.query({
        query:  () =>  {
          return {
            url: `/user`,
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          };
        },
        providesTags: ["USER"],
      }),

      changeUser: builder.mutation({
        query: (body) => ({
          url: `/user`,
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: body.nameInput,
            surname: body.surnameInput,
            city: body.cityInput,
            phone: body.phoneInput,
          }),
        }),
        invalidatesTags: ["USER"],
      }),

      setAvatar: builder.mutation({
        query: (body) => {
          const formData = new FormData();
          formData.append("file", body);
  
          return {
            url: `/user/avatar`,
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["USER"],
      }),

      }),
    })
  
  export const {
    useGetAllProductsQuery,
    useGetMeProductsQuery,
    useGetOneProductQuery,
    useAddProductTextMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useAddProductImageMutation,
    useDeleteProductImageMutation,
    useGetCommentsQuery,
    useAddCommentMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useChangeUserMutation,
    useSetAvatarMutation,
  } = productsApi;