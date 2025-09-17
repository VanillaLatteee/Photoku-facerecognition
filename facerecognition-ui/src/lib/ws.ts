
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_BASE || 'http://10.10.1.15:3000';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    // GET MESSAGES
    getMessgages: build.query<ParamsMessages, string>({
      query: (room_id) => `messages?room_id=${room_id}`,
    }), 
    getToken: build.query<ParamsMessages, string>({
      query: (user_id) => `token?user_id=${user_id}`,
    })
  }),
})

export const { useGetMessgagesQuery } = api