export interface CentreStatCardProps {
  label: string;
  value: number | string | null;
  suffix?: string | null;
}

export const CentreStatCard = ({ label, value, suffix }: CentreStatCardProps) => (
  <div className="stat-card">
    <span className="stat-card__label">{label}</span>
    {value != null ? (
      <span className="stat-card__value">
        {value}{suffix ?? ''}
      </span>
    ) : (
      <span className="stat-card__value stat-card__value--muted">—</span>
    )}
  </div>
);
