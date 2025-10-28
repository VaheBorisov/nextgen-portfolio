import type { SchemaTypeDefinition } from 'sanity';

import profile from '@/sanity/schemaTypes/profile';
import project from '@/sanity/schemaTypes/project';
import skill from '@/sanity/schemaTypes/skill';
import experience from '@/sanity/schemaTypes/experience';
import education from '@/sanity/schemaTypes/education';
import testimonial from '@/sanity/schemaTypes/testimonial';
import certification from '@/sanity/schemaTypes/certification';
import achievement from '@/sanity/schemaTypes/achievement';
import blog from '@/sanity/schemaTypes/blog';
import service from '@/sanity/schemaTypes/service';
import contact from '@/sanity/schemaTypes/contact';
import siteSettings from '@/sanity/schemaTypes/siteSettings';
import navigation from '@/sanity/schemaTypes/navigation';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    project,
    skill,
    experience,
    education,
    testimonial,
    certification,
    achievement,
    blog,
    service,
    contact,
    siteSettings,
    navigation,
  ],
};
