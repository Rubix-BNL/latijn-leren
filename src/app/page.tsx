import Link from 'next/link';
import { casusInfo, type Casus } from '@/data/declensions';

export default function Home() {
  const casussen = Object.entries(casusInfo) as [Casus, typeof casusInfo[Casus]][];

  return (
    <div className="space-y-12">
      {/* Hero sectie */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Latijnse Naamvallen Leren
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Oefen de zes naamvallen en de verschillende declinaties met interactieve oefeningen.
          Perfect voor VWO klas 2!
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/overzicht"
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Bekijk Overzicht
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors shadow-lg"
          >
            Start Quiz
          </Link>
        </div>
      </section>

      {/* De zes naamvallen */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">De Zes Naamvallen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {casussen.map(([key, info]) => (
            <div
              key={key}
              className="bg-white/50 dark:bg-white/5 rounded-xl p-6 shadow-md border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                  {info.afkorting}
                </span>
                <h3 className="font-bold text-lg">{info.naam}</h3>
              </div>
              <p className="text-secondary font-semibold mb-1">{info.vraag}</p>
              <p className="text-sm opacity-70">{info.functie}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Uitleg sectie */}
      <section className="bg-white/50 dark:bg-white/5 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Wat zijn naamvallen?</h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In het Latijn verandert de <strong>uitgang</strong> van een zelfstandig naamwoord
            afhankelijk van de functie in de zin. Deze verschillende vormen noemen we <strong>naamvallen</strong> (casus).
          </p>
          <p>
            Het Latijn heeft zes naamvallen. De uitgang vertelt je wat de functie van het woord
            is in de zin, bijvoorbeeld onderwerp, lijdend voorwerp of bezit.
          </p>
          <p>
            De woorden worden ingedeeld in <strong>declinaties</strong> (verbuigingsgroepen).
            In VWO klas 2 leer je de 1e, 2e en 3e declinatie.
          </p>
        </div>
      </section>

      {/* Tips sectie */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-6">Tips voor het leren</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-3">1</div>
            <h3 className="font-bold mb-2">Leer de uitgangen</h3>
            <p className="text-sm opacity-70">
              Begin met het uit je hoofd leren van de uitgangen per declinatie.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">2</div>
            <h3 className="font-bold mb-2">Herken de stam</h3>
            <p className="text-sm opacity-70">
              Zoek altijd eerst de stam van het woord (meestal gen. sg. minus uitgang).
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">3</div>
            <h3 className="font-bold mb-2">Oefen regelmatig</h3>
            <p className="text-sm opacity-70">
              Doe elke dag een paar quizvragen om de vormen te onthouden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
