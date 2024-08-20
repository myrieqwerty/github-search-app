import { Box } from "@mui/material"
import { Result } from "../components/result"
import { Search } from "../components/search"
import { Detail } from "../components/detail"

export const HomePage = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} height={'100vh'} flex={'1'}>
      <Search />
      <Box display={'flex'} flex={'auto'}>
        <Result />
        <Detail />
      </Box>
    </Box>
  )
}