import React from "react";
// import { handleDownloadFile } from "../../../../Utils/DownloadUploededDocuments";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useSelector, useDispatch } from "react-redux";
import { handleDownloadFiles } from "../../Leaves/action/leaves.action";

function InstructionSentenseFormate(sentence) {
  // Regular expression to match numbers
  var regex = /\d+/g;

  // Replace numbers with spaces before them
  var formattedSentence = sentence.replace(regex, function (match) {
    return " " + match;
  });

  // Regular expression to match phrases enclosed in double quotes
  var phraseRegex = /"([^"]*)"/g;

  // Bold the phrases by wrapping them in <strong> tags
  var boldedSentence = formattedSentence.replace(
    phraseRegex,
    "<strong>$&</strong>"
  );

  // Replace \n with <br> for line breaks
  var htmlFormattedSentence = boldedSentence.replace(/\n/g, "<br>");

  // Return the formatted and bolded HTML sentence
  return htmlFormattedSentence;
}

function PracticalQinstruction({ data }) {
  const rtoken = useSelector((state) => state?.authSlice?.token);
  const dispatch = useDispatch();
  return (
    <Box sx={{ mx: 2 }}>
      {data?.instruction && (
        <Box>
          <Typography
            sx={{
              mt: 1,
              fontSize: "14px",
              fontWeight: 600,
              color: "#085186",
            }}
          >
            Instructions:
          </Typography>
          <Typography
            sx={{ mt: 1, ml: 1, fontSize: "14px", textAlign: "justify" }}
            dangerouslySetInnerHTML={{
              __html: InstructionSentenseFormate(data?.instruction),
            }}
          />
        </Box>
      )}

      {(data?.links && data?.links?.length > 0) ||
      (data?.files && data?.files !== null) ? (
        <Typography
          sx={{
            mt: 2,
            fontSize: "14px",
            fontWeight: 600,
            color: "#085186",
          }}
        >
          Resources / References:
        </Typography>
      ) : null}
      {data?.links?.map((link, index) => (
        <ol
          key={index}
          style={{
            // padding: "10px",
            paddingInline: "0px",
            marginBlock: "0",
            marginLeft: "20px",
          }}
        >
          <li
            style={{
              listStyle: "disc",
            }}
          >
            <Typography
              key={index}
              sx={{
                mt: 1,
                // ml: 4,
                fontSize: "14px",
                wordBreak: "break-all",
                textAlign: "justify",
              }}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </Typography>
          </li>
        </ol>
      ))}

      {data?.files && (
        <Box sx={{ mt: 2, mb: 2, ml: 1 }}>
          <Box display="flex" alignItems="center">
            <TextField
              size="small"
              fullWidth
              value={data?.files?.name} // Display the file name in the TextField
              InputProps={{
                readOnly: true, // Make the TextField read-only
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      dispatch(
                        handleDownloadFiles({
                          fileid: data?.file_id,
                          rtoken,
                        })
                      )
                    }
                  >
                    <FileDownloadOutlinedIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PracticalQinstruction;
