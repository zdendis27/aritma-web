import SectionTitle from "../components/SectionTitle";

export default function ClubPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Klub"
        title="Historie, zázemí a kontakt"
        description="Základní informace o klubu SK Aritma Praha, domácím areálu i klubové filozofii."
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">Historie klubu</h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            SK Aritma Praha patří mezi tradiční pražské kluby s důrazem na kvalitní práci s mládeží, dlouhodobou stabilitu a pevné vazby na lokální komunitu.
          </p>
        </article>
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">Stadion</h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Domácím zázemím klubu je stadion v Praze 6. Areál nabízí tréninkové plochy, zázemí pro mládež i fanouškovské akce.
          </p>
        </article>
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">Klubové informace</h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Klub staví na propojení výkonnostního fotbalu a výchovy mladých hráčů. Důležitou součástí je spolupráce s rodiči, školami a místní komunitou.
          </p>
        </article>
        <article className="rounded-[2rem] bg-primary p-8 text-white shadow-glow">
          <h3 className="text-2xl font-bold">Kontakty</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-white/85">
            <p>Email: info@aritma.cz</p>
            <p>Telefon: +420 222 123 456</p>
            <p>Adresa: Nad Lavi 5, Praha 6</p>
          </div>
        </article>
      </section>
    </div>
  );
}
