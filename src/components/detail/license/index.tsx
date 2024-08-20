import { Typography } from "@mui/material";

type Props = {
  license?: string
}

export const License = ({license}: Props) => (
  <Typography fontSize={'14px'} fontWeight={400} color={'#000000DE'}>{license}</Typography>
)