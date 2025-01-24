import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Box,
  Typography,
  Stack,
  Radio,
  Checkbox,
  IconButton,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import { CapitalizeFirstLetter } from "../../../Utils/formateForDisplay";
import { Close, CloseRounded } from "@mui/icons-material";
import { modifyQuestionTextFillUps } from "../../../Utils/ModifyQsnTextFillUps";
import style from "./reportPreview.module.css";
import { useDispatch } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PracticalQinstruction from "./PracticalQinstruction";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { formatForDisplay } from "../../../Utils/formateForDisplay";
import { getExamResponse } from "../exams.actions";
import { Image } from "cloudinary-react";

const ReportPreviewModal = forwardRef(({ id }, ref) => {
  const dispatch = useDispatch();
  const view = "res";
  const headers = useAuthHeaders();
  const [previewData, setPreviewData] = useState({});
  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index); // 65 is the ASCII value for 'A'
  };

  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getExamResponse({ headers, id }));

      console.log(res);
      setPreviewData(res.payload.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const [descirptiveData, setDiscriptiveData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const [loading, setLoading] = useState(false);

  const descCount = previewData?.descriptive?.length + 1 || 1;

  useEffect(() => {
    setDiscriptiveData(previewData?.descriptive || []);
    setTaskData(previewData?.task || []);
  }, [previewData]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Exam:{" "}
          {CapitalizeFirstLetter(
            formatForDisplay(previewData?.assessment)?.toLowerCase()
          )}
        </Typography>
        <Box
          className={style.headContain}
          sx={{
            flexDirection: { md: "row", sm: "row", xs: "column" },
          }}
        >
          <Typography>
            Course:{" "}
            {previewData?.courses?.map((course, index) => (
              <React.Fragment key={index}>
                {course}
                {index !== previewData?.courses?.length - 1 && ", "}
              </React.Fragment>
            ))}
          </Typography>

          <Typography>
            {previewData?.assessment !== "PROJECT" && (
              <span>
                Type:{" "}
                {previewData?.type
                  ? CapitalizeFirstLetter(previewData?.type?.toLowerCase())
                  : ""}
              </span>
            )}
          </Typography>
        </Box>
        <Box
          className={style.headContain}
          sx={{
            flexDirection: { md: "row", sm: "row", xs: "column" },
          }}
        >
          <Typography>
            Passing Criteria:{" "}
            {previewData
              ? previewData?.criteria === "PERCENTAGE"
                ? `${previewData?.pass_percent}% (By percentage)`
                : `${previewData?.pass_qsn} (By correct Answers)`
              : ""}
          </Typography>

          <Typography>
            Score: {`${previewData?.obtained || 0} / ${previewData?.total}`}
          </Typography>
        </Box>
      </Box>
      {descirptiveData?.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {descirptiveData?.map((data, questionIndex) => (
            <Box key={data.id} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                    Q{questionIndex + 1}.{"  "}
                  </Typography>
                  <Typography
                    className={style.textWrap}
                    sx={{
                      fontWeight: 500,
                      fontSize: "14px",
                      textAlign: "justify",
                    }}
                  >
                    {data?.type === "FILL_UPS"
                      ? modifyQuestionTextFillUps(data?.question)
                      : data?.question}{" "}
                  </Typography>
                </Box>

                <Typography sx={{ mr: "3px", fontWeight: 500 }}>
                  {`${data?.obtained} /${data?.marks} `}
                </Typography>
              </Box>
              <Typography
                sx={{ color: "#085186", fontSize: "13px", fontWeight: 500 }}
              >
                Answer
              </Typography>
              <TextField
                multiline
                fullWidth
                value={data?.answer}
                InputProps={{ readOnly: true }}
                placeholder={data?.answer ? "" : "No Input Provided"}
              ></TextField>
            </Box>
          ))}
        </Box>
      )}

      {taskData?.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {taskData?.map((data, questionIndex) => (
            <Box key={data.id} sx={{ my: 4, borderBottom: "1px solid grey" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownOutlinedIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mr: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        // className={style.textWrap}
                        sx={{ fontWeight: 500 }}
                      >
                        {`Question ${questionIndex + 1}`}
                        {"  "}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ mr: "3px", fontWeight: 500, minWidth: "40px" }}
                    >
                      {`${data?.obtained} /${data?.marks} `}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography
                        // className={style.textWrap}
                        sx={{ fontWeight: 500, fontSize: "14px" }}
                      >
                        Q{questionIndex + 1}.{"  "}
                      </Typography>
                      <Typography
                        className={style.textWrap}
                        sx={{
                          fontWeight: 500,
                          fontSize: "14px",
                          textAlign: "justify",
                        }}
                      >
                        {data?.type === "FILL_UPS"
                          ? modifyQuestionTextFillUps(data?.question)
                          : data?.question}{" "}
                      </Typography>
                    </Box>

                    <PracticalQinstruction data={data} />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Typography sx={{ fontWeight: 600, mt: 2 }}>Response:</Typography>
              <Box>
                {data?.file_id !== null && (
                  <Box
                    sx={{
                      my: 2,
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1,
                      px: 2,
                      borderRadius: "5px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "50px" }}>
                        <UploadFileOutlinedIcon
                          color="primary"
                          sx={{ fontSize: "30px" }}
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                          FILE
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {data?.file_name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                      // onClick={() =>
                      //   handleDownloadFile(data?.file_id, rtoken)
                      // }
                      >
                        <FileDownloadOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box>
                {data?.link !== null && (
                  <Box
                    sx={{
                      my: 2,
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1,
                      px: 2,
                      width: "100%",
                      borderRadius: "5px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "50px" }}>
                        <Image
                          style={{ width: "30px", height: "30px" }}
                          publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1714458128/image_310_fdqcal.svg"
                          cloudName="dxlzzgbfw"
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                          LINK
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                          }}
                        >
                          {data?.link}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: "50px" }}>
                      <IconButton
                        onClick={() => window.open(data?.link, "_blank")}
                      >
                        <OpenInNewOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>

              {data?.link === null && data?.file_id === null && (
                <Box
                  sx={{
                    p: 2,
                    my: 2,
                    border: "1px solid #8D8D8D",
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ color: "#8D8D8D" }}>
                    Not Attempted
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      <Box>
        {previewData?.response?.length !== 0 &&
          previewData?.response?.map((data, questionIndex) => {
            let optionIndex = 0; // Initialize option index for each question
            // Calculate correct answers before rendering the question and options
            const correctAnswers = data?.options?.reduce(
              (acc, option, index) => {
                if (option?.ans === true) {
                  acc.push(indexToLetter(index)); // Add the letter representation of the index
                }
                return acc;
              },
              []
            );
            return (
              <Box sx={{ my: 3 }} key={data?.id}>
                <Box className={style.questionStyle}>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      // className={style.textWrap}
                      sx={{ fontWeight: 500, fontSize: "14px" }}
                    >
                      Q{descCount + questionIndex}.{"  "}
                    </Typography>
                    <Typography
                      className={style.textWrap}
                      sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        textAlign: "justify",
                      }}
                    >
                      {data?.type === "FILL_UPS"
                        ? modifyQuestionTextFillUps(data?.question)
                        : data?.question}{" "}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      mr: "3px",
                      fontWeight: 500,
                      textAlign: "end",
                      minWidth: "40px",
                    }}
                  >
                    {`${data?.obtained} /${data?.marks} `}
                  </Typography>
                </Box>
                {data?.options?.map((option) => {
                  const optionLetter = indexToLetter(optionIndex++);
                  return (
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        backgroundColor:
                          view === "VIEW_PAPER"
                            ? option?.ans === true
                              ? "#31DC76" // Correct and selected
                              : "#F2F2F2"
                            : option?.selected === true && option?.ans === true
                            ? "#31DC76" // Correct and selected
                            : option?.selected === true && option?.ans === false
                            ? "#FFCDCD" // Selected but incorrect
                            : "#F2F2F2", // Default case
                        mt: 1,
                      }}
                      key={option?.id}
                    >
                      {data?.type === "MCQ" ? (
                        <Checkbox
                          sx={{ height: "25px" }}
                          checked={
                            view === "VIEW_PAPER"
                              ? option?.ans
                              : option?.selected
                          }
                        />
                      ) : (
                        <Radio
                          sx={{ height: "25px" }}
                          checked={
                            view === "VIEW_PAPER"
                              ? option?.ans
                              : option?.selected
                          }
                        />
                      )}

                      <Typography
                        sx={{ maxWidth: "90%" }}
                        className={style.textWrap}
                      >
                        {optionLetter}. {option?.option}
                      </Typography>
                    </Stack>
                  );
                })}

                <PracticalQinstruction data={data} />

                {data?.obtained === 0 && (
                  <Box
                    sx={{
                      mt: 1,
                      border: "1px solid #FFC0C0",
                      backgroundColor: "#FFEBEB",
                      py: 1,
                      px: 2,
                      borderRadius: "10px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Box>
                      <CloseRounded color="error" />
                    </Box>
                    <Box>
                      <Typography color="error" className={style.TypoStyle}>
                        Correct Solution :
                      </Typography>
                      {data?.type !== "FILL_UPS" ? (
                        <Typography className={style.TypoStyle} sx={{ mt: 1 }}>
                          {correctAnswers?.join(", ")}
                        </Typography>
                      ) : (
                        <Typography className={style.TypoStyle} sx={{ mt: 1 }}>
                          {modifyQuestionTextFillUps(data?.fill_value)}
                        </Typography>
                      )}

                      {data?.exp !== null && data?.exp !== "" && (
                        <Box>
                          <Typography color="error" className={style.TypoStyle}>
                            Explanation:
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {data?.exp}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
      </Box>
    </Box>
  );
});

export default ReportPreviewModal;
