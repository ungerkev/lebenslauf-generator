import { Mail, Smartphone } from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';

import { PdfTemplate } from '../../types/pdf-template.types';

const lebenslauf0001Schema = z
  .object({
    name: z.string().min(1),
    title: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
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
  phone,
  street,
  postalCode,
  city,
  country,
  summary,
  skills,
}: Lebenslauf0001TemplateProps) {
  const textColor = 'rgb(20, 20, 22)';

  return (
    <div
      className="min-h-screen bg-white antialiased px-[12mm] py-[14mm] text-xs"
      style={{ color: textColor }}
    >
      {/* header */}
      <header className="mb-4">
        <H1>{name}</H1>
        <H2>{title}</H2>

        <div className="space-y-2">
          <Location
            street={street}
            postalCode={postalCode}
            city={city}
            country={country}
          />

          <Contact iconColor={textColor} email={email} phone={phone} />
        </div>
      </header>

      {/* summary */}
      <section className="mt-4">
        <H3>Profil</H3>
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
type H1Props = {
  children: React.ReactNode;
};

function H1({ children }: H1Props) {
  const textColor = 'rgb(57, 76, 134)';

  return (
    <h1 className="text-xl mb-px" style={{ color: textColor }}>
      {children}
    </h1>
  );
}

type H2Props = {
  children: React.ReactNode;
};

function H2({ children }: H2Props) {
  const textColor = 'rgb(57, 76, 134)';

  return (
    <h2 className="text-base mb-1.5" style={{ color: textColor }}>
      {children}
    </h2>
  );
}

type H3Props = {
  children: React.ReactNode;
};

function H3({ children }: H3Props) {
  const backgroundColor = 'rgb(220, 225, 241)';

  return (
    <div className="text-center py-1.5 rounded-sm" style={{ backgroundColor }}>
      <h3 className="text-sm">{children}</h3>
    </div>
  );
}

type LocationProps = {
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};

function Location({ street, postalCode, city, country }: LocationProps) {
  if (!street && !postalCode && !city && !country) {
    return null;
  }

  return (
    <div>
      {street && <div>{street}</div>}
      {postalCode && city && (
        <div>
          {postalCode} {city}
        </div>
      )}
      {country && <div>{country}</div>}
    </div>
  );
}

type ContactProps = {
  iconColor: string;
  email?: string;
  phone?: string;
};

function Contact({ iconColor, email, phone }: ContactProps) {
  if (!email && !phone) {
    return null;
  }

  return (
    <div className="space-y-1">
      {email && (
        <div className="flex items-center gap-1.5">
          <Mail strokeWidth={1.5} size={14} style={{ color: iconColor }} />
          {email}
        </div>
      )}

      {phone && (
        <div className="flex items-center gap-1">
          <Smartphone
            strokeWidth={1.5}
            size={14}
            style={{ color: iconColor }}
          />
          {phone}
        </div>
      )}
    </div>
  );
}
