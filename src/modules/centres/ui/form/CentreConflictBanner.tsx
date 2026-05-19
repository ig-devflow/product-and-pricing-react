export const CentreConflictBanner = () => (
  <div className="conflict-banner" role="alert">
    <span className="conflict-banner__icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </span>
    <div>
      <div className="conflict-banner__title">This centre was modified by another user.</div>
      <div>Please refresh the page to load the latest version before saving.</div>
    </div>
  </div>
);
