import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { Repo, Status } from "../../store/slices/repo"
import { type RootState } from "../../store"
import { Welcome } from "./welcome"
import { RepoTable } from "./repo-table"

export const Result = () => {
  const repos : Repo[] = useSelector<RootState>(state => state.repos.repos) as Repo[]
  const status : Status = useSelector<RootState>(state => state.repos.status) as Status

  return (
    <Box p={'12px 32px'} display={'flex'} flex={'auto'}>
      {status === Status.IDLE ? <Welcome /> : <RepoTable repos={repos} />}
    </Box>
  )
}