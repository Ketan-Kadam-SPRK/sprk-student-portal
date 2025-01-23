export const modifyQuestionTextFillUps = (text) => {
  return text?.split(/<>>>(.*?)<<<>/g)?.map((part, index) => {
    if (index % 2 === 1) {
      // This is the text within <>>>(.*?)<<<> tags
      return (
        <span
          key={index}
          style={{
            backgroundColor: "#239A60",
            color: "white",
            marginLeft: "5px",
            marginRight: "5px",
            padding: "4px",
            borderRadius: "2px",
          }}
        >
          {part} {/* Remove the first and last 4 characters */}
        </span>
      );
    } else {
      // This is regular text
      return part;
    }
  });
};
