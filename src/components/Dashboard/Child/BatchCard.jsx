import { Typography, Box } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import {
  convertToLocalTime,
  getRemainingTime,
} from "../../../Utils/dateTimeFormator";
import { Image } from "cloudinary-react";

function BatchCard({ item }) {
  return (
    // <Box
    //   sx={{
    //     width: "300px",
    //     minWidth: "300px",
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "10px",
    //     border: `2px solid ${item?.course_color}`,
    //     borderRadius: "10px",
    //     backgroundColor: `${item?.course_color}60`, // If the course color is in hex (e.g., #FF5733), adding opacity can be tricky.
    //     p: 2,
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       gap: 3,
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         gap: 1,
    //         width: "150px",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           p: 1,
    //           backgroundColor: "#FFDF60",
    //           borderRadius: "10px",
    //         }}
    //       >
    //         <Typography
    //           sx={{
    //             fontSize: "var(--font-size-extra-small)",
    //             fontWeight: "bold",
    //           }}
    //         >
    //           {" "}
    //           {`${convertToLocalTime(item?.start)} - ${convertToLocalTime(
    //             item?.end
    //           )}`}
    //         </Typography>
    //       </Box>

    //       <Box>
    //         <Typography
    //           sx={{
    //             fontSize: "var(--font-size-medium)",
    //             fontWeight: "bold",
    //           }}
    //         >
    //           {item?.course_name}
    //         </Typography>
    //         <Typography
    //           sx={{
    //             fontSize: "var(--font-size-medium)",
    //             fontWeight: "bold",
    //           }}
    //         >
    //           {item?.bth_id}
    //         </Typography>
    //       </Box>
    //     </Box>
    //     <Box>
    //       <Image
    //         style={{ width: "80px", height: "80px", objectFit: "cover" }}
    //         publicId={item?.course_img}
    //         cloudName={item?.course_img?.split("/")[2]}
    //       />
    //     </Box>
    //   </Box>

    //   <Typography
    //     sx={{
    //       fontSize: "var(--font-size-small)",
    //       color: "#085186",
    //       fontWeight: "bold",
    //     }}
    //   >
    //     Full Stack Java Development
    //   </Typography>

    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       marginTop: "80px",
    //     }}
    //   >
    //     <Box>
    //       <Typography sx={{ fontWeight: "bold" }}>Faculty</Typography>
    //       <Typography>{item?.faculty_name}</Typography>
    //     </Box>

    //     <Typography
    //       sx={{
    //         fontSize: "var(--font-size-extra-small)",
    //         color: "grey",
    //         fontWeight: "600",
    //       }}
    //     >
    //       {getRemainingTime(item?.start)}
    //     </Typography>
    //   </Box>
    // </Box>

    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        p: "20px",
        backgroundColor: `${item?.course_color}60`, // If the course color is in hex (e.g., #FF5733), adding opacity can be tricky.
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        // width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          publicId={item?.course_img}
          cloudName={item?.course_img?.split("/")[2]}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >{`${item?.course_name} | ${item?.bth_id}`}</Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
            }}
          >{`Full Stack Java Development`}</Typography>
          <Typography
            sx={{
              color: "grey",
              fontSize: "var(--font-size-extra-small)",
            }}
          >
            {item?.faculty_name}
          </Typography>
          {/* <StatusStyledComponent
            value={"Ongoing"}
            color={"white"}
            backgroundColor={"black"}
          /> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            p: 1,
            backgroundColor: "#FFDF60",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              fontWeight: "bold",
            }}
          >
            {" "}
            {`${convertToLocalTime(item?.start)} - ${convertToLocalTime(
              item?.end
            )}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              color: "grey",
              fontWeight: "600",
            }}
          >
            {getRemainingTime(item?.start)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BatchCard;
