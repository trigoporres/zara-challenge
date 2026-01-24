import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BagProps {
  itemCount?: number;
}

const Bag = styled.div`
  /* Bag */

  width: 33px;
  height: 26px;

  /* Inside auto layout */
  flex: none;
  order: 3;
  flex-grow: 0;
`;

export const BagCmp = ({ itemCount = 0 }: BagProps) => {
  return (
    <Bag>
      <Link
        to="/cart"
        aria-label={`Shopping cart with ${itemCount} items`}
        style={{
          display: 'inline-block',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <svg
          width="33"
          height="26"
          viewBox="0 0 33 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4706 5.32031H6.76471V9.08502H3V21.3203H15.2353V9.08502H11.4706V5.32031ZM10.5294 10.0262V12.3791H11.4706V10.0262H14.2941V20.3791H3.94118V10.0262H6.76471V12.3791H7.70588V10.0262H10.5294ZM10.5294 9.08502V6.26149H7.70588V9.08502H10.5294Z"
            fill="black"
          />
          <text
            x="28.5"
            y="16"
            fontSize="10"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fill="black"
            textAnchor="middle"
          >
            {itemCount}
          </text>
        </svg>
      </Link>
    </Bag>
  );
};
