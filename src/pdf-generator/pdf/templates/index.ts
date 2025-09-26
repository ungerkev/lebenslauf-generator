import { PdfTemplate } from '../../types/pdf-template.types';
import { Lebenslauf0001Template } from './lebenslauf_0001.template';
import { Lebenslauf0002Template } from './lebenslauf_0002.template';

export const TEMPLATES = {
  lebenslauf_0001: Lebenslauf0001Template,
  lebenslauf_0002: Lebenslauf0002Template,
  // add more templates here
} satisfies Record<string, PdfTemplate<any>>;
