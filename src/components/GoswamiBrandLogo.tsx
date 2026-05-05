/**
 * GoswamiBrandLogo
 * SVG logo inspired by the Goswami Capital brand mark:
 *  - Orange "G" letterform with a green upward arrow cutting through it
 *  - Matches the logo colours: orange #C85500 and dark green #1B5E20
 */

interface GoswamiBrandLogoProps {
  /** Size in pixels (renders as a square). Default: 36 */
  size?: number;
  className?: string;
}

export function GoswamiBrandLogo({ size = 36, className = "" }: GoswamiBrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Goswami Capital logo mark"
      className={className}
    >
      {/* Rounded square background — light cream matching logo background */}
      <rect width="36" height="36" rx="8" fill="#F5F9EC" />

      {/* Orange "G" arc — open on the right, matching the logo letterform */}
      <path
        d="M26 13.5C24.1 10.7 21.3 9 18 9C12.48 9 8 13.48 8 19C8 24.52 12.48 29 18 29C21.8 29 25.1 26.9 26.8 23.8H19.5V20.5H27.5C27.8 20 28 19.5 28 19C28 17.1 27.2 15.2 26 13.5Z"
        fill="#C85500"
      />

      {/* White cutout to make the "G" open (negative space on right side) */}
      <rect x="19" y="16" width="9" height="4" fill="#F5F9EC" />

      {/* Green upward arrow — overlaid on the G, pointing top-right */}
      <path
        d="M16 22L21 14L26 14L21 14L21 19"
        stroke="#1B5E20"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21 14L25 14L25 18"
        stroke="#1B5E20"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M21 14L25.5 14L25.5 18.5"
        stroke="#1B5E20"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Full inline brand lockup: logo mark + "GOSWAMI" in orange + "CAPITAL" in green
 * Use this in the header and footer.
 */
interface GoswamiBrandProps {
  tagline?: string;
  size?: "sm" | "md";
}

export function GoswamiBrand({ tagline, size = "md" }: GoswamiBrandProps) {
  const logoSize = size === "sm" ? 30 : 36;
  const nameClass = size === "sm" ? "text-sm" : "text-base";

  return (
    <span className="flex items-center gap-2.5">
      <GoswamiBrandLogo size={logoSize} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight ${nameClass}`}
          style={{ color: "#C85500" }}
        >
          GOSWAMI{" "}
          <span style={{ color: "#1B5E20" }}>CAPITAL</span>
        </span>
        {tagline && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
