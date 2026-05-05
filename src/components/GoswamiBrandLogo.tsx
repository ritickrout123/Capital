/**
 * GoswamiBrandLogo — uses the actual Goswami Capital logo from src/assets/logo.png
 */
import logoSrc from "@/assets/logo.png";

interface GoswamiBrandLogoProps {
  size?: number;
  className?: string;
}

export function GoswamiBrandLogo({ size = 40, className = "" }: GoswamiBrandLogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Goswami Capital"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

interface GoswamiBrandProps {
  tagline?: string;
  size?: "sm" | "md";
}

/**
 * Full brand lockup used in header & footer.
 * Shows the logo image on the left, brand name text on the right.
 */
export function GoswamiBrand({ tagline, size = "md" }: GoswamiBrandProps) {
  const logoSize = size === "sm" ? 36 : 48;

  return (
    <span className="flex items-center gap-2">
      <GoswamiBrandLogo size={logoSize} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-extrabold tracking-tight leading-none"
          style={{
            fontSize: size === "sm" ? "15px" : "18px",
            background: "linear-gradient(135deg, #D47800 0%, #B85000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          GOSWAMI
        </span>
        <span
          className="font-display font-bold tracking-[0.25em] leading-none mt-0.5 text-center"
          style={{
            fontSize: size === "sm" ? "9px" : "10px",
            background: "#1A5C1A",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "2px",
          }}
        >
          CAPITAL
        </span>
        {tagline && (
          <span
            className="uppercase tracking-[0.15em] text-muted-foreground mt-1 leading-none"
            style={{ fontSize: "8px" }}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
