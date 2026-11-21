import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, roles } from "@/lib/resume";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Read from files committed in the repo (SIL OFL, licences beside them), so
 * the card is set in the page's own faces without any network request.
 */
const fontDir = join(process.cwd(), "assets/og-fonts");
const [archivo800, archivo600, barlow700] = await Promise.all([
  readFile(join(fontDir, "archivo-latin-800-normal.woff")),
  readFile(join(fontDir, "archivo-latin-600-normal.woff")),
  readFile(join(fontDir, "barlow-condensed-latin-700-normal.woff")),
]);

const INK = "#141816";
const RED = "#d7322a";

/**
 * The share card in the page's own world: the staff gauge on the left, painted
 * as an E every 5 cm with metres alternating black and red, the statement
 * beside it, and the current reading in the water band. Generated from the same
 * data as the page so it cannot drift from the résumé.
 */
export default function OpengraphImage() {
  const active = roles.find((r) => r.end === null) ?? roles[roles.length - 1];
  const PLATE_H = 546;
  const blocks = 30; // 1.5 m of plate, 5 cm per E
  const unit = PLATE_H / (blocks * 5);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f6f7f4", color: INK, fontFamily: "Archivo" }}>
        <div style={{ display: "flex", padding: "38px 0 38px 56px" }}>
          <div style={{ position: "relative", display: "flex", width: 72, height: PLATE_H + 8, border: `4px solid ${INK}`, background: "#fff" }}>
            {Array.from({ length: blocks }, (_, b) => {
              const paint = Math.floor(b / 20) % 2 === 0 ? INK : RED;
              const right = b % 2 === 1;
              const edge = right ? { right: 2 } : { left: 2 };
              return (
                <div key={b} style={{ position: "absolute", left: 0, right: 0, bottom: b * 5 * unit, height: 5 * unit, display: "flex" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, width: 6, background: paint, ...edge }} />
                  {[0, 2, 4].map((arm) => (
                    <div key={arm} style={{ position: "absolute", top: arm * unit, height: unit, width: 30, background: paint, ...edge }} />
                  ))}
                </div>
              );
            })}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "38%", background: "rgba(61,110,106,0.82)" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, marginLeft: 52 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 40, marginRight: 60, paddingBottom: 12, borderBottom: `4px solid ${INK}`, fontSize: 26, fontWeight: 600 }}>
            <span>{profile.name}</span>
            <span style={{ fontFamily: "Barlow Condensed", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", opacity: 0.75 }}>
              {profile.basedIn}
            </span>
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", marginRight: 60 }}>
            <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 0.94, letterSpacing: -2 }}>{profile.tagline[0]}</div>
            <div style={{ marginTop: 22, fontSize: 30, fontWeight: 600, lineHeight: 1.2, opacity: 0.8 }}>{profile.role}</div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", background: "#3d6e6a", color: "#fff", padding: "22px 60px 32px 32px", marginLeft: -32, fontSize: 27, fontWeight: 600 }}>
            <span style={{ fontFamily: "Barlow Condensed", fontWeight: 700, letterSpacing: 1.5, marginRight: 18, color: "#e2edeb" }}>NOW</span>
            <span>
              {active.title}, {active.company}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo800, weight: 800, style: "normal" },
        { name: "Archivo", data: archivo600, weight: 600, style: "normal" },
        { name: "Barlow Condensed", data: barlow700, weight: 700, style: "normal" },
      ],
    },
  );
}
