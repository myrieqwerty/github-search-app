import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { fetchRepos } from "../../store/slices/repo"
import { useNavigate, useSearchParams } from "react-router-dom"
import s from './search.module.scss'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') as string

  //чтоб поисковый запрос сохранился после перезагрузки страницы
  const [searchValue, setSearchValue] = useState<string>(query)

  const navigate = useNavigate()
  
  const dispatch = useDispatch<AppDispatch>()

  //поиск через search params react router`а
  const handleSearch = () => {
    navigate(`/?query=${searchValue}`)
  }

  useEffect(() => {
    // чтоб поисковый запрос сохранился после перезагрузки страницы
    dispatch(fetchRepos({query: query, first: 10}))
  }, [query])

  return (
    <Box bgcolor={'#00838F'}  height={'80px'}>
      <Box display={'flex'} p={'12px'} gap={'8px'}>
          <TextField className={s['input']} onKeyUp={(e) => {if (e.key === 'Enter') handleSearch()}} onChange={(e) => {setSearchValue(e.target.value)}} value={searchValue} variant="filled"  hiddenLabel placeholder="Введите поисковый запрос"/>
          <Button variant="contained" onClick={handleSearch}>
            <Typography fontWeight={500}>
              Искать
            </Typography>
          </Button>
      </Box>
    </Box>
  )
}

