import cv from '../../content.md?raw';

// content.md is the single source for CV facts and portfolio copy.
// Keep the parser strict so a changed heading or field fails during the build.
function section(name: string): string {
  const entries = [...cv.matchAll(/^##\s+(?:\d+\.\s+)?(.+)$/gm)];
  const index = entries.findIndex((entry) => entry[1].trim() === name);
  if (index < 0) throw new Error(`Missing CV section: ${name}`);
  return cv.slice(entries[index].index, entries[index + 1]?.index ?? cv.length);
}

function field(source: string, name: string): string {
  const prefix = `- **${name}:** `;
  const line = source.split('\n').find((item) => item.startsWith(prefix));
  if (!line) throw new Error(`Missing CV field: ${name}`);
  return line.slice(prefix.length).trim();
}

function match(
  source: string,
  pattern: RegExp,
  name: string,
): RegExpMatchArray {
  const result = source.match(pattern);
  if (!result) throw new Error(`Missing CV content: ${name}`);
  return result;
}

function links(source: string) {
  return [...source.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)].map(
    (item) => ({
      label: item[1],
      url: item[2],
    }),
  );
}

export function inlineParts(source: string) {
  const parts: { text: string; url?: string }[] = [];
  let cursor = 0;
  for (const link of source.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
    if (link.index > cursor)
      parts.push({
        text: source.slice(cursor, link.index).replaceAll('**', ''),
      });
    parts.push({ text: link[1], url: link[2] });
    cursor = link.index + link[0].length;
  }
  if (cursor < source.length)
    parts.push({ text: source.slice(cursor).replaceAll('**', '') });
  return parts;
}

const about = section('Hero / About');
const contact = section('Contact');
const projects = section('Projects');
const researchSection = section('Research');
const experienceSection = section('Experience');
const educationSection = section('Education');
const skillsSection = section('Skills');
const copy = section('Portfolio copy');
const pegaxus = match(
  projects,
  /### PEGAXUS[^\n]*([\s\S]*?)(?=### EduConnect)/,
  'PEGAXUS',
)[1];
const educationLine = match(
  educationSection,
  /^\*\*(.+?)\*\*, (.+?) \((.+?)\), (.+)$/m,
  'education heading',
);

const capabilities = ['Elicitation', 'Modeling', 'Prototyping'].map((title) => {
  const block = match(
    copy,
    new RegExp(`### ${title}\\n([\\s\\S]*?)(?=### |$)`),
    title,
  )[1];
  return {
    id: title.toLowerCase(),
    title,
    description: field(block, 'Description'),
    skills: field(block, 'Skills'),
  };
});

const experienceHeading = match(
  experienceSection,
  /^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*, \[([^\]]+)\]\(([^)]+)\) \(([^)]+)\)/m,
  'experience heading',
);
const experienceLocation = match(
  experienceSection,
  /^- Location: \[([^\]]+)\]\(([^)]+)\)/m,
  'experience location',
);
const researchHeading = match(
  researchSection,
  /^\*\*(.+?)\*\* \((.+?)\)/m,
  'research heading',
);

export const portfolio = {
  alias: field(about, 'Alias'),
  name: field(about, 'Name'),
  role: field(about, 'Title'),
  location: field(about, 'Location'),
  school: field(about, 'School'),
  summary: field(about, 'Summary'),
  email: field(contact, 'Email'),
  github: field(contact, 'GitHub'),
  education: {
    institution: educationLine[1],
    degree: educationLine[2],
    period: educationLine[3],
    location: educationLine[4],
    scholarship: match(
      educationSection,
      /^- (100% Academic Scholarship.+)$/m,
      'scholarship',
    )[1],
    distinction: match(
      educationSection,
      /^- (Top 100 Outstanding Students.+)$/m,
      'distinction',
    )[1],
    gpa: match(educationSection, /^- GPA (.+)$/m, 'GPA')[1],
    coursework: match(
      educationSection,
      /^- Coursework: (.+)$/m,
      'coursework',
    )[1].split(', '),
  },
  skills: [...skillsSection.matchAll(/^- \*\*(.+?):\*\* (.+)$/gm)].map(
    (entry) => ({
      name: entry[1],
      detail: entry[2],
    }),
  ),
  capabilities,
  metrics: [
    {
      value: match(experienceSection, /(98\.7%)/, 'robotics result')[1],
      label: 'Robotics International Champion',
    },
    {
      value: match(
        pegaxus,
        /Documented (\d+) business flows/,
        'business flows',
      )[1],
      label: 'PEGAXUS business flows',
    },
    { value: '1st author', label: 'FISAT 2026 full paper' },
    {
      value: match(educationSection, /GPA (8\.0\/10)/, 'GPA metric')[1],
      label: 'FPT University GPA',
    },
  ],
  learningQuote: field(pegaxus, 'Learning'),
  contact: {
    heading: field(copy, 'Contact heading'),
    message: field(copy, 'Contact message'),
  },
};

export const research = {
  title: researchHeading[1],
  label: `First author · ${researchHeading[2].replaceAll(', ', ' · ')}`,
  summary: field(researchSection, 'Objective'),
  details: [
    { heading: 'Objective', body: field(researchSection, 'Objective') },
    { heading: 'Method', body: field(researchSection, 'Method') },
    { heading: 'Result', body: field(researchSection, 'Result') },
    {
      heading: 'Contribution',
      body: field(researchSection, 'Contribution (first author)'),
    },
  ],
  paper: links(field(researchSection, 'Link'))[0],
};

export const experience = {
  role: experienceHeading[1],
  roleUrl: experienceHeading[2],
  organization: experienceHeading[3],
  organizationUrl: experienceHeading[4],
  period: experienceHeading[5],
  locationLabel: experienceLocation[1],
  locationUrl: experienceLocation[2],
  highlights: experienceSection
    .split('\n')
    .filter((line) => /^- (Developed|Drove|Aligned) /.test(line))
    .map((line) => inlineParts(line.slice(2))),
  summary: match(
    experienceSection,
    /^- (Aligned progress.+)$/m,
    'experience result',
  )[1].replaceAll('**', ''),
  links: links(
    match(experienceSection, /^- Links: (.+)$/m, 'experience links')[1],
  ),
};
