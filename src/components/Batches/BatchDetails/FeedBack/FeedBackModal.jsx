import React, { useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const feedbackQuestions = [
  {
    id: 1,
    sequence: 1,
    question: "How was the session?",
    type: "options",
    options: ["Excellent", "Good", "Average"],
  },
  {
    id: 2,
    sequence: 2,
    question: "What did you like the most?",
    type: "input",
  },
  {
    id: 3,
    sequence: 3,
    question: "Rate the trainer",
    type: "options",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: 4,
    sequence: 4,
    question: "Any suggestions?",
    type: "input",
  },
  {
    id: 5,
    sequence: 5,
    question: "you like the session?",
    type: "options",
    options: ["Yes", "No"],
  }
];


function FeedBackModal() {
  const questions = feedbackQuestions.sort(
    (a, b) => a.sequence - b.sequence
  );

  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

const handleSubmit = () => {
  const payload = feedbackQuestions.map((q) => ({
    questionId: q.id,
    answer: answers[q.id] || "",
  }));

  console.log("Submitted Payload:", payload);
};


  return (
    <>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          {questions.map((q) => (
            <Box key={q.id}>
              <Typography fontWeight={600} mb={1}>
                {q.sequence}. {q.question}
              </Typography>

              {/* INPUT TYPE */}
              {q.type === "input" && (
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your answer"
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    handleChange(q.id, e.target.value)
                  }
                />
              )}

              {/* OPTIONS TYPE */}
              {q.type === "options" && (
                <RadioGroup
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    handleChange(q.id, e.target.value)
                  }
                >
                  {q.options.map((opt, index) => (
                    <FormControlLabel
                      key={index}
                      value={opt}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: "flex", gap: 2, px: 2, py: 1 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </DialogActions>
    </>
  );
}

export default FeedBackModal;
