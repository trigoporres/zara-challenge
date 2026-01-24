import { Link } from 'react-router-dom';
import { LogoIcon } from './LogoIcon';
import './Logo.css';

export const LogoCmp = () => {
  return (
    <div className="logo">
      <Link to="/" aria-label="MBST logo" className="logo-link">
        <LogoIcon />
      </Link>
    </div>
  );
};
