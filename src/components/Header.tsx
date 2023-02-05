import {
  AppBar,
  Stack,
  Button,
  IconButton,
  Badge,
  Tooltip,
  Toolbar,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { IDrawerWidth } from "../models";

const Header = ({ drawerWidth }: IDrawerWidth) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        boxShadow: "none",
        bgcolor: "var(--main-color)",
        ml: `${drawerWidth}px`,
      }}
    >
      <StyledToolbar
        sx={{
          justifyContent: "end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              px: 0,
              minWidth: "auto",
              color: "var(--sup-color)",
              fontWeight: "bold",
            }}
          >
            EN
          </Button>
          <IconButton
            size="large"
            aria-label="show 1 new notifications"
            color="inherit"
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{ color: "var(--sup-color)" }} />
            </Badge>
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="My avatar" src="/avatar.jpg" />
            </IconButton>
          </Tooltip>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
};

const StyledToolbar = styled(Toolbar)`
  height: 6rem;

  @media (min-width: 320px) {
    padding: 0 2rem;
  }
`;

export default React.memo(Header);
