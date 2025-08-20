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

export default function CommentDialog({ open, onClose, editNoteId }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editNoteId) {
      getComments();
    }
  }, [editNoteId]);

  const getComments = () => {
    setLoading(true);
    dispatch(getCommentsByNoteId({ headers, noteId: editNoteId }))
      .then((res) => {
        console.log(res);
        if (res?.payload !== undefined) {
          setComments(res?.payload?.data?.data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  const handleAddComment = () => {
    if (commentText === "") return;
    setAdding(true);
    dispatch(addCommentToNote({ headers, editNoteId, commentText }))
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
                comments.map((c, index) => (
                  <Box key={index} className={styles.commentItem}>
                    <Avatar
                      className={styles.avatar}
                      sx={{ width: 28, height: 28 }}
                    >
                      {c.commentBy}
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, wordBreak: "break-word" }}
                    >
                      <strong>{c.commentBy}:</strong> {c.comment}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments yet.
                </Typography>
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
          />
          <Button
            variant="contained"
            disabled={adding}
            onClick={handleAddComment}
          >
            {adding ? <CircularProgress size={20} /> : "Add"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
