import { styled } from 'styled-components';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = styled.div<{ width: string }>`
  /* Loading bar */

  position: absolute;
  height: 1px;
  left: 0px;

  background: #000000;
  width: ${(props) => props.width};
  z-index: 100;
`;

export const ProgressBarCmp = ({ progress }: ProgressBarProps) => {
  return <ProgressBar width={`${progress}%`} />;
};
