import { Box, Chip, Typography } from "@mui/material"

type Props = {
  topics?: string[]
}

export const Topics = ({topics}: Props) => {
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={'8px'}>
      {topics && topics.map(topic => (
        <Chip key={topic} variant="filled" label={<Typography fontSize={'13px'} fontWeight={400} color={'#000000DE'}>{topic}</Typography>} />
      ))}
    </Box>
  )
}