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
        }}
      >
        <CircularProgress
          color="secondary"
          size={100}
          sx={{ position: "absolute", top: "35%" }}
        />
        <Typography variant="h4" sx={{ position: "absolute", top: "50%" }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
