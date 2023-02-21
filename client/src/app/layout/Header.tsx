import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  changeDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ changeDarkMode, darkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">STORE</Typography>
        <Switch checked={darkMode} onChange={changeDarkMode} />
      </Toolbar>
    </AppBar>
  );
}
