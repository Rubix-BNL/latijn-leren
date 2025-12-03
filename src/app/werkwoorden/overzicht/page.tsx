import { Fragment } from 'react';
import {
  conjugations,
  tempusInfo,
  personaInfo,
  personae,
  tempora,
  type Tempus,
  type Persona,
} from '@/data/conjugations';

export default function WerkwoordenOverzichtPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Overzicht Werkwoordstijden
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Bekijk de vervoegingen van de eerste vier tijden per conjugatie.
        </p>
      </section>

      {/* Uitleg tijden */}
      <section className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">De Vier Tijden</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tempora.map((tempus) => (
            <div
              key={tempus}
              className="bg-primary/5 rounded-xl p-4 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                  {tempusInfo[tempus].afkorting}
                </span>
                <h3 className="font-bold">{tempusInfo[tempus].naam}</h3>
              </div>
              <p className="text-secondary font-semibold text-sm">
                {tempusInfo[tempus].nederlandseNaam}
              </p>
              <p className="text-sm opacity-70 mt-1">{tempusInfo[tempus].uitleg}</p>
              <p className="text-xs opacity-50 mt-2 italic">
                Bijv: {tempusInfo[tempus].voorbeeld}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conjugaties */}
      {conjugations.map((conj) => (
        <section
          key={conj.id}
          className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 shadow-lg"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">{conj.naam}</h2>
            <p className="text-sm opacity-70 mt-1">{conj.beschrijving}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                Kenmerk: {conj.kenmerk}
              </span>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                Voorbeeld: <strong>{conj.voorbeeldwoord}</strong> ({conj.betekenis})
              </span>
            </div>
          </div>

          {/* Tabellen per tijd */}
          <div className="grid lg:grid-cols-2 gap-6">
            {tempora.map((tempus) => (
              <div key={tempus} className="overflow-x-auto">
                <h3 className="font-bold mb-2 text-secondary">
                  {tempusInfo[tempus].naam}
                  <span className="text-xs font-normal opacity-60 ml-2">
                    ({tempusInfo[tempus].nederlandseNaam})
                  </span>
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary/30">
                      <th className="text-left py-2 px-2 font-bold">Persoon</th>
                      <th className="text-center py-2 px-2 font-bold">Uitgang</th>
                      <th className="text-center py-2 px-2 font-bold">Vorm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personae.map((persona, index) => (
                      <tr
                        key={persona}
                        className={`border-b border-primary/10 ${
                          index % 2 === 0 ? 'bg-primary/5' : ''
                        } hover:bg-primary/10 transition-colors`}
                      >
                        <td className="py-2 px-2">
                          <span className="font-semibold">
                            {personaInfo[persona].nederlands}
                          </span>
                          <span className="text-xs opacity-60 ml-1">
                            ({personaInfo[persona].afkorting})
                          </span>
                        </td>
                        <td className="text-center py-2 px-2 font-mono text-primary">
                          {conj.uitgangen[tempus][persona]}
                        </td>
                        <td className="text-center py-2 px-2 font-semibold">
                          {conj.vormen[tempus][persona]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Ezelsbruggetjes */}
      <section className="bg-primary/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Ezelsbruggetjes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Persoonsuitgangen (algemeen)</h3>
            <p className="text-sm opacity-80 font-mono">
              -o/m, -s, -t, -mus, -tis, -nt
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Imperfectum herkennen</h3>
            <p className="text-sm opacity-80">
              Kijk naar <strong>-ba-</strong> (1e/2e conj.) of <strong>-ēba-</strong> (3e/4e conj.)
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Perfectum herkennen</h3>
            <p className="text-sm opacity-80">
              Let op de uitgangen: <strong>-ī, -istī, -it, -imus, -istis, -ērunt</strong>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Plusquamperfectum herkennen</h3>
            <p className="text-sm opacity-80">
              Perfectumstam + <strong>-era-</strong> + persoonsuitgang
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
