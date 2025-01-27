import { Close } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

function DenyJobDialog({ handleClose }) {
  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "var(--font-size-medium)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CancelRoundedIcon
            color="error"
            sx={{ fontSize: "30px !important" }}
          />{" "}
          You are about to decline this job opportunity.
        </Typography>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography>
          Please let us know why you're declining this opportunity. Your input
          helps us match you with better opportunities in the future
        </Typography>

        <Typography>Reason for denying job application*</Typography>

        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Type Your Reason Here ..."
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" color="error">
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>{" "}
      </DialogActions>
    </>
  );
}

export default DenyJobDialog;
