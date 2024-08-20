import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material"
import { fetchRepos, PaginationInfo, Repo, setActiveRepo, Status } from "../../../store/slices/repo"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

type Props = {
  repos: Repo[]
}

//таблица результатов поиска репозиториев
export const RepoTable = ({repos} : Props) => {

  //статус загрузки результатов поиска
  const status: Status = useSelector<RootState>((state) => state.repos.status) as Status

  //получение query params текста поиска
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('query') as string

  const dispatch = useDispatch<AppDispatch>()

  const {id : activeRepoId} : Repo = useSelector<RootState>((state) => state.repos.activeRepo) as Repo || -1

  //выбрать активный репозиторий для просмотра деталей
  const changeActiveRepo = (id : number | string) => dispatch(setActiveRepo({id: id}))

  //пагинация
  const pageInfo : PaginationInfo = useSelector<RootState>((state) => state.repos.paginationInfo) as PaginationInfo
  const [page, setPage] = useState(0)
  const handleChangePage = (newPage: number) => {
    if (newPage > page ) {
      dispatch(fetchRepos({query: searchQuery, after: pageInfo.endCursor, first: 10}))
    } else {
      dispatch(fetchRepos({query: searchQuery, before: pageInfo.startCursor, last: 10}))
    }
    setPage(newPage)

  }


  return (
    <Box gap={'24px'} display={'flex'} flexDirection={'column'}>
      {status === Status.LOADING && <CircularProgress />}
      {status === Status.SUCCESS && (
        <>
          <Typography variant="h3">{repos.length > 0 ? "Результаты поиска" : "Репозиториев не найдено"}</Typography>
          {repos.length > 0 && (
            <Table width={'100%'}>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Язык</TableCell>
                  <TableCell><TableSortLabel direction="desc">Число форков</TableSortLabel></TableCell>
                  <TableCell><TableSortLabel>Число звезд</TableSortLabel></TableCell>
                  <TableCell><TableSortLabel>Дата обновления</TableSortLabel></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repos.map(repo => (
                  <TableRow key={repo.id} hover selected={repo.id === activeRepoId} onClick={() => changeActiveRepo(repo.id)}>
                    <TableCell>{repo?.name}</TableCell>
                    <TableCell>{repo?.primaryLanguage}</TableCell>
                    <TableCell>{repo?.forkCount}</TableCell>
                    <TableCell>{repo?.starCount}</TableCell>
                    <TableCell>{repo?.updatedAt.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)}
            {repos.length > 0 && <TablePagination component={'div'} rowsPerPage={10} count={pageInfo?.totalCount} page={page} onPageChange={(e, newPage) => {handleChangePage(newPage)}}/>}
        </>
      )}
    </Box>
  )
}