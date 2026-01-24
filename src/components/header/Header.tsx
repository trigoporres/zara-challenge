import { LogoCmp } from './Logo';
import { BagCmp } from './Bag';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
  hideBag: boolean;
}

export const HeaderCmp = ({ cartItemCount, hideBag }: HeaderProps) => {
  return (
    <header className="header" role="banner" aria-label="Site header">
      <LogoCmp />
      {!hideBag && <BagCmp itemCount={cartItemCount} />}
    </header>
  );
};
