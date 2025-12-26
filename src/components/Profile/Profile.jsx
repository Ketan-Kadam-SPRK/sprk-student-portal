import {
  Box,
  Button,
  Dialog,
  Typography,
  Avatar,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./Modal/ChangePassword";
import LogoutAll from "./Modal/LogoutAll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Image } from "cloudinary-react";
import { Edit, Close } from "@mui/icons-material";
import Dropzone from "../Common/Dropzonn/DropZone";
import {
  getUser,
  getUserPic,
  uploadUserProfilePic,
} from "../Login/store/login.actions";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import {
  setEntitleMents,
  setOrgDetails,
  setUserDetails,
  setUserProfilePic,
} from "../Login/store/authSlice";
import StudentStatus from "../Common/student status/StudentStatus";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import rearrengePermission from "../../Utils/rearrengePermission";

function Profile() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const userDetails = useSelector((state) => state.authSlice.userDetails) || {};
  const userProfilePic = useSelector((state) => state.authSlice.userProfilePic);
  const rtoken = useSelector((state) => state?.authSlice.token);

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleToogleChangePassword = () => {
    setOpenChangePassword(!openChangePassword);
  };

  const [openLogout, setOpenLogout] = useState(false);
  const handleLogoutModal = () => {
    setOpenLogout(!openLogout);
  };

  const [openUpload, setOpenUpload] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const handleUpload = () => setOpenUpload(!openUpload);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (event) => {
    setSelectedFile(event);
  };

  const UploadProfilePic = async () => {
    try {
      setIsUploading(true);
      // console.log(selectedFile);
      const res = await dispatch(
        uploadUserProfilePic({
          headers,
          selectedFile,
        })
      );

      if (res.payload) {
        getProfilePic();
        handleUpload();
        setSelectedFile(null);
      }
      setIsUploading(false);
    } catch (err) {
      // console.log(err);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    getProfilePic();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const userResponse = await dispatch(getUser({ accessToken: rtoken }));
      const userDetails = userResponse?.payload?.data || null;

      dispatch(
        setUserDetails({
          userDetails: userDetails,
        })
      );
      let newEntitlements = rearrengePermission(userDetails?.entitlements);
      dispatch(setEntitleMents(newEntitlements));

      dispatch(
        setOrgDetails({
          orgDetails: {
            orgName: userDetails?.org_name,
            orgLogo: userDetails?.org_logo,
            orgAddress: userDetails?.org_address,
            orgWeb: userDetails?.org_web,
            orgCertificate: userDetails?.org_certificate,
            orgCode: userDetails?.org_code,
          },
        })
      );
    } catch (err) {
      // console.log(err);
    }
  };

  const getProfilePic = () => {
    // if(userDetails.profile === true){
    dispatch(getUserPic({ headers })).then((res) => {
      dispatch(setUserProfilePic({ userProfilePic: res?.payload }));
    });
  };

  const renderBox = ({ Icon, title, value }) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D8D6FF",
            borderRadius: "5px",
            p: 1,
          }}
        >
          <Icon sx={{ color: "#3A33E6", fontSize: "30px" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontWeight={"bold"}>{title}</Typography>
          <Typography
            sx={{
              color: "#2F2F2FDE",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
        p: {
          xs: 3,
          sm: 4,
        },
      }}
    >
      <Helmet>
        <title>{meta.profile.title}</title>
        <meta name="description" content={meta.profile.description} />
        <meta property="og:title" content={meta.profile.title} />
        <meta property="og:description" content={meta.profile.description} />
        <meta property="og:image" content={meta.profile.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.profile.url}`}
        />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: 5,
            p: 3,
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
            backgroundColor: "var(--secondary-color)",
            flexWrap: "wrap",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          {/* <Box>
            <Avatar
              sx={{
                width: "200px",
                height: "auto",
                p: 0,
              }}
            >
              <AccountCircleIcon
                sx={{
                  width: "200px",
                  height: "auto",
                  // aspectRatio: 1,
                  textAlign: "center",
                  padding: "0px",
                }}
              />
            </Avatar>
          </Box> */}
          <Box
            sx={{
              width: "200px",
              height: "200px",
              my: 2,
              borderRadius: "50%",
              position: "relative",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            {userProfilePic ? (
              <img
                src={userProfilePic}
                alt="Image from API"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <AccountCircleIcon
                style={{
                  width: "100%",
                  height: "100%",
                  color: "white",
                }}
              />
            )}
            <Button
              variant="contained"
              color="inherit"
              sx={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                minWidth: "40px",
                height: "40px",
                padding: "5px",
                borderRadius: "50%",
              }}
              onClick={handleUpload}
            >
              <Edit size="small" color="primary" />
            </Button>
            <Dialog
              open={openUpload}
              onClose={() => setOpenUpload(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              // disableBackdropClick={true}
            >
              <Box
                sx={{
                  padding: 3,
                  boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 24px",
                  width: { xs: "80vw", sm: "500px" },
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    setOpenUpload(false);
                    setSelectedFile("");
                  }}
                >
                  <Close />
                </IconButton>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Upload
                  </Typography>
                  {loadingFile ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "150px",
                      }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Dropzone
                      onFileAccepted={handleFileSelect}
                      fileInputRef={fileInputRef}
                      fileTypeForm="img"
                      setLoadingFile={setLoadingFile}
                    />
                  )}
                  <TextField
                    sx={{
                      mt: 2,
                    }}
                    value={selectedFile?.name}
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                  />
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={UploadProfilePic}
                      disabled={isUploading || !selectedFile}
                    >
                      {isUploading ? <CircularProgress size={24} /> : "Upload"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Dialog>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h3" color="white">
                Hello,
              </Typography>
              <Image
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1740204094/hand_waving_yellow_smf1ym.svg"
                cloudName="dxlzzgbfw"
                style={{
                  width: "auto",
                  height: "40px",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography variant="h3" color="white">
              {userDetails?.name || ""}
            </Typography>

            <Typography
              variant="h5"
              color="white"
              sx={{ mt: 4, textAlign: "center" }}
            >
              "Education is the most powerful weapon which you can use to change
              the world."
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap-reverse",
            }}
          >
            {renderBox({
              Icon: PersonIcon,
              title: "Student ID",
              value: `${userDetails?.student_id || ""}`,
            })}
            <StudentStatus status={userDetails?.student_status || "ACTIVE"} />
          </Box>
          {renderBox({
            Icon: CallIcon,
            title: "Contact Number",
            value: `${userDetails?.phone || ""}`,
          })}
          {renderBox({
            Icon: EmailIcon,
            title: "Email",
            value: `${userDetails?.email || ""}`,
          })}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleToogleChangePassword}
            >
              Change Password
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogoutModal}
            >
              Logout All
            </Button>
          </Box>
          <Dialog open={openChangePassword} maxWidth="sm">
            <ChangePassword handleClose={handleToogleChangePassword} />
          </Dialog>

          <Dialog open={openLogout} maxWidth="sm">
            <LogoutAll handleClose={handleLogoutModal} />
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
