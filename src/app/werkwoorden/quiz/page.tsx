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

const TOTAL_QUESTIONS = 25;

interface Question {
  vorm: string;
  werkwoord: string;
  betekenis: string;
  conjugatie: Conjugation;
  correctTempus: Tempus;
  correctPersona: Persona;
}

function generateQuestion(
  selectedConjugaties: string[],
  selectedTempora: Tempus[]
): Question {
  const availableConjugaties = conjugations.filter((c) =>
    selectedConjugaties.includes(c.id)
  );
  const conjugatie =
    availableConjugaties[Math.floor(Math.random() * availableConjugaties.length)];

  const tempus = selectedTempora[Math.floor(Math.random() * selectedTempora.length)];
  const persona = personae[Math.floor(Math.random() * personae.length)];

  const vorm = conjugatie.vormen[tempus][persona];

  return {
    vorm,
    werkwoord: conjugatie.voorbeeldwoord,
    betekenis: conjugatie.betekenis,
    conjugatie,
    correctTempus: tempus,
    correctPersona: persona,
  };
}

function calculateGrade(correct: number, total: number): number {
  // Grade from 1 to 10, where 0 correct = 1 and all correct = 10
  const grade = (correct / total) * 9 + 1;
  return Math.round(grade * 10) / 10; // Round to 1 decimal
}

export default function WerkwoordenQuizPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedTempus, setSelectedTempus] = useState<Tempus | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedConjugaties, setSelectedConjugaties] = useState<string[]>(
    conjugations.map((c) => c.id)
  );
  const [selectedTempora, setSelectedTempora] = useState<Tempus[]>([...tempora]);
  const [showSettings, setShowSettings] = useState(false);

  const generateNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(selectedConjugaties, selectedTempora);
    setQuestion(newQuestion);
    setSelectedPersona(null);
    setSelectedTempus(null);
    setHasChecked(false);
  }, [selectedConjugaties, selectedTempora]);

  const startNewQuiz = useCallback(() => {
    setScore({ correct: 0, total: 0 });
    setQuizFinished(false);
    generateNewQuestion();
  }, [generateNewQuestion]);

  const checkAnswer = () => {
    if (!question || !selectedPersona || !selectedTempus) return;

    const isCorrect =
      selectedPersona === question.correctPersona &&
      selectedTempus === question.correctTempus;

    const newTotal = score.total + 1;
    const newCorrect = score.correct + (isCorrect ? 1 : 0);

    setHasChecked(true);
    setScore({ correct: newCorrect, total: newTotal });
  };

  const proceedToNext = () => {
    if (score.total >= TOTAL_QUESTIONS) {
      setQuizFinished(true);
    } else {
      generateNewQuestion();
    }
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

  const isCorrectPersona = hasChecked && selectedPersona === question?.correctPersona;
  const isCorrectTempus = hasChecked && selectedTempus === question?.correctTempus;
  const isFullyCorrect = isCorrectPersona && isCorrectTempus;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Quiz Werkwoorden
        </h1>
        <p className="text-lg opacity-80">
          Herken de persoon én de tijd van elke werkwoordsvorm!
        </p>
      </section>

      {/* Score en voortgang */}
      <div className="flex justify-between items-center bg-white/50 dark:bg-white/5 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-bold text-primary">{score.correct}</span>
            <span className="text-lg opacity-70">/{score.total}</span>
            <span className="ml-2 text-sm opacity-60">goed</span>
          </div>
          {question && !quizFinished && (
            <div className="text-sm opacity-60 border-l border-current/20 pl-4">
              Vraag {score.total + (hasChecked ? 0 : 1)}/{TOTAL_QUESTIONS}
            </div>
          )}
        </div>
        {!question && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Instellingen
          </button>
        )}
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
              {tempora.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTempus(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedTempora.includes(t)
                      ? 'bg-secondary text-white'
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {tempusInfo[t].naam}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz kaart */}
      {!question ? (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-8 text-center">
          <p className="text-lg mb-2 opacity-80">Klaar om te beginnen?</p>
          <p className="text-sm mb-6 opacity-60">{TOTAL_QUESTIONS} vragen - daarna krijg je een cijfer</p>
          <button
            onClick={startNewQuiz}
            className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      ) : quizFinished ? (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold">Quiz voltooid!</h2>
          <div className="space-y-2">
            <p className="text-6xl font-bold text-primary">
              {calculateGrade(score.correct, score.total)}
            </p>
            <p className="text-sm opacity-60">Je cijfer</p>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-primary">{score.correct}</span>
            <span className="opacity-70"> van de </span>
            <span className="font-semibold">{score.total}</span>
            <span className="opacity-70"> vragen goed</span>
          </div>
          <div className="pt-4">
            <button
              onClick={startNewQuiz}
              className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 space-y-6">
          {/* Conjugatie badge */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
              {question.conjugatie.naam}
            </span>
            <span className="text-xs opacity-60">
              {question.werkwoord} ({question.betekenis})
            </span>
          </div>

          {/* De werkwoordsvorm */}
          <div className="text-center py-6">
            <p className="text-sm opacity-60 mb-2">Welke persoon en tijd is:</p>
            <p className="text-4xl font-bold text-primary">{question.vorm}</p>
          </div>

          {/* Persoon selectie */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Persoon:</h3>
            <div className="grid grid-cols-3 gap-2">
              {personae.map((p) => {
                let buttonClass = 'p-3 rounded-lg text-center text-sm font-medium transition-all border-2 ';

                if (!hasChecked) {
                  buttonClass += selectedPersona === p
                    ? 'border-primary bg-primary text-white'
                    : 'border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer';
                } else {
                  if (p === question.correctPersona) {
                    buttonClass += 'border-success bg-success/20 text-success';
                  } else if (p === selectedPersona) {
                    buttonClass += 'border-error bg-error/20 text-error';
                  } else {
                    buttonClass += 'border-primary/10 opacity-40';
                  }
                }

                return (
                  <button
                    key={p}
                    onClick={() => !hasChecked && setSelectedPersona(p)}
                    disabled={hasChecked}
                    className={buttonClass}
                  >
                    {personaInfo[p].nederlands}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tijd selectie */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Tijd:</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedTempora.map((t) => {
                let buttonClass = 'p-3 rounded-lg text-center text-sm font-medium transition-all border-2 ';

                if (!hasChecked) {
                  buttonClass += selectedTempus === t
                    ? 'border-secondary bg-secondary text-white'
                    : 'border-secondary/30 hover:border-secondary hover:bg-secondary/10 cursor-pointer';
                } else {
                  if (t === question.correctTempus) {
                    buttonClass += 'border-success bg-success/20 text-success';
                  } else if (t === selectedTempus) {
                    buttonClass += 'border-error bg-error/20 text-error';
                  } else {
                    buttonClass += 'border-secondary/10 opacity-40';
                  }
                }

                return (
                  <button
                    key={t}
                    onClick={() => !hasChecked && setSelectedTempus(t)}
                    disabled={hasChecked}
                    className={buttonClass}
                  >
                    {tempusInfo[t].naam}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controleer knop */}
          {!hasChecked && (
            <button
              onClick={checkAnswer}
              disabled={!selectedPersona || !selectedTempus}
              className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                selectedPersona && selectedTempus
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-primary/30 text-white/50 cursor-not-allowed'
              }`}
            >
              Controleer antwoord
            </button>
          )}

          {/* Feedback */}
          {hasChecked && (
            <div
              className={`text-center p-4 rounded-xl ${
                isFullyCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
              }`}
            >
              <p className="font-bold text-lg mb-2">
                {isFullyCorrect
                  ? 'Helemaal goed!'
                  : isCorrectPersona || isCorrectTempus
                  ? 'Half goed!'
                  : 'Helaas, fout!'}
              </p>
              <p className="text-sm opacity-80">
                Het juiste antwoord was:{' '}
                <strong>
                  {personaInfo[question.correctPersona].nederlands} +{' '}
                  {tempusInfo[question.correctTempus].naam}
                </strong>
              </p>
            </div>
          )}

          {/* Volgende vraag knop */}
          {hasChecked && (
            <button
              onClick={proceedToNext}
              className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {score.total >= TOTAL_QUESTIONS ? 'Bekijk resultaat' : 'Volgende vraag'}
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
