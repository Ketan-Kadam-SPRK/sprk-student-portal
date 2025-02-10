import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const TypingAnimation = () => {
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const sentences = [
    `Welcome, ${userDetails?.name} !`,
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
      // Show characters one by one
      const currentSentence = sentences[sentenceIndex];
      if (currentText.length < currentSentence.length) {
        typingTimeout = setTimeout(() => {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Wait before erasing or switching to the next sentence
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
      <Typography variant="h5" fontWeight={600}>
        {currentText}
      </Typography>
    </div>
  );
};

export default TypingAnimation;
