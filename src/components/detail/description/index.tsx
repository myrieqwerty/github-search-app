import { Typography } from "@mui/material";

type Props = {
  description?: string
}

export const Description = ({description}: Props) => (
  <Typography textAlign={'justify'} fontSize={'14px'} fontWeight={400}>{description}</Typography>
)