import { Chip, Typography } from "@mui/material";

type Props = {
  lang: string
}
export const Language = ({lang}: Props) => (
  <Chip variant="filled" color="primary" label={<Typography fontSize={'13px'} fontWeight={400}>{lang}</Typography>} />
)