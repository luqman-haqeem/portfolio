import {
  certifications,
  education,
  practices,
  profile,
  projects,
  roles,
  skillLayers,
} from "@/lib/resume";
import { formatPeriod, formatDuration, monthSpan } from "@/lib/trace";

/**
 * Screen-hidden, print-visible. Keeps the printed output a clean, plain-text
 * résumé instead of a screenshot of a dashboard.
 */
export default function PrintResume() {
  const ordered = [...roles].reverse();

  return (
    <div className="hidden text-black" data-print="show">
      <header>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm">{profile.role}</p>
        <p className="mt-1 text-xs">
          {profile.email} · {profile.phone} · {profile.region}
        </p>
        <p className="text-xs">
          {profile.githubLabel} · {profile.linkedinLabel}
        </p>
        <p className="mt-3 text-xs leading-snug">{profile.summary}</p>
      </header>

      <PrintSection title="Experience">
        {ordered.map((role) => (
          <div key={role.id} className="mb-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-bold">{role.company}</p>
              <p className="text-xs">
                {formatPeriod(role.start, role.end)} ·{" "}
                {formatDuration(monthSpan(role.start, role.end))}
              </p>
            </div>
            <p className="text-xs italic">
              {role.title} — {role.location}
              {role.employment ? ` (${role.employment})` : ""}
            </p>
            <ul className="mt-1 list-disc pl-5 text-xs leading-snug">
              {role.achievements.map((a) => (
                <li key={a.text}>{a.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Projects">
        {projects.map((project) => (
          <div key={project.id} className="mb-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-bold">{project.name}</p>
              <p className="text-xs">{project.url}</p>
            </div>
            <p className="text-xs">{project.detail}</p>
            <ul className="mt-1 list-disc pl-5 text-xs leading-snug">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
              <li>Built with {project.stack.join(", ")}</li>
            </ul>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Education">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm font-bold">{education.school}</p>
          <p className="text-xs">{education.period}</p>
        </div>
        <p className="text-xs">{education.qualification}</p>
      </PrintSection>

      <PrintSection title="Certifications">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex items-baseline justify-between gap-4"
          >
            <p className="text-xs font-bold">{cert.name}</p>
            <p className="text-xs">
              {cert.issuer} · {cert.year}
            </p>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Skills">
        {skillLayers.map((layer) => (
          <p key={layer.id} className="text-xs leading-snug">
            <span className="font-bold">{layer.label}: </span>
            {layer.nodes.map((n) => n.name).join(", ")}
          </p>
        ))}
        <p className="text-xs leading-snug">
          <span className="font-bold">Tools &amp; practices: </span>
          {practices.join(", ")}
        </p>
      </PrintSection>
    </div>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
