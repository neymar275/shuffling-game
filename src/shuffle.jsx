import react, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function Shuffle() {
  const [words, setWord] = useState("");
  const [count, setCounter] = useState(0); // Start from 0 to access rafs correctly
  const [inputValue, setInputValue] = useState("");
  const [scores, setScores] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const refa = useRef(null);
  const refb = useRef(null);
  const lists = [
    "Love",
    "Time",
    "Peace",
    "Life",
    "Happy",
    "Dream",
    "Hope",
    "Friend",
    "Believe",
    "Smile",
  ];

  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 1.0, ease: "easeInOut" },
    },
    hidden: {
      opacity: 0,
    },
  };

  const rafs = lists.map((word) => {
    return word.slice(1) + word[0]; // Move the first letter to the end
  });

  useEffect(() => {
    // Initialize with the first word
    setWord(rafs[count]);
  }, [count]); // Update word when count changes

  function checkScore() {
    if (count === 9) {
      setIsTrue(true);
      refb.current.style.visibility = "hidden";
      console.log("Game Ended ");
      console.log("Thanks for Playing");
    }

    if (scores < 5) {
      setRemarks("Eii enti nipa na wabon sei");
    } else if (scores === 10) {
      setRemarks("Herh woy3 brilla wate");
    } else if (scores === 8) {
      setRemarks("sua ade3 k3k3 next time!!!");
    }
  }

  function execute() {
    checkCorrect(); // Check if the answer is correct before updating count
    setCounter(count + 1);
    checkScore();
    refa.current.value = ""; // Clear input after each entry
  }

  function checkCorrect() {
    // Check if the user's input matches the current word in rafs
    if (inputValue === lists[count]) {
      setScores((prevScores) => prevScores + 1); // Update scores using functional update
      console.log("you got the word correct");
    }
  }

  function getter(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="maincont">
      <h1>Neymar Shuffle Game</h1>
      <div className="content">
        <h2 className="fheader" ref={refb}>
          WORD {count + 1}
        </h2>{" "}
        {/* Increment count for display */}
        <div className="display">
          <p className="edit-word" ref={refb}>
            {words}
          </p>
        </div>
        <div className="type " ref={refb}>
          <input
            ref={refa}
            className="type-one"
            type="text"
            placeholder="Type"
            onChange={(e) => getter(e)}
          />
        </div>
        <button
          className="enter"
          onClick={() => {
            execute();
          }}
        >
          Enter
        </button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isTrue ? "visible" : "hidden"}
          className="scoreboard"
          variants={variants}
        >
          <p>You Scored : {scores}/10</p>
          <p>{remarks}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Shuffle;
