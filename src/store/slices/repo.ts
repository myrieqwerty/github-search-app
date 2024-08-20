//все что связано с репозиторием: типы, запросы на апи, graphql документ, слайс засунул сюда

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { gql } from "graphql-request";


export interface Repo {
  id: number,
  name: string,
  primaryLanguage: string,
  license: string,
  description?: string,
  forkCount: number,
  starCount: number,
  updatedAt: Date | string,
  topics?: string[]
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success"
}

export interface PaginationInfo {
  totalCount: number,
  startCursor: string,
  endCursor: string,
  hasPreviousPage: boolean,
  hasNextPage: boolean
}

export interface RepoState {
  searchValue: string,
  status: Status,
  paginationInfo: PaginationInfo | null
  repos: Repo[],
  activeRepo: Repo | null,
  error: any,
}

interface RepoParams {
  query: string,
  after?: string,
  before?: string,
  first?: number,
  last?: number
}

const initialState : RepoState = {
  searchValue: '',
  status: Status.IDLE,
  activeRepo: null,
  paginationInfo: null,
  repos: [],
  error: null
}




export const fetchRepos = createAsyncThunk(
  'repos/getReposBySearch',
  async(queryParams : RepoParams, {rejectWithValue}) => {
    //запрос к api github grapql api
    try {
      const result = await client.request<any>(GET_REPOS, queryParams)
      const reposList : Repo[] = result?.search?.edges?.map((repo: any) => {
        return {
          id: repo?.node?.id,
          name: repo?.node?.name,
          primaryLanguage: repo?.node?.primaryLanguage?.name,
          license: repo?.node?.licenseInfo?.name,
          forkCount: repo?.node?.forkCount,
          starCount: repo?.node?.stargazers?.totalCount,
          description: repo?.node?.description,
          topics: repo?.node?.repositoryTopics?.edges.map((topic: any) => topic.node.topic.name),
          updatedAt: repo?.node?.updatedAt
        } as Repo
      })
      const paginationInfo : PaginationInfo = {
        totalCount: result?.search?.repositoryCount,
        startCursor: result?.search?.pageInfo?.startCursor,
        endCursor: result?.search?.pageInfo?.endCursor,
        hasNextPage: result?.search?.pageInfo?.hasNextPage,
        hasPreviousPage: result?.search?.pageInfo?.hasPreviousPage
      }
      console.log(reposList)
      return {reposList, paginationInfo}
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)



const repoSlice = createSlice({
  name: 'repos',
  initialState: initialState,
  reducers:  {
    setActiveRepo(state, action: PayloadAction<{id: string | number}>) {
      const activeId = action.payload.id
      state.activeRepo = state.repos.find((repo) => repo.id === activeId) as Repo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state) => {
      state.status = Status.LOADING
      state.error = null
    })
    builder.addCase(fetchRepos.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.repos = action.payload.reposList  
      state.paginationInfo = action.payload.paginationInfo
    })
    builder.addCase(fetchRepos.rejected, (state, action) => {
      state.status = Status.IDLE
      state.error = action.payload
    })
    
  }

  

})

export const {setActiveRepo} = repoSlice.actions


export default repoSlice.reducer

const GET_REPOS = gql`
  query getRepos($query:String!, $after: String, $before: String, $first: Int, $last: Int){
    search(query: $query, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
      node {
        ...on Repository {
          id
          name
          primaryLanguage {
            name
          }
          licenseInfo {
            name
          }
          description
          forkCount
          stargazers {
            totalCount
          }
          updatedAt
          repositoryTopics(first: 10) {
            edges {
              node {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
      repositoryCount

    }
  }
`