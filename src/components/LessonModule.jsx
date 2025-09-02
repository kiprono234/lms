import React, { useState, useEffect } from 'react';
import styles from './LessonModule.module.scss';

const lessons = [
  {
    key: 'overview',
    title: "Course Overview",
    description: "Welcome to Introduction to Programming! This course guides you through the core concepts of Python programming, starting with variables and ending with modules.",
    code: "# Welcome to Python Programming\nprint('Hello, Python!')",
    quiz: {
      question: "What does print('Hello, Python!') output?",
      code: "print('Hello, Python!')",
      options: ["Hello", "Python!", "Hello, Python!", "Error"],
      answer: 2
    }
  },
  {
    key: 'basic',
    title: "Lesson 1: Variables and Data Types",
    description: "In this lesson, we will introduce variables and data types in Python. We will cover how to use different data types such as numbers, strings, and lists.",
    code: "# Variables and Data Types\nx = 10        # Integer\ny = 3.14      # Float\nname = \"Lara Manga \"  # String\nfruits = [\"apple\", \"banana\", \"cherry\"] # List",
    quiz: {
      question: "What is the output of the following code?",
      code: "print(5 * 3 * 2)",
      options: ["11", "13", "16", "30"],
      answer: 3
    }
  },
  {
    key: 'data',
    title: "Lesson 2: Data Structures",
    description: "Learn about Python data structures such as lists, tuples, sets, and dictionaries, and how to use them.",
    code: "# Python Data Structures\nmy_list = [1, 2, 3]\nmy_tuple = (4, 5, 6)\nmy_set = {7, 8, 9}\nmy_dict = {'a': 10, 'b': 11}",
    quiz: {
      question: "Which data structure is immutable?",
      code: "",
      options: ["List", "Set", "Tuple", "Dictionary"],
      answer: 2
    }
  },
  {
    key: 'control',
    title: "Lesson 3: Control Flow",
    description: "Understand how to control the flow of your Python programs with if, else, for, and while statements.",
    code: "# Control Flow\nfor i in range(3):\n    if i % 2 == 0:\n        print(i)",
    quiz: {
      question: "What numbers are printed by the code above?",
      code: "",
      options: ["0, 1, 2", "0, 2", "1, 2", "None"],
      answer: 1
    }
  },
  {
    key: 'functions',
    title: "Lesson 4: Functions",
    description: "Discover how to write reusable code using functions in Python.",
    code: "# Functions in Python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Alice\"))",
    quiz: {
      question: "What is printed when greet('Alice') is called?",
      code: "",
      options: ["Hello!", "Hello, Alice!", "Alice", "Error"],
      answer: 1
    }
  },
  {
    key: 'modules',
    title: "Lesson 5: Modules",
    description: "Learn how to organize your code using modules and import statements.",
    code: "# Using Modules\nimport math\nprint(math.sqrt(16))",
    quiz: {
      question: "What is the output of print(math.sqrt(16))?",
      code: "",
      options: ["4", "16", "8", "Error"],
      answer: 0
    }
  }
];

const sidebarItems = [
  { key: 'overview', label: 'Overview' },
  { key: 'basic', label: 'Basic Python' },
  { key: 'data', label: 'Data Structures' },
  { key: 'control', label: 'Control Flow' },
  { key: 'functions', label: 'Functions' },
  { key: 'modules', label: 'Modules' }
];

export default function LessonModule() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [code, setCode] = useState(lessons[activeIndex]?.code ?? "");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userQuizInput, setUserQuizInput] = useState('');
  const [userQuizAnswer, setUserQuizAnswer] = useState('');

  useEffect(() => {
    setCode(lessons[activeIndex]?.code ?? "");
  }, [activeIndex]);

  const handleReset = () => setCode(lessons[activeIndex]?.code ?? "");
  const selectLesson = (idx) => {
    if (idx >= 0 && idx < lessons.length) {
      setActiveIndex(idx);
      setSelectedQuiz(null);
    }
  };
  const handleNext = () => {
    if (activeIndex < lessons.length - 1) selectLesson(activeIndex + 1);
  };
  const handleRun = () => {
    alert("Running code...\n\n" + code);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch {
      alert("Copy failed.");
    }
  };
  const handleQuizSelect = idx => setSelectedQuiz(idx);

  function getPythonOutput(code) {
    const match = code.match(/print\(([\d\s+\-*/().%]+)\)/);
    if (match) {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(match[1]);
        return result;
      } catch {
        return "Error evaluating expression.";
      }
    }
    return "Please enter a simple print math expression (e.g. print(2 + 3 * 4))";
  }

  const handleUserQuizSubmit = (e) => {
    e.preventDefault();
    const answer = getPythonOutput(userQuizInput);
    setUserQuizAnswer(answer);
  };

  if (!lessons[activeIndex]) {
    return <div>Lesson not found.</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.sidebar}>
        <ul>
          {sidebarItems.map((item, idx) => (
            <li
              key={item.key}
              className={activeIndex === idx ? styles.active : ""}
              onClick={() => selectLesson(idx)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
      <section className={styles.lessonSection}>
        <h1 className={styles.lessonTitle}>{lessons[activeIndex]?.title}</h1>
        <p className={styles.lessonDescription}>
          {lessons[activeIndex]?.description}
        </p>
        <div className={styles.editorCard}>
          <label htmlFor="codeEditor" className={styles.editorLabel}>
            Lesson Code (Editable)
          </label>
          <textarea
            id="codeEditor"
            className={styles.codeEditor}
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={8}
          />
          <div className={styles.buttonRow}>
            <button onClick={handleRun} className={styles.runBtn}>Run Code</button>
            <button onClick={handleCopy} className={styles.copyBtn}>Copy Code</button>
            <button onClick={handleReset} className={styles.resetBtn}>Reset Code</button>
            <button
              onClick={handleNext}
              className={styles.nextBtn}
              disabled={activeIndex === lessons.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <aside className={styles.quizSection}>
        <div className={styles.quizCard}>
          <h2>Quizzes</h2>
          <p>{lessons[activeIndex]?.quiz?.question}</p>
          {lessons[activeIndex]?.quiz?.code && (
            <div className={styles.codeBlock}>
              <pre>{lessons[activeIndex].quiz.code}</pre>
            </div>
          )}
          <form className={styles.quizOptions}>
            {lessons[activeIndex]?.quiz?.options?.map((opt, idx) => (
              <label key={idx} className={
                selectedQuiz === idx
                  ? (idx === lessons[activeIndex].quiz.answer ? styles.correct : styles.wrong)
                  : ""
              }>
                <input
                  type="radio"
                  name="quiz"
                  checked={selectedQuiz === idx}
                  onChange={() => handleQuizSelect(idx)}
                />
                {String.fromCharCode(65 + idx)}. {opt}
              </label>
            ))}
          </form>
          <hr style={{ margin: "1rem 0" }} />
          <h3>Try your own Python question:</h3>
          <form onSubmit={handleUserQuizSubmit} className={styles.quizInputForm}>
            <input
              type="text"
              value={userQuizInput}
              onChange={e => setUserQuizInput(e.target.value)}
              placeholder=""
              className={styles.quizInput}
            />
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
          {userQuizAnswer !== "" && (
            <div className={styles.quizResult}>
              <strong>Answer:</strong> {userQuizAnswer}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
