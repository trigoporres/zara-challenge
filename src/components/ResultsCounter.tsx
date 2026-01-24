import './ResultsCounter.css';

export const ResultsCounter = ({ count }: { count: number }) => {
  return (
    <div
      className="counter-container"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="counter-text">{count} RESULTS</p>
    </div>
  );
};
