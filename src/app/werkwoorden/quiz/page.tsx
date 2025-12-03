'use client';

import { useState, useCallback } from 'react';
import {
  conjugations,
  tempusInfo,
  personaInfo,
  personae,
  tempora,
  type Tempus,
  type Persona,
  type Conjugation,
} from '@/data/conjugations';

type QuestionType = 'vorm' | 'tijd' | 'persoon';

interface Question {
  type: QuestionType;
  werkwoord: string;
  betekenis: string;
  conjugatie: Conjugation;
  tempus: Tempus;
  persona: Persona;
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

function generateQuestion(
  selectedConjugaties: string[],
  selectedTempora: Tempus[]
): Question {
  const types: QuestionType[] = ['vorm', 'tijd', 'persoon'];
  const type = types[Math.floor(Math.random() * types.length)];

  // Filter conjugaties op selectie
  const availableConjugaties = conjugations.filter((c) =>
    selectedConjugaties.includes(c.id)
  );
  const conjugatie =
    availableConjugaties[Math.floor(Math.random() * availableConjugaties.length)];

  const tempus = selectedTempora[Math.floor(Math.random() * selectedTempora.length)];
  const persona = personae[Math.floor(Math.random() * personae.length)];

  // Gebruik altijd het voorbeeldwoord (vormen zijn hierop gebaseerd)
  const werkwoord = conjugatie.voorbeeldwoord;
  const betekenis = conjugatie.betekenis;

  const correctForm = conjugatie.vormen[tempus][persona];

  let correctAnswer: string;
  let options: string[];

  switch (type) {
    case 'vorm':
      correctAnswer = correctForm;

      // Genereer foute opties
      const wrongOptions = new Set<string>();
      personae.forEach((p) => {
        if (p !== persona) {
          wrongOptions.add(conjugatie.vormen[tempus][p]);
        }
      });
      // Voeg ook vormen van andere tijden toe
      selectedTempora.forEach((t) => {
        if (t !== tempus) {
          wrongOptions.add(conjugatie.vormen[t][persona]);
        }
      });

      options = shuffleArray([
        correctAnswer,
        ...shuffleArray([...wrongOptions].filter((o) => o !== correctAnswer)).slice(
          0,
          3
        ),
      ]);
      break;

    case 'tijd':
      correctAnswer = tempusInfo[tempus].naam;
      options = shuffleArray(selectedTempora.map((t) => tempusInfo[t].naam));
      if (options.length > 4) {
        options = options.slice(0, 4);
      }
      if (!options.includes(correctAnswer)) {
        options[options.length - 1] = correctAnswer;
        options = shuffleArray(options);
      }
      break;

    case 'persoon':
      correctAnswer = personaInfo[persona].nederlands;
      options = shuffleArray(personae.map((p) => personaInfo[p].nederlands)).slice(
        0,
        4
      );
      if (!options.includes(correctAnswer)) {
        options[3] = correctAnswer;
        options = shuffleArray(options);
      }
      break;
  }

  return {
    type,
    werkwoord,
    betekenis,
    conjugatie,
    tempus,
    persona,
    correctAnswer,
    options,
  };
}

export default function WerkwoordenQuizPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [selectedConjugaties, setSelectedConjugaties] = useState<string[]>(
    conjugations.map((c) => c.id)
  );
  const [selectedTempora, setSelectedTempora] = useState<Tempus[]>([...tempora]);
  const [showSettings, setShowSettings] = useState(false);

  const generateNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(selectedConjugaties, selectedTempora);
    setQuestion(newQuestion);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [selectedConjugaties, selectedTempora]);

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

  const toggleConjugatie = (id: string) => {
    setSelectedConjugaties((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== id);
      }
      return [...prev, id];
    });
  };

  const toggleTempus = (tempus: Tempus) => {
    setSelectedTempora((prev) => {
      if (prev.includes(tempus)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== tempus);
      }
      return [...prev, tempus];
    });
  };

  const getQuestionText = () => {
    if (!question) return '';

    switch (question.type) {
      case 'vorm':
        return (
          <>
            Wat is de <strong>{tempusInfo[question.tempus].naam.toLowerCase()}</strong>,{' '}
            <strong>{personaInfo[question.persona].nederlands}</strong>-vorm van{' '}
            <strong>{question.werkwoord}</strong> ({question.betekenis})?
          </>
        );
      case 'tijd':
        return (
          <>
            Welke tijd is <strong>{question.conjugatie.vormen[question.tempus][question.persona]}</strong>?
            <br />
            <span className="text-sm opacity-70">
              ({question.conjugatie.voorbeeldwoord}, {question.conjugatie.naam})
            </span>
          </>
        );
      case 'persoon':
        return (
          <>
            Welke persoon is <strong>{question.conjugatie.vormen[question.tempus][question.persona]}</strong>?
            <br />
            <span className="text-sm opacity-70">
              ({question.conjugatie.voorbeeldwoord}, {tempusInfo[question.tempus].naam})
            </span>
          </>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Quiz Werkwoorden
        </h1>
        <p className="text-lg opacity-80">
          Test je kennis van de Latijnse werkwoordstijden!
        </p>
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
        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 space-y-4">
          <div>
            <h3 className="font-bold mb-3">Selecteer conjugaties:</h3>
            <div className="flex flex-wrap gap-2">
              {conjugations.map((conj) => (
                <button
                  key={conj.id}
                  onClick={() => toggleConjugatie(conj.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedConjugaties.includes(conj.id)
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {conj.naam}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3">Selecteer tijden:</h3>
            <div className="flex flex-wrap gap-2">
              {tempora.map((tempus) => (
                <button
                  key={tempus}
                  onClick={() => toggleTempus(tempus)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedTempora.includes(tempus)
                      ? 'bg-secondary text-white'
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {tempusInfo[tempus].naam}
                </button>
              ))}
            </div>
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
                : question.type === 'tijd'
                ? 'Tijd herkennen'
                : 'Persoon herkennen'}
            </span>
            <span className="text-xs opacity-60">{question.conjugatie.naam}</span>
          </div>

          {/* Vraag */}
          <p className="text-xl text-center py-4">{getQuestionText()}</p>

          {/* Antwoord opties */}
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, index) => {
              let buttonClass =
                'p-4 rounded-xl text-center font-semibold transition-all border-2 ';

              if (selectedAnswer === null) {
                buttonClass +=
                  'border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer';
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
        <p>Tip: Bekijk het overzicht als je de vormen nog moet leren!</p>
      </div>
    </div>
  );
}
