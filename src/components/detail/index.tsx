import { Box, Typography } from "@mui/material"
import { Stars } from "./stars"
import { Topics } from "./topics"
import { Language } from "./language"
import { License } from "./license"
import { Description } from "./description"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { Repo } from "../../store/slices/repo"

export const Detail = () => {
  //получение данных активного репозитория из стейта
  const activeRepo : Repo = useSelector<RootState>(state => state.repos.activeRepo) as Repo
  return (
    <Box bgcolor={'#F2F2F2'} p={'24px'} flexBasis={'480px'} display={'flex'} flexDirection={'column'} gap={'16px'}>
      {activeRepo === null &&  (
        <Box display={'flex'} flex={'auto'} justifyContent={'center'} alignItems={'center'}>
          <Typography fontSize={'14px'} fontWeight={400} textAlign={'center'} color={'#4F4F4F'}>Выберите репозитарий</Typography>
        </Box>
      )}
      {activeRepo && (
        <>
          <Typography variant="h2" fontSize={'32px'} fontWeight={'400'} color={'#000000DE'}>
            {activeRepo?.name}
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            {activeRepo.primaryLanguage ? <Language lang={activeRepo?.primaryLanguage}/> : <div></div>}
            <Stars starCount={activeRepo?.starCount}/>
          </Box>
          <Topics topics={activeRepo?.topics}/>
          <Description description={activeRepo?.description} />
          <License license={activeRepo?.license}/>
        </>
      )}
      
    </Box>
  )
}