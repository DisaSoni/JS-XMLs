import { useState, useEffect } from 'react';

export default function Question() {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const fetchQues = async () => {
      const url = 'https://opentdb.com/api.php?amount=1&type=boolean';
      const response = await fetch(url);
      const data = await response.json();
      const exm = data.results[0];
      setCategory(exm.category);
      setQuestion(exm.question);
      setAnswer(exm.correct_answer);
    };
    fetchQues();
  }, []);

  const ButtonClick = () => {
    setRevealed(true);
  };

  return (
    <div>
      <div>Category: {category}</div>
      <h3> Question: {question}</h3>
      <div>Answer: {revealed ? answer : ''}</div>
      <button type="button" onClick={ButtonClick}>
        Reveal-answer
      </button>
    </div>
  );
};


