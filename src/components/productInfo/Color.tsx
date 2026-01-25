import { styled } from 'styled-components';

import type { ProductDetail } from '../../schemas/product.schemas';

const ColorOptionsRow = styled.div`
  /* Color options */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: auto;
  height: auto;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const ColorSquare = styled.button<{ color: string; selected?: boolean }>`
  /* Color */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 32px;
  height: 32px;

  background: ${(props) => props.color};
  border: ${(props) =>
    props.selected ? '2px solid #000000' : '1px solid #cccccc'};

  cursor: pointer;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  &:hover {
    border: 2px solid #000000;
  }
`;

const ColorName = styled.span<{ visible?: boolean }>`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  text-align: center;

  color: #000000;

  flex: none;
  order: 2;
  align-self: flex-start;
`;

export const Color = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
}: {
  colorOptions: ProductDetail['colorOptions'];
  selectedColor: number;
  setSelectedColor: (index: number) => void;
}) => {
  return (
    <>
      <ColorOptionsRow>
        {colorOptions?.map((colorOption, index) => (
          <ColorSquare
            key={index}
            color={colorOption.hexCode}
            selected={selectedColor === index}
            onClick={() => setSelectedColor(index)}
          />
        ))}
      </ColorOptionsRow>
      <ColorName>{colorOptions?.[selectedColor]?.name}</ColorName>
    </>
  );
};
