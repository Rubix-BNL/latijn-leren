import { declensions, casusInfo, type Casus, type Numerus } from '@/data/declensions';

export default function OverzichtPage() {
  const casussen = Object.keys(casusInfo) as Casus[];
  const numeri: Numerus[] = ['singularis', 'pluralis'];

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Overzicht Declinaties
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Bekijk alle uitgangen en voorbeeldvormen per declinatie.
          Klik op een tabel om de vormen te bestuderen.
        </p>
      </section>

      {declensions.map((decl) => (
        <section key={decl.id} className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">{decl.naam}</h2>
            <p className="text-sm opacity-70 mt-1">{decl.beschrijving}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {decl.geslacht}
              </span>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                Voorbeeld: <strong>{decl.voorbeeldwoord}</strong> ({decl.betekenis})
              </span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                Stam: <strong>{decl.stam}</strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary/30">
                  <th className="text-left py-3 px-2 font-bold">Naamval</th>
                  {numeri.map((numerus) => (
                    <th key={numerus} colSpan={2} className="text-center py-3 px-2 font-bold capitalize">
                      {numerus === 'singularis' ? 'Enkelvoud' : 'Meervoud'}
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-primary/20 text-xs opacity-70">
                  <th className="text-left py-2 px-2"></th>
                  {numeri.map((numerus) => (
                    <>
                      <th key={`${numerus}-uitgang`} className="text-center py-2 px-2">Uitgang</th>
                      <th key={`${numerus}-vorm`} className="text-center py-2 px-2">Vorm</th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {casussen.map((casus, index) => (
                  <tr
                    key={casus}
                    className={`border-b border-primary/10 ${
                      index % 2 === 0 ? 'bg-primary/5' : ''
                    } hover:bg-primary/10 transition-colors`}
                  >
                    <td className="py-3 px-2">
                      <span className="font-semibold">{casusInfo[casus].naam}</span>
                      <span className="text-xs opacity-60 ml-2">({casusInfo[casus].afkorting})</span>
                    </td>
                    {numeri.map((numerus) => (
                      <>
                        <td key={`${numerus}-${casus}-uitgang`} className="text-center py-3 px-2 font-mono text-primary">
                          {decl.uitgangen[numerus][casus]}
                        </td>
                        <td key={`${numerus}-${casus}-vorm`} className="text-center py-3 px-2 font-semibold">
                          {decl.vormen[numerus][casus]}
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Ezelsbruggetjes sectie */}
      <section className="bg-primary/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Ezelsbruggetjes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">1e Declinatie (puella)</h3>
            <p className="text-sm opacity-80 font-mono">
              a - ae - ae - am - ā | ae - ārum - īs - ās - īs
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">2e Declinatie mannelijk (servus)</h3>
            <p className="text-sm opacity-80 font-mono">
              us - ī - ō - um - ō | ī - ōrum - īs - ōs - īs
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">2e Declinatie onzijdig (templum)</h3>
            <p className="text-sm opacity-80 font-mono">
              um - ī - ō - um - ō | a - ōrum - īs - a - īs
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Onthoud!</h3>
            <p className="text-sm opacity-80">
              Bij onzijdige woorden zijn nominativus, accusativus en vocativus altijd gelijk!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
