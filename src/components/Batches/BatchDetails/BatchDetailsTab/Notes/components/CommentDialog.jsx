import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import styles from "../batchNotes.module.css";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addCommentToNote, getCommentsByNoteId } from "../action/notes.action";
import { useAuthHeaders } from "../../../../../../Hooks/useAuthHeaders";
import { convertToCustomFormat } from "../../../../../../Utils/ConvertToCustomFormat";
import { useBatch } from "../../../BatchContext";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function CommentDialog({ open, onClose, editNoteId }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentColors, setCommentColors] = useState({});

  const { sessionData } = useBatch();

  console.log(sessionData,"sessionData");

  useEffect(() => {
    if (editNoteId) {
      getComments();
    }
  }, [editNoteId]);

  const getComments = () => {
    setLoading(true);
    dispatch(getCommentsByNoteId({ headers, noteId: editNoteId }))
      .then((res) => {
        if (res?.payload !== undefined) {
          const data = res?.payload?.data?.data || [];
          setComments(data);

          setCommentColors((prev) => {
            const newColors = { ...prev };
            data?.forEach((c) => {
              if (!newColors[c?.commentBy]) {
                newColors[c?.commentBy] = generateRandomColor();
              }
            });
            return newColors;
          });
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  const MAX_LENGTH = 499;

  const handleAddComment = () => {
    const trimmedCommentText = commentText?.trim();
    if (trimmedCommentText === "" || trimmedCommentText?.length > MAX_LENGTH)
      return;

    setAdding(true);
    dispatch(
      addCommentToNote({ headers, editNoteId, commentText: trimmedCommentText })
    )
      .then((res) => {
        if (res?.payload !== undefined) {
          setCommentText("");
          getComments();
        }
        setAdding(false);
      })
      .catch(() => {
        console.log("error");
        setAdding(false);
      });
    setCommentText("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
    >
      <DialogTitle
        sx={{
          position: "relative",
        }}
      >
        Comments{" "}
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Box className={styles.commentList}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {comments?.length ? (
                comments?.map((c, index) => (
                  <Box key={index} className={styles.commentItem}>
                    <Avatar
                      className={styles.avatar}
                      sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: commentColors[c?.commentBy] || "#999",
                      }}
                    >
                      {c?.commentBy.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ ml: 1 }}>
                      <Typography
                        variant="body2"
                        className={styles.messageTextStyle}
                      >
                        <strong>{c?.commentBy}:</strong> {c?.comment}
                      </Typography>

                      {/* Commented on date/time */}
                      {c.commentOn && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.25 }}
                        >
                          Commented on {convertToCustomFormat(c?.commentOn)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    No comments yet.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Box className={styles.commentInput}>
          <TextField
            multiline
            maxRows={3}
            size="small"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            fullWidth
            error={commentText.length > MAX_LENGTH}
            helperText={
              commentText.length > MAX_LENGTH
                ? `Character limit exceeded! ${commentText.length}/${MAX_LENGTH}`
                : `${commentText.length}/${MAX_LENGTH}`
            }
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                mr: 1,
                fontSize: "0.75rem",
                color:
                  commentText.length > MAX_LENGTH ? "red" : "text.secondary",
              },
            }}
          />
          <Button
            variant="contained"
            disabled={adding || sessionData?.is_removed}
            onClick={handleAddComment}
          >
            {adding ? <CircularProgress size={20} /> : "Add"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
