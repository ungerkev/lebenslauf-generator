import * as React from 'react';
import { z } from 'zod';

import { PdfTemplate } from '../../types/pdf-template.types';

const lebenslauf0001Schema = z
  .object({
    name: z.string().min(1),
    title: z.string().optional(),
    email: z.email(),
    location: z.string().optional(),
    summary: z.string().optional(),
    skills: z.array(z.string()).default([]),
  })
  .strict();

type Lebenslauf0001TemplateProps = z.infer<typeof lebenslauf0001Schema>;

export const Lebenslauf0001Template: PdfTemplate = {
  component:
    Lebenslauf_0001Template as React.ComponentType<Lebenslauf0001TemplateProps>,
  schema: lebenslauf0001Schema,
};

/**
 * Full Template
 */
export function Lebenslauf_0001Template({
  name,
  title,
  email,
  location,
  summary,
  skills,
}: Lebenslauf0001TemplateProps) {
  return (
    <div className="min-h-screen bg-white antialiased px-[12mm] py-[14mm]">
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
        <Headline>Profil</Headline>
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

/**
 * Components
 */
type HeadlineProps = {
  children: React.ReactNode;
};

function Headline({ children }: HeadlineProps) {
  return (
    <div className="px-4 py-1.5 bg-purple-100 rounded-sm">
      <h2 className="text-xl font-semibold">{children}</h2>
    </div>
  );
}
