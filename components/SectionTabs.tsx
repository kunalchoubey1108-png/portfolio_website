"use client";

type Section = "projects" | "skills" | "about" | "contact";

interface SectionTabsProps {
  active: Section;
  onChange: (s: Section) => void;
}

const tabs: { key: Section; label: string; num: string }[] = [
  { key: "projects", label: "Projects", num: "1" },
  { key: "skills", label: "Skills", num: "2" },
  { key: "about", label: "About", num: "3" },
  { key: "contact", label: "Contact", num: "4" },
];

export default function SectionTabs({ active, onChange }: SectionTabsProps) {
  return (
    <div
      className="flex items-center gap-0 px-2 select-none"
      style={{
        background: "#0d0d0d",
        borderBottom: "1px solid var(--green-dark)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="px-4 py-1.5 text-xs transition-all"
            style={{
              fontFamily: "inherit",
              background: isActive ? "var(--blue-dark)" : "transparent",
              color: isActive ? "var(--white)" : "var(--gray)",
              borderBottom: isActive
                ? "2px solid var(--blue)"
                : "2px solid transparent",
              borderRight: "1px solid var(--green-dark)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <span style={{ color: "var(--yellow)" }}>[{tab.num}]</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export type { Section };
