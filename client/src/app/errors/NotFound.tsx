import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container component={Paper}>
      <Typography variant="h2">
        Oops - We couldn't find what you are looking for
      </Typography>
      <Divider />
      <Button component={Link} to="/catalog" fullWidth>
        go back to shop
      </Button>
    </Container>
  );
};
