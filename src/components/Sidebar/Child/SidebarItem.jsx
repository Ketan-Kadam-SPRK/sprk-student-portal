import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Image } from "cloudinary-react";
import Styles from "../Sidebar.module.css";

const SidebarItem = ({ title, icon: Icon, open, isActive, onClick }) => {
  const [isHover, setHover] = React.useState(false);

  return (
    <ListItem
      disablePadding
      onClick={() => {
        if (onClick) onClick();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          borderRadius: "10px",
          backgroundColor: isActive ? "var(--sidebar-acitve-tab)" : "inherit",
          "&:hover": {
            backgroundColor: "var(--sidebar-onhover-tab)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
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
            React.createElement(Icon, {
              sx: {
                color: isHover ? "var(--primary-color)" : "white",
              },
            })
          )}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            style: {
              color: isHover ? "var(--primary-color)" : "white",
              fontSize: "var(--font-size-small)",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
