import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  List,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { NavLink, Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
  changeDarkMode: () => void;
  darkMode: boolean;
}

const midLinks = [
  { path: "/catalog", title: "catalog" },
  { path: "/about", title: "about" },
  { path: "/contact", title: "contact" },
];

const rightLinks = [
  { path: "/login", title: "login" },
  { path: "/register", title: "register" },
];

const navStyles = {
  color: "inherit",
  textTransform: "uppercase",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&:active": {
    color: "text.secondary",
  },
};

export default function Header({ changeDarkMode, darkMode }: Props) {
  const { basket } = useAppSelector((state) => state.basket);

  const itemCount = basket?.items?.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            E-Commerce Store
          </Typography>
          <Switch checked={darkMode} onChange={changeDarkMode} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ path, title }) => {
            return (
              <ListItem sx={navStyles} component={NavLink} to={path} key={path}>
                {title}
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ display: "flex", alignContent: "center" }}>
          <IconButton edge="start" size="large" component={Link} to="/basket">
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ path, title }) => {
              return (
                <ListItem
                  sx={navStyles}
                  component={NavLink}
                  to={path}
                  key={path}
                >
                  {title}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
