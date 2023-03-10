import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}
export const LoadingComponent = ({ message = "Loading..." }: Props) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          flex: 1,
        }}
      >
        <CircularProgress color="secondary" size={100} />
        <Typography variant="h4" sx={{ mt: 4 }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
