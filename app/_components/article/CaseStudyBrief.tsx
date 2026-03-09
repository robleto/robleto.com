/**
 * CaseStudyBrief.tsx
 *
 * Structured "project brief" metadata box shown between the article header
 * and main content when variant="case-study".
 *
 * Configure: populate the `data` prop with whatever fields are available.
 * Any field that is undefined is simply omitted — no empty rows are shown.
 *
 * Typical usage in page.tsx:
 *   {variant === 'case-study' && postItem.caseStudy && (
 *     <CaseStudyBrief data={postItem.caseStudy} />
 *   )}
 *
 * Fields can be added to PostItem.caseStudy in types/index.ts as your
 * Notion database grows to include these properties.
 */

import React from 'react';

export interface CaseStudyData {
  /** Your title / role on the project */
  role?: string;
  /** Time span: "Q1 2024", "6 weeks", etc. */
  timeline?: string;
  /** Team composition: "Solo", "2 designers + 1 engineer", etc. */
  team?: string;
  /** Background and problem framing */
  context?: string;
  /** Key constraints, limitations, or requirements */
  constraints?: string;
  /** Approach, process, or methodology used */
  approach?: string;
  /** Outcomes, results, or impact */
  outcomes?: string;
  /** Deliverables, repos, or external links */
  artifacts?: Array<{ label: string; url: string }>;
}

interface CaseStudyBriefProps {
  data: CaseStudyData;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
    {children}
  </dt>
);

const Value: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dd className="text-sm text-gray-700 dark:text-gray-300 mb-5 last:mb-0 leading-relaxed">
    {children}
  </dd>
);

const CaseStudyBrief: React.FC<CaseStudyBriefProps> = ({ data }) => {
  // Don't render if all fields are empty
  const hasContent = Object.values(data).some(
    (v) => v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
  );
  if (!hasContent) return null;

  const leftColumn = [
    data.role && { label: 'Role', value: <span>{data.role}</span> },
    data.timeline && { label: 'Timeline', value: <span>{data.timeline}</span> },
    data.team && { label: 'Team', value: <span>{data.team}</span> },
    data.constraints && { label: 'Constraints', value: <span>{data.constraints}</span> },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  const rightColumn = [
    data.context && { label: 'Context', value: <span>{data.context}</span> },
    data.outcomes && { label: 'Outcomes', value: <span>{data.outcomes}</span> },
    data.artifacts?.length && {
      label: 'Artifacts',
      value: (
        <ul className="space-y-1">
          {data.artifacts!.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link dark:text-blue-400 hover:underline"
              >
                {a.label} →
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <div className="my-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-mercury/40 dark:bg-gray-800/40 px-6 py-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
        Project Brief
      </p>

      <div className="grid sm:grid-cols-2 gap-x-10">
        {/* Left column */}
        {leftColumn.length > 0 && (
          <dl>
            {leftColumn.map(({ label, value }) => (
              <React.Fragment key={label}>
                <Label>{label}</Label>
                <Value>{value}</Value>
              </React.Fragment>
            ))}
          </dl>
        )}

        {/* Right column */}
        {rightColumn.length > 0 && (
          <dl>
            {rightColumn.map(({ label, value }) => (
              <React.Fragment key={label}>
                <Label>{label}</Label>
                <Value>{value}</Value>
              </React.Fragment>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
};

export default CaseStudyBrief;
