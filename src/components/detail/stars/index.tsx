import { Box, Typography } from "@mui/material"
import { StarIcon } from "../../icons/star"

export const Stars = ({starCount} : {starCount: number}) => {
  return (
    <Box display={'flex'} gap={'8px'} alignItems={'center'}>
      <StarIcon /> 
      <Typography variant="body1">{starCount.toLocaleString()}</Typography>
    </Box>
  )
}