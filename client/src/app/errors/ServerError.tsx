import { Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";

export const ServerError = () => {
  const { state } = useLocation();

  return (
    <Container component={Paper} sx={{ minHeight: "80vh" }}>
      {state.error ? (
        <>
          <Typography variant="h3" gutterBottom color="error">
            {state.error.title}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1">
            {state.error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h3">
          Server error
        </Typography>
      )}
    </Container>
  );
};
