import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BackContainer = styled.button`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 100px;
  gap: 8px;

  position: absolute;
  width: 100%;
  height: 68px;
  left: 0px;
  top: 80px;
  box-sizing: border-box;

  background: #ffffff;
  border: none;
  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #000000;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    padding: 16px 20px;
    height: 52px;
    top: 68px;
  }
`;

const ArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <BackContainer onClick={handleBack}>
      <ArrowIcon
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
      </ArrowIcon>
      BACK
    </BackContainer>
  );
};
