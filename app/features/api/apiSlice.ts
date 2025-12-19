import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '@app/store';
import {logout} from '@app/features/auth/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error && (result.error as any)?.data?.status === 108) {
    api.dispatch(logout());
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Profile', 'Balance', 'TransactionHistory'],
  endpoints: (builder) => ({
    login: builder.mutation<
      {status: number; message: string; data: {token: string}},
      {email: string; password: string}
    >({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),

    register: builder.mutation<
      {status: number; message: string},
      {email: string; first_name: string; last_name: string; password: string}
    >({
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),

    getProfile: builder.query<
      {
        status: number;
        message: string;
        data: {
          email: string;
          first_name: string;
          last_name: string;
          profile_image: string;
        };
      },
      void
    >({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<
      {
        status: number;
        message: string;
        data: {
          email: string;
          first_name: string;
          last_name: string;
          profile_image: string;
        };
      },
      {first_name: string; last_name: string}
    >({
      query: (body) => ({
        url: '/profile/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),

    uploadProfileImage: builder.mutation<
      {
        status: number;
        message: string;
        data: {profile_image: string};
      },
      FormData
    >({
      query: (formData) => ({
        url: '/profile/image',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),

    getBalance: builder.query<
      {status: number; message: string; data: {balance: number}},
      void
    >({
      query: () => '/balance',
      providesTags: ['Balance'],
    }),

    getServices: builder.query<
      {
        status: number;
        message: string;
        data: {
          service_code: string;
          service_name: string;
          service_icon: string;
          service_tariff: number;
        }[];
      },
      void
    >({
      query: () => '/services',
    }),

    getBanners: builder.query<
      {
        status: number;
        message: string;
        data: {
          banner_name: string;
          banner_image: string;
          description: string;
        }[];
      },
      void
    >({
      query: () => '/banner',
    }),

    transaction: builder.mutation<
      {
        status: number;
        message: string;
        data: {
          invoice_number: string;
          service_code: string;
          service_name: string;
          transaction_type: string;
          total_amount: number;
          created_on: string;
        };
      },
      {service_code: string}
    >({
      query: (body) => ({
        url: '/transaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Balance', 'TransactionHistory'],
    }),

    topUp: builder.mutation<
      {status: number; message: string; data: {balance: number} | null},
      {top_up_amount: number}
    >({
      query: (body) => ({
        url: '/topup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Balance', 'TransactionHistory'],
    }),

    getTransactionHistory: builder.query<
      {
        status: number;
        message: string;
        data: {
          offset: number;
          limit: number;
          records: {
            invoice_number: string;
            transaction_type: 'TOPUP' | 'PAYMENT';
            description: string;
            total_amount: number;
            created_on: string;
          }[];
        };
      },
      {limit?: number; offset?: number}
    >({
      query: (params = {}) => ({
        url: '/transaction/history',
        params,
      }),
      providesTags: ['TransactionHistory'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useGetBalanceQuery,
  useGetServicesQuery,
  useGetBannersQuery,
  useTransactionMutation,
  useTopUpMutation,
  useGetTransactionHistoryQuery,
} = apiSlice;
