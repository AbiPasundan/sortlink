import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8888/",
        credentials: "include",
    }),
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/api/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/api/login",
                method: "POST",
                body,
            }),
        }),
        getLinks: builder.query({
            query: () => "/api/links",
            transformResponse: response => response.Results,
        }),
        createSortLink: builder.mutation({
            query: (body) => ({
                url: "/api/links",
                method: "POST",
                body,
            }),
        }),
        deleteLink: builder.mutation({
            query: (id) => ({
                url: `/api/links/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Link"],
        }),
        me: builder.query({
            query: () => "/api/me",
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/api/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetLinksQuery, useCreateSortLinkMutation, useDeleteLinkMutation, useMeQuery, useLogoutMutation } = api;