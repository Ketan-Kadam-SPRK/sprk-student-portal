import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
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
  handleToggleOpen,
  isChilds = true,
  isChildVisible = false,
}) => (
  <ListItem
    disablePadding
    sx={{
      backgroundColor: isActive ? "var(--sidebar-acitve-tab)" : "inherit",
    }}
    onClick={() => {
      if (onClick) onClick();
      if (handleToggleOpen) handleToggleOpen();
    }}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        // justifyContent: open ? "initial" : "center",
        justifyContent: "initial",
        // px: 2.5,
        // mr: 3,
      }}
    >
      <Tooltip title={title} placement="right" arrow>
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
            React.createElement(Icon, { sx: { color: "white" } })
          )}
        </ListItemIcon>
      </Tooltip>
      <ListItemText
        primaryTypographyProps={{
          fontSize: "14px",
          fontWeight: "600",
          color: "white",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {title}
      </ListItemText>
      {open && isChilds && (
        <>{isChildVisible ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</>
      )}
    </ListItemButton>
  </ListItem>
);

export default SidebarItem;
