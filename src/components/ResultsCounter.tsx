import './ResultsCounter.css';

export const ResultsCounter = ({ count }: { count: number }) => {
  return (
    <div className="counter-container">
      <p className="counter-text">{count} RESULTS</p>
    </div>
  );
};
