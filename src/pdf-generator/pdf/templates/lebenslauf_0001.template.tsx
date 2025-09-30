import parse from 'html-react-parser';
import { Mail, Smartphone } from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';

import { PdfTemplate } from '../../types/pdf-template.types';

const htmlString = z
  .string()
  .min(1, 'content required')
  .refine((s) => !/<\s*script\b/i.test(s), 'script tags are not allowed');

const skillGroupSchema = z
  .object({
    headline: z.string().min(1, 'headline required'),
    badges: z.array(z.string().min(1)).min(1, 'at least one badge'),
  })
  .strict();

/** Section variants */
const customSectionSchema = z
  .object({
    type: z.literal('custom'),
    headline: z.string().min(1, 'headline required'),
    content: htmlString,
  })
  .strict();

const skillsSectionSchema = z
  .object({
    type: z.literal('skills'),
    headline: z.string().min(1, 'headline required'),
    content: z.array(skillGroupSchema).min(1, 'at least one skills group'),
  })
  .strict();

export const sectionSchema = z.preprocess(
  (val) => {
    if (val && typeof val === 'object' && !('type' in (val as any))) {
      return { ...val, type: 'custom' as const };
    }
    return val;
  },
  z.discriminatedUnion('type', [customSectionSchema, skillsSectionSchema]),
);

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
    sections: z.array(sectionSchema).default([]),
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
  sections,
}: Lebenslauf0001TemplateProps) {
  const textColor = 'rgb(20, 20, 22)';

  return (
    <div
      className="bg-white antialiased p-[25.4mm] text-[16px]"
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
      {sections.map((section, i) => {
        if (section.type === 'custom') {
          return (
            <section key={`custom-${i}`} className="mt-4 break-inside-avoid">
              <H3>{section.headline}</H3>
              <div className="mt-1 leading-6">{parse(section.content)}</div>
            </section>
          );
        }

        return (
          <section key={`skills-${i}`} className="mt-4 break-inside-avoid">
            <H3>{section.headline}</H3>
            <div className="mt-2 space-y-2">
              {section.content.map((group, gi) => (
                <div key={`group-${gi}`}>
                  <div>{group.headline}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {group.badges.map((badge, bi) => (
                      <span
                        key={`badge-${gi}-${bi}`}
                        className="text-sm px-2 py-1 rounded bg-zinc-100"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
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
    <h1 className="text-[27px] mb-px" style={{ color: textColor }}>
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
    <h2 className="text-[21px] mb-1.5" style={{ color: textColor }}>
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
    <div className="text-center py-0.5 rounded-sm" style={{ backgroundColor }}>
      <h3 className="text-[18px]">{children}</h3>
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
          <Mail strokeWidth={1.5} size={16} style={{ color: iconColor }} />
          {email}
        </div>
      )}

      {phone && (
        <div className="flex items-center gap-1">
          <Smartphone
            strokeWidth={1.5}
            size={16}
            style={{ color: iconColor }}
          />
          {phone}
        </div>
      )}
    </div>
  );
}
