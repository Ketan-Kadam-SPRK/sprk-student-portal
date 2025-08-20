import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import styles from "./batchNotes.module.css";
import NoteList from "./components/NoteList";
// import NoteInput from "./components/NoteInput";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import { getBAtchNoteByBatchId } from "./action/notes.action";


export default function BatchNotes({ batchId }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const [notes, setNotes] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotesById();
  }, []);

  const getNotesById = () => {
    setLoading(true);
    dispatch(getBAtchNoteByBatchId({ headers, batchId }))
      .then((res) => {
        console.log(res);
        if (res?.payload !== undefined) {
          setNotes(res?.payload?.data?.data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  return (
    <Box className={styles.container}>
      {/* Note list */}
      {loading ? (
        <Box
          className={styles.chatArea}
          sx={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : notes?.length > 0 ? (
        <NoteList
          notes={notes || []}
          setEditNoteId={setEditNoteId}
          setEditMode={setEditMode}
          editNoteId={editNoteId}
        />
      ) : (
        <Box
          className={styles.chatArea}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mt: 2, textAlign: "center", color: "lightgray" }}
          >
            No notes found for this batch.
          </Typography>
        </Box>
      )}

      {/* Input box */}
      {/* <NoteInput getNotesById={getNotesById} editMode={editMode} /> */}
    </Box>
  );
}
