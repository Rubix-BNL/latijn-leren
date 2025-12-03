'use client';

import { useState, useCallback } from 'react';
import {
  declensions,
  casusInfo,
  practiceWords,
  type Casus,
  type Numerus,
  type Declension,
  type PracticeWord,
} from '@/data/declensions';

type QuestionType = 'vorm' | 'naamval' | 'uitgang';

interface Question {
  type: QuestionType;
  woord: string;
  betekenis: string;
  declinatie: Declension;
  casus: Casus;
  numerus: Numerus;
  correctAnswer: string;
  options: string[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestion(): Question {
  const types: QuestionType[] = ['vorm', 'naamval', 'uitgang'];
  const type = types[Math.floor(Math.random() * types.length)];

  const declinatie = declensions[Math.floor(Math.random() * declensions.length)];
  const casussen = Object.keys(casusInfo) as Casus[];
  const casus = casussen[Math.floor(Math.random() * casussen.length)];
  const numerus: Numerus = Math.random() > 0.5 ? 'singularis' : 'pluralis';

  // Kies een willekeurig woord van de juiste declinatie of gebruik het voorbeeldwoord
  const matchingWords = practiceWords.filter((w) => w.declinatieId === declinatie.id);
  const useExampleWord = matchingWords.length === 0 || Math.random() > 0.7;

  let woord: string;
  let stam: string;
  let betekenis: string;

  if (useExampleWord) {
    woord = declinatie.voorbeeldwoord;
    stam = declinatie.stam;
    betekenis = declinatie.betekenis;
  } else {
    const practiceWord = matchingWords[Math.floor(Math.random() * matchingWords.length)];
    woord = practiceWord.woord;
    stam = practiceWord.stam;
    betekenis = practiceWord.betekenis;
  }

  const correctForm = declinatie.vormen[numerus][casus];
  const correctUitgang = declinatie.uitgangen[numerus][casus];

  let correctAnswer: string;
  let options: string[];

  switch (type) {
    case 'vorm':
      // Genereer de vorm met de stam van het gekozen woord
      if (useExampleWord) {
        correctAnswer = correctForm;
      } else {
        // Bereken de vorm door stam + uitgang
        correctAnswer = stam + correctUitgang.replace(/^-/, '');
      }

      // Genereer foute opties
      const wrongOptions = new Set<string>();
      casussen.forEach((c) => {
        if (c !== casus) {
          const wrongForm = useExampleWord
            ? declinatie.vormen[numerus][c]
            : stam + declinatie.uitgangen[numerus][c].replace(/^-/, '');
          wrongOptions.add(wrongForm);
        }
      });
      // Voeg ook vormen van het andere numerus toe
      const otherNumerus: Numerus = numerus === 'singularis' ? 'pluralis' : 'singularis';
      casussen.forEach((c) => {
        const wrongForm = useExampleWord
          ? declinatie.vormen[otherNumerus][c]
          : stam + declinatie.uitgangen[otherNumerus][c].replace(/^-/, '');
        wrongOptions.add(wrongForm);
      });

      options = shuffleArray([
        correctAnswer,
        ...shuffleArray([...wrongOptions].filter((o) => o !== correctAnswer)).slice(0, 3),
      ]);
      break;

    case 'naamval':
      correctAnswer = casusInfo[casus].naam;
      options = shuffleArray(casussen.map((c) => casusInfo[c].naam)).slice(0, 4);
      if (!options.includes(correctAnswer)) {
        options[3] = correctAnswer;
        options = shuffleArray(options);
      }
      break;

    case 'uitgang':
      correctAnswer = correctUitgang;
      const wrongUitgangen = new Set<string>();
      casussen.forEach((c) => {
        wrongUitgangen.add(declinatie.uitgangen[numerus][c]);
        wrongUitgangen.add(declinatie.uitgangen[otherNumerus || 'pluralis'][c]);
      });
      options = shuffleArray([
        correctAnswer,
        ...shuffleArray([...wrongUitgangen].filter((u) => u !== correctAnswer)).slice(0, 3),
      ]);
      break;
  }

  return {
    type,
    woord,
    betekenis,
    declinatie,
    casus,
    numerus,
    correctAnswer,
    options,
  };
}

export default function QuizPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [selectedDeclinaties, setSelectedDeclinaties] = useState<string[]>(
    declensions.map((d) => d.id)
  );
  const [showSettings, setShowSettings] = useState(false);

  const generateNewQuestion = useCallback(() => {
    let newQuestion = generateQuestion();
    // Zorg ervoor dat de vraag van een geselecteerde declinatie is
    let attempts = 0;
    while (!selectedDeclinaties.includes(newQuestion.declinatie.id) && attempts < 20) {
      newQuestion = generateQuestion();
      attempts++;
    }
    setQuestion(newQuestion);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [selectedDeclinaties]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null || !question) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const toggleDeclinatie = (id: string) => {
    setSelectedDeclinaties((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Minstens één selecteren
        return prev.filter((d) => d !== id);
      }
      return [...prev, id];
    });
  };

  const getQuestionText = () => {
    if (!question) return '';

    const numerusText = question.numerus === 'singularis' ? 'enkelvoud' : 'meervoud';

    switch (question.type) {
      case 'vorm':
        return (
          <>
            Wat is de <strong>{casusInfo[question.casus].naam.toLowerCase()}</strong> {numerusText} van{' '}
            <strong>{question.woord}</strong> ({question.betekenis})?
          </>
        );
      case 'naamval':
        return (
          <>
            Welke naamval is <strong>{question.declinatie.vormen[question.numerus][question.casus]}</strong>
            ?<br />
            <span className="text-sm opacity-70">
              ({question.declinatie.voorbeeldwoord}, {question.declinatie.naam}, {numerusText})
            </span>
          </>
        );
      case 'uitgang':
        return (
          <>
            Wat is de uitgang van de <strong>{casusInfo[question.casus].naam.toLowerCase()}</strong>{' '}
            {numerusText}?
            <br />
            <span className="text-sm opacity-70">({question.declinatie.naam})</span>
          </>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Quiz</h1>
        <p className="text-lg opacity-80">Test je kennis van de Latijnse naamvallen!</p>
      </section>

      {/* Score */}
      <div className="flex justify-between items-center bg-white/50 dark:bg-white/5 rounded-xl p-4">
        <div>
          <span className="text-2xl font-bold text-primary">{score.correct}</span>
          <span className="text-lg opacity-70">/{score.total}</span>
          <span className="ml-2 text-sm opacity-60">goed</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Instellingen
          </button>
          <button
            onClick={() => setScore({ correct: 0, total: 0 })}
            className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Instellingen */}
      {showSettings && (
        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4">
          <h3 className="font-bold mb-3">Selecteer declinaties:</h3>
          <div className="flex flex-wrap gap-2">
            {declensions.map((decl) => (
              <button
                key={decl.id}
                onClick={() => toggleDeclinatie(decl.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedDeclinaties.includes(decl.id)
                    ? 'bg-primary text-white'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                {decl.naam}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz kaart */}
      {!question ? (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-8 text-center">
          <p className="text-lg mb-6 opacity-80">Klaar om te beginnen?</p>
          <button
            onClick={generateNewQuestion}
            className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 space-y-6">
          {/* Vraag type badge */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
              {question.type === 'vorm'
                ? 'Vorm invullen'
                : question.type === 'naamval'
                ? 'Naamval herkennen'
                : 'Uitgang kennen'}
            </span>
            <span className="text-xs opacity-60">{question.declinatie.naam}</span>
          </div>

          {/* Vraag */}
          <p className="text-xl text-center py-4">{getQuestionText()}</p>

          {/* Antwoord opties */}
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, index) => {
              let buttonClass =
                'p-4 rounded-xl text-center font-semibold transition-all border-2 ';

              if (selectedAnswer === null) {
                buttonClass += 'border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer';
              } else if (option === question.correctAnswer) {
                buttonClass += 'border-success bg-success/20 text-success';
              } else if (option === selectedAnswer) {
                buttonClass += 'border-error bg-error/20 text-error';
              } else {
                buttonClass += 'border-primary/10 opacity-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {selectedAnswer !== null && (
            <div
              className={`text-center p-4 rounded-xl ${
                isCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
              }`}
            >
              <p className="font-bold text-lg mb-2">
                {isCorrect ? 'Goed zo!' : 'Helaas, fout!'}
              </p>
              {!isCorrect && (
                <p className="text-sm opacity-80">
                  Het juiste antwoord was: <strong>{question.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}

          {/* Volgende vraag knop */}
          {selectedAnswer !== null && (
            <button
              onClick={generateNewQuestion}
              className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Volgende vraag
            </button>
          )}
        </div>
      )}

      {/* Hulp sectie */}
      <div className="text-center text-sm opacity-60">
        <p>Tip: Bekijk het overzicht als je de uitgangen nog moet leren!</p>
      </div>
    </div>
  );
}
