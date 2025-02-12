import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import styles from "./typing.module.css";

const TypingAnimation = () => {
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const sentences = [
    `Welcome, ${userDetails?.name}!`,
    "Ready to achieve your next milestone?",
  ];

  const typingSpeed = 100;
  const delayBetweenSentences = 1500;

  const [currentText, setCurrentText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingTimeout;

    if (isTyping) {
      const currentSentence = sentences[sentenceIndex];
      if (currentText.length < currentSentence.length) {
        typingTimeout = setTimeout(() => {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
          setCurrentText("");
        }, delayBetweenSentences);
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isTyping, sentences, sentenceIndex]);

  return (
    <div>
      <Typography variant="h4" fontWeight={600}>
        {currentText}

        {/* Show emoji when on the first sentence */}
        {sentenceIndex === 0 && currentText.length === sentences[0].length && (
          <Image
            style={{
              width: "30px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "10px",
            }}
            publicId={
              "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/emoji__sparkles__gpuatf.svg"
            }
            cloudName="dxlzzgbfw"
          />
        )}

        <span className={styles.cursor}>|</span>
      </Typography>
    </div>
  );
};

export default TypingAnimation;
