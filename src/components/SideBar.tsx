import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CircleIcon from "@mui/icons-material/Circle";
import { IDrawerWidth } from "../models";

const Sidebar = ({ drawerWidth }: IDrawerWidth) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
          boxShadow: "10px 0px 10px 0px rgb(0 0 0 / 15%)",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <StyledToolbar />
      <List disablePadding>
        {["Upload", "Documents"].map((text, id) => {
          const isRendered = id % 2 === 0;
          return (
            <ListItem key={text} disablePadding>
              <StyledListItemButton autoFocus={isRendered}>
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  {isRendered ? <CottageIcon /> : <NoteAddIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </StyledListItemButton>
            </ListItem>
          );
        })}
        {["Inbox", "Sent", "Drafts"].map((text, id) => {
          return (
            <Collapse in={true} timeout="auto" unmountOnExit key={id}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <CircleIcon sx={{ width: "0.7rem" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
      </List>
    </Drawer>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  &:hover,
  :focus {
    background: #e9cee8;

    & > div {
      color: #920e8e;
    }

    &::before {
      content: "";
      position: absolute;
      width: 1rem;
      height: 40%;
      left: -4%;
      border-radius: 25%;
      background: #920e8e;
    }
  }
`;

const StyledToolbar = styled(Toolbar)`
  height: 6rem;
`;

export default React.memo(Sidebar);
