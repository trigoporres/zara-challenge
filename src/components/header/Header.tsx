import styled from 'styled-components';

import { LogoCmp } from './Logo';
import { BagCmp } from './Bag';

const Header = styled.header`
  /* Header */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 100px;
  gap: 20px;

  position: absolute;
  width: 100%;
  height: 80px;
  left: 0px;
  top: 0px;
  box-sizing: border-box;

  background: #ffffff;
`;

interface HeaderProps {
  cartItemCount: number;
  hideBag: boolean;
}

export const HeaderCmp = ({ cartItemCount, hideBag }: HeaderProps) => {
  return (
    <Header>
      <LogoCmp />
      {!hideBag && <BagCmp itemCount={cartItemCount} />}
    </Header>
  );
};
