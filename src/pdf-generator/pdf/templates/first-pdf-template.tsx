import * as React from 'react';

export type FirstPdfTemplateProps = {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
  skills: string[];
};

export function FirstPdfTemplate(props: FirstPdfTemplateProps) {
  const { name, title, email, location, summary, skills } = props;

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased px-[12mm] py-[14mm]">
      {/* header */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="text-sm text-zinc-600">{title}</div>
        <div className="text-sm text-zinc-600">
          {email} · {location}
        </div>
      </header>

      {/* summary */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Profil</h2>
        <p className="text-sm leading-6 mt-1">{summary}</p>
      </section>

      {/* skills */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Fähigkeiten</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((s, i) => (
            <span key={i} className="text-sm px-2 py-1 rounded bg-zinc-100">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
