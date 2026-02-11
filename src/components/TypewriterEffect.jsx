import { useState, useEffect } from 'react';

export default function TypewriterEffect({ words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (index === words.length) {
      setIndex(0); // Loop back
      return;
    }

    const currentWord = words[index];

    if (isDeleting) {
      if (subIndex > 0) {
        setTimeout(() => {
          setSubIndex((prev) => prev - 1);
          setText(currentWord.substring(0, subIndex - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (subIndex < currentWord.length) {
        setTimeout(() => {
          setSubIndex((prev) => prev + 1);
          setText(currentWord.substring(0, subIndex + 1));
        }, typeSpeed);
      } else {
        setTimeout(() => setIsDeleting(true), pauseTime);
      }
    }
  }, [subIndex, index, isDeleting, words, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="inline-block min-w-[20ch] text-left">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}
