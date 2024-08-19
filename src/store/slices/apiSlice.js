import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '../../utils/API_CONFIG';

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (limit) => limit ? `posts?_limit=${limit}` : 'posts',
        }),
        addPost: builder.mutation({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
        }),
        updatePost: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: rest,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = apiSlice;
