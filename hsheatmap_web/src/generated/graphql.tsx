import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Heatmap = {
  __typename?: 'Heatmap';
  _id: Scalars['Int'];
  domain: Domain;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  subdomain: Scalars['String'];
  xloc: Scalars['Float'];
  yloc: Scalars['Float'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHeatmap: Heatmap;
  updateHeatmap?: Maybe<Heatmap>;
  deleteHeatmap?: Maybe<Heatmap>;
  register: UserResponse;
  login: UserResponse;
  createDomain: Domain;
  deleteDomain?: Maybe<Domain>;
};


export type MutationCreateHeatmapArgs = {
  domain: Scalars['String'];
  subdomain: Scalars['String'];
  value: Scalars['Float'];
  yloc: Scalars['Float'];
  xloc: Scalars['Float'];
};


export type MutationUpdateHeatmapArgs = {
  subdomain: Scalars['String'];
  value?: Maybe<Scalars['Float']>;
  yloc?: Maybe<Scalars['Float']>;
  xloc?: Maybe<Scalars['Float']>;
  domain: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteHeatmapArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationCreateDomainArgs = {
  url: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteDomainArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  heatmaps: Array<Heatmap>;
  heatmap?: Maybe<Heatmap>;
  heatmapInfo?: Maybe<Array<Heatmap>>;
  me?: Maybe<User>;
  domains: Array<Domain>;
};


export type QueryHeatmapArgs = {
  id: Scalars['Float'];
};


export type QueryHeatmapInfoArgs = {
  domain: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type DomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type DomainsQuery = (
  { __typename?: 'Query' }
  & { domains: Array<(
    { __typename?: 'Domain' }
    & Pick<Domain, 'title' | '_id'>
  )> }
);

export type HeatmapInfoQueryVariables = Exact<{
  domain: Scalars['String'];
}>;


export type HeatmapInfoQuery = (
  { __typename?: 'Query' }
  & { heatmapInfo?: Maybe<Array<(
    { __typename?: 'Heatmap' }
    & Pick<Heatmap, 'createdAt' | 'updatedAt' | 'xloc' | 'yloc' | 'value' | 'subdomain'>
    & { domain: (
      { __typename?: 'Domain' }
      & Pick<Domain, 'url'>
    ) }
  )>> }
);

export type HeatmapsQueryVariables = Exact<{ [key: string]: never; }>;


export type HeatmapsQuery = (
  { __typename?: 'Query' }
  & { heatmaps: Array<(
    { __typename?: 'Heatmap' }
    & Pick<Heatmap, 'createdAt' | 'updatedAt' | 'xloc' | 'yloc' | 'value' | 'subdomain' | '_id'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | '_id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);


export const DomainsDocument = gql`
    query Domains {
  domains {
    title
    _id
  }
}
    `;

export function useDomainsQuery(options: Omit<Urql.UseQueryArgs<DomainsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DomainsQuery>({ query: DomainsDocument, ...options });
};
export const HeatmapInfoDocument = gql`
    query HeatmapInfo($domain: String!) {
  heatmapInfo(domain: $domain) {
    createdAt
    updatedAt
    xloc
    yloc
    value
    subdomain
    domain {
      url
    }
  }
}
    `;

export function useHeatmapInfoQuery(options: Omit<Urql.UseQueryArgs<HeatmapInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HeatmapInfoQuery>({ query: HeatmapInfoDocument, ...options });
};
export const HeatmapsDocument = gql`
    query Heatmaps {
  heatmaps {
    createdAt
    updatedAt
    xloc
    yloc
    value
    subdomain
    _id
  }
}
    `;

export function useHeatmapsQuery(options: Omit<Urql.UseQueryArgs<HeatmapsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HeatmapsQuery>({ query: HeatmapsDocument, ...options });
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    user {
      username
      _id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};