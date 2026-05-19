import { useEffect, useState } from 'react';

export interface SectionNavSection {
  id: string;
  label: string;
}

export interface CentreSectionNavProps {
  sections: SectionNavSection[];
}

export const CentreSectionNav = ({ sections }: CentreSectionNavProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const OFFSET = 140;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const target = visible[0]?.target;
        if (target?.id) setActiveId(target.id);
      },
      { rootMargin: `-${OFFSET}px 0px -40% 0px`, threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 136;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <aside className="centre-section-nav">
      <p className="centre-section-nav__heading">On this page</p>
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`centre-section-nav__item${activeId === s.id ? ' is-active' : ''}`}
          onClick={() => scrollTo(s.id)}
        >
          {s.label}
        </button>
      ))}
    </aside>
  );
};
