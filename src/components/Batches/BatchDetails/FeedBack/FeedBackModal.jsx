import React, { useEffect, useRef, useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../Hooks/useAuthHeaders";
import {
  addSubmitFeedback,
  getFeedbackByBatchId,
} from "./store/Feedback.action";
import ErrorHandling from "../../../Common/ErrorHandling";

/**
 * 🔹 Normalize backend questions → UI-friendly format
 */
const normalizeQuestions = (backendQuestions = []) => {
  return backendQuestions.map((q) => {
    let type = "input";

    switch (q.type) {
      case "TEXT":
        type = "input";
        break;
      case "YES_NO":
        type = "boolean";
        break;
      case "SINGLE_CHOICE":
        type = "options";
        break;
      case "RATING":
        type = "rating";
        break;
      default:
        type = "input";
    }

    return {
      id: q.uid,
      sequence: q.displayOrder,
      question: q.text,
      type,
      required: q.required,
      ratingScale: q.ratingScale || 5,
      options:
        type === "options"
          ? q.options
              ?.sort((a, b) => a.displayOrder - b.displayOrder)
              .map((opt) => opt.optionLabel)
          : [],
    };
  });
};

function FeedBackModal({ feedBackBatchId, handleFeedBack }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const [questionsData, setQuestionsData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);
  const [formInfo, setFormInfo] = useState({
    formUid: null,
    formVersion: null,
  });

  // ✅ Refs for scrolling
  const questionRefs = useRef({});

  /**
   * 🔹 Fetch feedback questions
   */
  useEffect(() => {
    if (!feedBackBatchId) return;

    const fetchFeedback = async () => {
      try {
        setLoading(true);

        const res = await dispatch(
          getFeedbackByBatchId({ headers, batchId: feedBackBatchId })
        );

        const data = res?.payload?.data?.data || {};
        const status = res?.payload?.status;

        if (status === 500 || status === 503) {
          setError500(true);
          return;
        }

        setFormInfo({
          formUid: data?.formUid,
          formVersion: data?.formVersion,
        });

        const normalized = normalizeQuestions(data?.questions || []);
        setQuestionsData(normalized);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError500(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [feedBackBatchId]);

  /**
   * 🔹 Sort questions
   */
  const questions = [...questionsData].sort((a, b) => a.sequence - b.sequence);

  /**
   * 🔹 Validation
   */
  const validateField = (question, value) => {
    if (!question.required) return "";

    if (question.type === "input") {
      if (!value || value.trim() === "") return "This field is required";
      if (value.length > 300) return "Maximum 300 characters allowed";
    }

    if (question.type === "options" && !value) {
      return "Please select an option";
    }

    if (question.type === "boolean") {
      if (value !== true && value !== false) return "Please select Yes or No";
    }

    if (question.type === "rating" && !value) {
      return "Please select a rating";
    }

    return "";
  };

  /**
   * 🔹 Handle Change
   */
  const handleChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [question.id]: validateField(question, value),
    }));
  };

  /**
   * 🔹 Handle Submit + Scroll to First Error
   */
  const handleSubmit = () => {
    const newErrors = {};

    questions.forEach((q) => {
      const error = validateField(q, answers[q.id]);
      if (error) newErrors[q.id] = error;
    });

    setErrors(newErrors);

    // 🚀 Scroll to first error
    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      questionRefs.current[firstErrorKey]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const payload = {
      formUid: formInfo.formUid,
      formVersion: formInfo.formVersion,
      questions: questions.map((q) => ({
        uid: q.id,
        answer: answers[q.id],
      })),
    };

    dispatch(
      addSubmitFeedback({ headers, payload, batchId: feedBackBatchId })
    ).then((res) => {
      console.log(res, "res");
      if (res?.payload?.status === 200 || res?.payload?.status === 201) {
        setFormInfo({
          formUid: null,
          formVersion: null,
        });
        setQuestionsData([]);
        handleFeedBack();
      }
    });

  };

  console.log(loading, "loading");

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }

  return (
    <>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          {questions.map((q, index) => (
            <Box key={q.id} ref={(el) => (questionRefs.current[q.id] = el)}>
              {/* 🔢 Serial Number + Question */}
              <Box display="flex" gap={1}>
                <Typography fontWeight={600}>{index + 1}.</Typography>
                <Typography fontWeight={600}>
                  {q.question}
                  {q.required && (
                    <Typography component="span" color="error">
                      {" "}
                      *
                    </Typography>
                  )}
                </Typography>
              </Box>

              {/* TEXT */}
              {q.type === "input" && (
                <>
                  <TextField
                    fullWidth
                    size="small"
                    sx={{ mt: 1, pl: 2 }}
                    value={answers[q.id] ?? ""}
                    inputProps={{ maxLength: 300 }}
                    error={Boolean(errors[q.id])}
                    onChange={(e) => handleChange(q, e.target.value)}
                  />
                  {errors[q.id] && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {errors[q.id]}
                    </FormHelperText>
                  )}
                </>
              )}

              {/* OPTIONS */}
              {q.type === "options" && (
                <>
                  <RadioGroup
                    sx={{ mt: 1, pl: 2 }}
                    value={answers[q.id] ?? ""}
                    onChange={(e) => handleChange(q, e.target.value)}
                  >
                    {q.options.map((opt, i) => (
                      <FormControlLabel
                        key={i}
                        value={opt}
                        control={<Radio />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                  {errors[q.id] && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {errors[q.id]}
                    </FormHelperText>
                  )}
                </>
              )}

              {/* YES / NO */}
              {q.type === "boolean" && (
                <>
                  <RadioGroup
                    row
                    sx={{ mt: 1, pl: 2 }}
                    value={
                      answers[q.id] !== undefined ? String(answers[q.id]) : ""
                    }
                    onChange={(e) => handleChange(q, e.target.value === "true")}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {errors[q.id] && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {errors[q.id]}
                    </FormHelperText>
                  )}
                </>
              )}

              {/* 🔢 RATING */}
              {q.type === "rating" && (
                <>
                  <RadioGroup
                    row
                    sx={{ mt: 1, pl: 2 }}
                    value={answers[q.id] ?? ""}
                    onChange={(e) => handleChange(q, Number(e.target.value))}
                  >
                    {Array.from({ length: q.ratingScale }).map((_, i) => (
                      <FormControlLabel
                        key={i}
                        value={i + 1}
                        control={<Radio />}
                        label={i + 1}
                      />
                    ))}
                  </RadioGroup>
                  {errors[q.id] && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {errors[q.id]}
                    </FormHelperText>
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: "flex", gap: 2, px: 2, py: 1 }}>
          <Button variant="outlined" onClick={handleFeedBack}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </DialogActions>
    </>
  );
}

export default FeedBackModal;
