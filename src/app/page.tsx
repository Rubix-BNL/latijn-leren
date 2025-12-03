import Link from 'next/link';
import { casusInfo, type Casus } from '@/data/declensions';
import { tempusInfo, type Tempus } from '@/data/conjugations';

export default function Home() {
  const casussen = Object.entries(casusInfo) as [Casus, typeof casusInfo[Casus]][];
  const tijden = Object.entries(tempusInfo) as [Tempus, typeof tempusInfo[Tempus]][];

  return (
    <div className="space-y-12">
      {/* Hero sectie */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Latijn Leren
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Oefen naamvallen en werkwoordstijden met interactieve oefeningen.
          Perfect voor VWO klas 2!
        </p>
      </section>

      {/* Twee hoofdsecties */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Naamvallen kaart */}
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 shadow-lg border border-primary/20">
          <h2 className="text-2xl font-bold text-primary mb-2">Naamvallen</h2>
          <p className="text-sm opacity-70 mb-4">
            Leer de zes naamvallen en de 1e, 2e en 3e declinatie.
          </p>
          <div className="flex gap-3 mb-6">
            <Link
              href="/overzicht"
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
            >
              Overzicht
            </Link>
            <Link
              href="/quiz"
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors text-sm"
            >
              Quiz
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {casussen.slice(0, 4).map(([key, info]) => (
              <div key={key} className="bg-primary/5 rounded-lg p-2">
                <span className="font-semibold">{info.naam}</span>
                <span className="opacity-60 ml-1">({info.afkorting})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Werkwoorden kaart */}
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 shadow-lg border border-secondary/20">
          <h2 className="text-2xl font-bold text-secondary mb-2">Werkwoorden</h2>
          <p className="text-sm opacity-70 mb-4">
            Leer de eerste vier tijden en de vier conjugaties.
          </p>
          <div className="flex gap-3 mb-6">
            <Link
              href="/werkwoorden/overzicht"
              className="px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-sm"
            >
              Overzicht
            </Link>
            <Link
              href="/werkwoorden/quiz"
              className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-semibold hover:bg-secondary/20 transition-colors text-sm"
            >
              Quiz
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {tijden.map(([key, info]) => (
              <div key={key} className="bg-secondary/5 rounded-lg p-2">
                <span className="font-semibold">{info.naam}</span>
                <span className="opacity-60 ml-1">({info.afkorting})</span>
              </div>
            ))}
          </div>
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

      {/* De vier tijden */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">De Eerste Vier Tijden</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tijden.map(([key, info]) => (
            <div
              key={key}
              className="bg-white/50 dark:bg-white/5 rounded-xl p-6 shadow-md border border-secondary/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono bg-secondary/10 text-secondary px-2 py-1 rounded">
                  {info.afkorting}
                </span>
                <h3 className="font-bold text-lg">{info.naam}</h3>
              </div>
              <p className="text-primary font-semibold mb-1">{info.nederlandseNaam}</p>
              <p className="text-sm opacity-70">{info.uitleg}</p>
              <p className="text-xs opacity-50 mt-2 italic">Bijv: {info.voorbeeld}</p>
            </div>
          ))}
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
              Begin met het uit je hoofd leren van de uitgangen per declinatie en conjugatie.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">2</div>
            <h3 className="font-bold mb-2">Herken patronen</h3>
            <p className="text-sm opacity-70">
              Zoek naar herkenbare elementen zoals -ba- voor imperfectum.
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
