import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button className="back-container" onClick={handleBack} type="button">
      <svg
        className="arrow-icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      BACK
    </button>
  );
};
