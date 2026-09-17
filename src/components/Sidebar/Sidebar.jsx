import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Typography, Avatar } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Image } from "cloudinary-react";
import Styles from "./Sidebar.module.css";

import { useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useSelector, useDispatch } from "react-redux";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EventBusyRounded from "@mui/icons-material/EventBusyRounded";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

import Breadcrumb from "./Child/Breadcrumb";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { tabMapping } from "./Child/ActiveTabsObject";

import {
  AppBar,
  Drawer,
  DrawerHeader,
  headingTextStyle,
} from "./Child/MuiDrawerStyle";

import SidebarItem from "./Child/SidebarItem";
import ProfileMenu from "./Child/ProfileMenu";

import RoutesConfig from "../../Routes/RoutesConfig";

import { getUserPic } from "../Login/store/login.actions";
import { setUserProfilePic } from "../Login/store/authSlice";

import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import BlinkedStatus from "../Common/BlinkedStatus/BlinkedStatus";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headers = useAuthHeaders();
  const theme = useTheme();

  const userDetails = useSelector((state) => state.authSlice.userDetails) || {};

  const allowedTabs =
    useSelector((state) => state.authSlice.entitlements) || [];

  const userProfilePic =
    useSelector((state) => state.authSlice.userProfilePic) || "";

  const orglogo = useSelector((state) => state.authSlice.orgDetails.orgLogo);

  // Sidebar open/close
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openNoti, setOpenNoti] = React.useState(null);

  const isNotiOpen = Boolean(openNoti);
  const isMenuOpen = Boolean(anchorEl);

  const location = useLocation();
  const locationPath = location.pathname;

  let activeTab = locationPath.split("/")[1];

  for (const path in tabMapping) {
    if (locationPath.startsWith(path)) {
      activeTab = tabMapping[path];
      break;
    }
  }

  // Set active tab
  const setActiveTab = (tabName) => {
    localStorage.setItem("activeTab", tabName);
  };

  useEffect(() => {
    setActiveTab(locationPath?.split("/")[1]);
  }, [locationPath]);

  useEffect(() => {
    setActiveTab(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Notification menu
  const handleNotiMenuOpen = (event) => {
    setOpenNoti(event.currentTarget);
  };

  const handleNotiMenuClose = () => {
    setOpenNoti(null);
  };

  // Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleSidebar = () => {
    setOpen((prevState) => !prevState);
  };

  // Get profile picture
  useEffect(() => {
    getProfilePic();
  }, []);

  const getProfilePic = () => {
    dispatch(getUserPic({ headers })).then((res) => {
      dispatch(
        setUserProfilePic({
          userProfilePic: res?.payload || "",
        })
      );
    });
  };

  // Close drawer when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (window.innerWidth > 768) return;

      const drawer = document.querySelector(`.${Styles.drawer}`);
      const menuButton = document.querySelector("#sidebar-menu-button");

      if (
        drawer &&
        open &&
        !drawer.contains(event.target) &&
        menuButton &&
        !menuButton.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  return (
    <Box
      sx={{
        display: "grid",
        height: "100vh",
        gridTemplateRows: "64px 1fr",
        width: "100%",
      }}
    >
      <CssBaseline />

      {/* ================= TOP BAR ================= */}
      <div style={{ width: "100%" }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 0px 0px 0px",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar className={Styles.toolbarStyle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Mobile Menu */}
              <IconButton
                id="sidebar-menu-button"
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleSidebar}
                edge="start"
                sx={{
                  marginRight: 1,
                  color: "#e4e8ed",
                  display: {
                    xs: "block",
                    sm: "block",
                  },
                  "@media (min-width: 769px)": {
                    display: "none",
                  },
                }}
              >
                <MenuIcon sx={{ color: "#888888" }} />
              </IconButton>

              {/* Organization Logo */}
              <Box>
                <Image
                  style={{
                    width: "160px",
                    padding: "10px",
                    objectFit: "contain",
                  }}
                  publicId={`${orglogo}`}
                  cloudName={`${orglogo?.split("/")[3]}`}
                />
              </Box>
            </Box>

            {/* ================= RIGHT SIDE ================= */}
            <Box className={Styles.notificationBox}>
              <BlinkedStatus status={userDetails?.student_status || ""} />

              {/* Profile */}
              <IconButton
                size="large"
                edge="start"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="auto"
                className={Styles.profileMenuStyle}
              >
                {!userProfilePic ? (
                  <Avatar className={Styles.avtarStyle}>
                    <AccountCircleIcon fontSize="large" />
                  </Avatar>
                ) : (
                  <img
                    src={userProfilePic || "./default-avatar.png"}
                    className={Styles.ProfileStyle}
                    alt="profile"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "./default-avatar.png";
                    }}
                  />
                )}

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                      md: "flex",
                      lg: "flex",
                    },
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "var(--sidebar-bg-color)",
                      fontWeight: "600",
                      cursor: "pointer",
                      maxWidth: "120px",
                      wordBreak: "break-all",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                    title={userDetails?.name}
                  >
                    {userDetails?.name}
                  </Typography>

                  <KeyboardArrowDownIcon color="primary" />
                </Box>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <ProfileMenu handleMenuClose={handleMenuClose} isMenuOpen={anchorEl} />
      </div>

      {/* ================= MAIN AREA ================= */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          backgroundColor: "var(--background-color)",
        }}
      >
        {/* ================= SIDEBAR ================= */}
        <div className={open ? Styles.DrawerDiv : Styles.DrawerDiv2}>
          <Drawer
            variant="permanent"
            open={open}
            className={Styles.drawer}
            PaperProps={{
              sx: {
                width: 240,
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
              },
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
                overflowY: "auto",
                flexGrow: 1,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div>
                {/* Drawer Header */}
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon size="large" color="primary" />
                    ) : (
                      <ChevronLeftIcon size="large" color="primary" />
                    )}
                  </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                  {/* ================= OVERVIEW ================= */}
                  {allowedTabs.includes("DASHBOARD") && (
                    <>
                      <Typography sx={headingTextStyle}>Overview</Typography>

                      <SidebarItem
                        title="Dashboard"
                        icon={DashboardRoundedIcon}
                        open={open}
                        isActive={activeTab === "Dashboard"}
                        onClick={() => {
                          navigate("/Dashboard");
                          handleTabClick("Dashboard");
                          handleDrawerClose();
                        }}
                      />
                    </>
                  )}

                  {/* ================= ACADEMICS ================= */}
                  {(allowedTabs.includes("COURSE_GROUPS") ||
                    allowedTabs.includes("BATCHES") ||
                    allowedTabs.includes("EXAMS") ||
                    allowedTabs.includes("LEAVES") ||
                    allowedTabs.includes("EVENTS") ||
                    allowedTabs.includes("MODULE_REQUEST")) && (
                    <Typography
                      sx={{
                        ...headingTextStyle,
                        mt: 3,
                      }}
                    >
                      Academics
                    </Typography>
                  )}

                  {/* Course Groups */}
                  {allowedTabs.includes("COURSE_GROUPS") && (
                    <SidebarItem
                      title="Course Groups"
                      icon={AutoStoriesRoundedIcon}
                      open={open}
                      isActive={activeTab === "Course_Groups"}
                      onClick={() => {
                        navigate("/Course_Groups");
                        handleTabClick("Course_Groups");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Batches */}
                  {allowedTabs.includes("BATCHES") && (
                    <SidebarItem
                      title="Batches"
                      icon={EventNoteRoundedIcon}
                      open={open}
                      isActive={activeTab === "Batches"}
                      onClick={() => {
                        navigate("/Batches");
                        handleTabClick("Batches");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Exams */}
                  {allowedTabs.includes("EXAMS") && (
                    <SidebarItem
                      title="Exams"
                      icon={AssignmentRoundedIcon}
                      open={open}
                      isActive={activeTab === "Exams"}
                      onClick={() => {
                        navigate("/Exams");
                        handleTabClick("Exams");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Leaves */}
                  {allowedTabs.includes("LEAVES") && (
                    <SidebarItem
                      title="Leaves"
                      icon={EventBusyRounded}
                      open={open}
                      isActive={activeTab === "Leaves"}
                      onClick={() => {
                        navigate("/Leaves");
                        handleTabClick("Leaves");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Events */}
                  {allowedTabs.includes("EVENTS") && (
                    <SidebarItem
                      title="Events"
                      icon={EmojiEventsIcon}
                      open={open}
                      isActive={activeTab === "Events"}
                      onClick={() => {
                        navigate("/Events");
                        handleTabClick("Events");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* ================= MODULE REASSIGN ================= */}
                  {allowedTabs.includes("MODULE_REQUEST") && (
                    <SidebarItem
                      title="Module Request"
                      icon={LibraryAddOutlinedIcon}
                      open={open}
                      isActive={activeTab === "Module_Request"}
                      onClick={() => {
                        navigate("/Module_Request");
                        handleTabClick("Module_Request");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* ================= PAYMENT DETAILS ================= */}
                  {(allowedTabs.includes("BOOKINGS") ||
                    allowedTabs.includes("RECEIPTS")) && (
                    <Typography
                      sx={{
                        ...headingTextStyle,
                        mt: 3,
                      }}
                    >
                      Payment Details
                    </Typography>
                  )}

                  {/* Bookings */}
                  {allowedTabs.includes("BOOKINGS") && (
                    <SidebarItem
                      title="Bookings"
                      icon={PaymentsRoundedIcon}
                      open={open}
                      isActive={activeTab === "Bookings"}
                      onClick={() => {
                        navigate("/Bookings");
                        handleTabClick("Bookings");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Receipts */}
                  {allowedTabs.includes("RECEIPTS") && (
                    <SidebarItem
                      title="Receipts"
                      icon={ReceiptLongIcon}
                      open={open}
                      isActive={activeTab === "Receipts"}
                      onClick={() => {
                        navigate("/Receipts");
                        handleTabClick("Receipts");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* ================= CAREER ================= */}
                  {(allowedTabs.includes("CERTIFICATES") ||
                    allowedTabs.includes("JOB_OPPORTUNITIES")) && (
                    <Typography
                      sx={{
                        ...headingTextStyle,
                        mt: 3,
                      }}
                    >
                      Career
                    </Typography>
                  )}

                  {/* Certificates */}
                  {allowedTabs.includes("CERTIFICATES") && (
                    <SidebarItem
                      title="Certificates"
                      icon={WorkspacePremiumRoundedIcon}
                      open={open}
                      isActive={activeTab === "Certificates"}
                      onClick={() => {
                        navigate("/Certificates");
                        handleTabClick("Certificates");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* Job Opportunities */}
                  {allowedTabs.includes("JOB_OPPORTUNITIES") && (
                    <SidebarItem
                      title="Job Opportunities"
                      icon={WorkRoundedIcon}
                      open={open}
                      isActive={activeTab === "Job_Opportunities"}
                      onClick={() => {
                        navigate("/Job_Opportunities");
                        handleTabClick("Job_Opportunities");
                        handleDrawerClose();
                      }}
                    />
                  )}

                  {/* ================= KEEP LEARNING ================= */}
                  {allowedTabs.includes("EXPLORE_COURSES") && (
                    <>
                      <Typography
                        sx={{
                          ...headingTextStyle,
                          mt: 3,
                        }}
                      >
                        Keep Learning
                      </Typography>

                      <SidebarItem
                        title="Explore Courses"
                        icon={CategoryIcon}
                        open={open}
                        isActive={activeTab === "Explore_Courses"}
                        onClick={() => {
                          navigate("/Explore_Courses");
                          handleTabClick("Explore_Courses");
                          handleDrawerClose();
                        }}
                      />
                    </>
                  )}
                </List>
              </div>
            </div>
          </Drawer>
        </div>

        {/* Toast */}
        <ToastContainer position="bottom-right" autoClose={3000} />

        {/* ================= CONTENT ================= */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            flex: 1,
            overflow: "hidden",
            position: "relative",
            zIndex: (theme) => theme.zIndex.drawer + 0,
          }}
        >
          <Breadcrumb />

          <RoutesConfig />
        </Box>
      </div>
    </Box>
  );
}

export default Sidebar;
