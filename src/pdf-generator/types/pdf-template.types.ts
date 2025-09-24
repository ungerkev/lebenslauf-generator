import type React from 'react';
import type { ZodSchema } from 'zod';

import { TEMPLATES } from '../pdf/templates';

export interface PdfTemplate<TProps extends object = any> {
  name: string;
  component: React.ComponentType<TProps>;
  schema: ZodSchema<TProps>;
}

export type TemplateName = keyof typeof TEMPLATES;
