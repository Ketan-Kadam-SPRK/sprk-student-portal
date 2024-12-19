import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Styles from "../Sidebar.module.css";
import { Image } from "cloudinary-react";

const SidebarItem = ({
  title,
  icon: Icon,
  open,
  isActive,
  onClick,

}) => (
  <ListItem
    disablePadding
  
    onClick={() => {
      if (onClick) onClick();
    }}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        // justifyContent: open ? "initial" : "center",
        justifyContent: "initial",
        // px: 2.5,
        // mr: 3,
        borderRadius:'10px',
        backgroundColor: isActive ? "var(--sidebar-acitve-tab)" : "inherit",

        '&:hover': {
          backgroundColor: isActive ? "var(--sidebar-acitve-tab)" : "inherit",
          color: isActive ? "var(--sidebar-active-tab-text)" : "white",
        },
    
      }}
    >
        <ListItemIcon
          sx={{
            minWidth: 0,
            // mx: open ? 2 : 3.5,
            ml: 1,
            mr: 2,
            justifyContent: "center",
          }}
        >
          {typeof Icon === "string" ? (
            <Image
              className={Styles.Icons}
              publicId={Icon}
              cloudName="dxlzzgbfw"
            />
          ) : (
            React.createElement(Icon, { sx: { color: isActive ? "var(--sidebar-active-tab-text)" : "white"} })
          )}
        </ListItemIcon>
        <ListItemText
  
  slotProps={{
    primary: {
      style: {
        color: isActive ? "var(--sidebar-active-tab-text)" : "white",
        fontSize: "var(--font-size-small)",
        fontWeight: 600,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "100%",
      },
    },
  }}
>
  {title}
</ListItemText>
    </ListItemButton>
  </ListItem>
);

export default SidebarItem;
