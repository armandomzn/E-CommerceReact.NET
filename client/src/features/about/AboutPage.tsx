import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = () => {
    agent.TestErrors.getValidationError().catch((errors) => {
      setValidationErrors(errors);
    });
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Errors for testing purposes
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch(console.log)}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch(console.log)}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch(console.log)}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch(console.log)}
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationErrors}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => {
              return (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Alert>
      )}
    </Container>
  );
};
