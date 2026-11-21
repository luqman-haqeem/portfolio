// PROTOTYPE — throwaway. Variant D: the category standard, played straight.
import type { Shaped } from "./data";

export default function CategoryStandard({ d }: { d: Shaped }) {
  const { profile } = d;
  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-zinc-500">{profile.role} · {profile.basedIn}</p>
          <p className="mt-6 text-[17px] leading-relaxed text-zinc-700">{profile.summary}</p>
          <div className="mt-6 flex gap-5 text-[15px]">
            <a href={profile.github} className="text-blue-600 hover:underline">GitHub</a>
            <a href={profile.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </header>

        <section className="mt-20">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Experience</h2>
          <ul className="mt-6 space-y-10">
            {d.roles.map((r) => (
              <li key={r.id} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="text-sm text-zinc-500 tabular-nums">{r.period}</p>
                <div>
                  <h3 className="font-semibold">{r.title} · {r.company}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{r.summary}</p>
                  <p className="mt-2 text-sm text-zinc-500">{r.projects.map((p) => p.name).join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Projects</h2>
          <ul className="mt-6 space-y-8">
            {d.projects.map((p) => (
              <li key={p.id}>
                <a href={p.url} className="font-semibold hover:text-blue-600">{p.name} ↗</a>
                <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">{p.detail}</p>
                <p className="mt-2 text-sm text-zinc-500">{p.stack.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Recent repositories</h2>
          <ul className="mt-6 divide-y divide-zinc-100">
            {d.repos.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-4 py-3">
                <a href={r.url} className="font-medium hover:text-blue-600">{r.name}</a>
                <span className="text-sm text-zinc-500 tabular-nums">{r.pushed}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
