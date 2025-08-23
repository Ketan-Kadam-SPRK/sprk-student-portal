import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import styles from "../batchNotes.module.css";
import FilePreview from "./FilePreview";
import CommentDialog from "./CommentDialog";
import { convertToCustomFormat } from "../../../../../../Utils/ConvertToCustomFormat";

export default function NoteList({
  notes = [],
  setEditNoteId,
  editNoteId,
}) {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const noteListRef = useRef(null);

  useEffect(() => {
    if (noteListRef.current) {
      noteListRef.current.scrollTop = noteListRef.current.scrollHeight;
    }
  }, []);

  // Comments
  const handleOpenComments = (noteId) => {
    setEditNoteId(noteId);
    setCommentDialogOpen(true);
  };

  return (
    <Box className={styles.chatArea} ref={noteListRef}>
      {notes &&
        notes?.map((note) => (
          <Box key={note.noteUid} className={`${styles.messageBubble} `}>
            <Paper className={styles.messageContent}>
              <Box className={styles.messageTextDiv}>
                {note?.noteContent && (
                  <Typography
                    className={styles.messageTextStyle}
                    variant="body1"
                      sx={{ whitespace: "pre-line" }}
                  >
                    {note?.noteContent}
                  </Typography>
                )}
              </Box>

              {/* Attachments */}
              <FilePreview attachments={note?.noteImages || []} />

              {/* Actions */}
              <Box className={styles.messageActions}>
                <IconButton
                  size="small"
                  onClick={() => handleOpenComments(note.noteUid)}
                >
                  <CommentIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {note?.createdAt && convertToCustomFormat(note.createdAt)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}

      <CommentDialog
        open={commentDialogOpen}
        onClose={() => setCommentDialogOpen(false)}
        editNoteId={editNoteId}
      />
    </Box>
  );
}
