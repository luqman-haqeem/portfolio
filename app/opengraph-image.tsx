import { ImageResponse } from "next/og";
import { profile, roles } from "@/lib/resume";
import { buildTimeline } from "@/lib/trace";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const palette: Record<string, string> = {
  apmt: "#93aecf",
  "cloone-php": "#2dd4bf",
  "cloone-senior": "#a78bfa",
  devwiz: "#fb7185",
  cheil: "#63a4ff",
  inmagine: "#ffb648",
};

/**
 * A miniature of the real career waterfall, generated from the same data as the
 * page — so the share card can't drift out of sync with the résumé.
 */
export default function OpengraphImage() {
  const timeline = buildTimeline(roles);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08090b",
          padding: "52px 60px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 21,
            color: "#3ecf8e",
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 999,
              background: "#3ecf8e",
            }}
          />
          {profile.service}
          <span style={{ color: "#5c6472" }}>
            · uptime {timeline.totalDuration} · {profile.region}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 68,
            fontWeight: 700,
            color: "#e8eaef",
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>

        <div style={{ display: "flex", marginTop: 4, fontSize: 27, color: "#ffb648" }}>
          {profile.role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 23,
            color: "#929aa8",
          }}
        >
          Strongest on the backend: slow queries, millions of records, uptime.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            marginTop: 34,
          }}
        >
          {timeline.spans.map((span) => (
            <div
              key={span.role.id}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div
                style={{
                  display: "flex",
                  width: 292,
                  fontSize: 17,
                  color: palette[span.role.id] ?? "#929aa8",
                  whiteSpace: "nowrap",
                }}
              >
                {span.role.service}
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: 610,
                  height: 17,
                  background: "#12151b",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: `${span.offsetPct}%`,
                    width: `${span.widthPct}%`,
                    height: 17,
                    borderRadius: 4,
                    background: palette[span.role.id] ?? "#929aa8",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  color: "#5c6472",
                  width: 90,
                  whiteSpace: "nowrap",
                }}
              >
                {span.duration}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 20,
            fontSize: 18,
            color: "#5c6472",
          }}
        >
          {profile.githubLabel} · {profile.linkedinLabel}
        </div>
      </div>
    ),
    size,
  );
}
