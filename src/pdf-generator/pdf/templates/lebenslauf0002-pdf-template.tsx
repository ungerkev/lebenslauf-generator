import * as React from 'react';
import { z } from 'zod';

const lebenslauf0002Schema = z
  .object({
    name: z.string().min(1),
    title: z.string().optional(),
    email: z.string().email(),
    location: z.string().optional(),
    summary: z.string().optional(),
    skills: z.array(z.string()).default([]),
  })
  .strict();

type Props = z.infer<typeof lebenslauf0002Schema>;

export const Lebenslauf0002Template = {
  name: 'first',
  component: Lebenslauf0001PdfTemplate as React.ComponentType<Props>,
  schema: lebenslauf0002Schema,
};

export function Lebenslauf0001PdfTemplate(props: Props) {
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
        <h2 className="text-xl font-semibold">Fähigkeiten Teil 2</h2>
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
