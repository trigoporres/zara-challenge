import styled from 'styled-components';

const OptionsRow = styled.div`
  /* Storage options */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 144px;
  height: 65px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  /* Storage */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;

  width: 95px;
  height: 65px;

  background: #ffffff;
  border: ${(props) =>
    props.selected ? '1px solid #000000' : '1px solid #cccccc'};

  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;

  color: #000000;

  cursor: pointer;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Storage = ({
  storageOptions,
  selectedStorage,
  setSelectedStorage,
}: {
  storageOptions: any[];
  selectedStorage: any;
  setSelectedStorage: any;
}) => {
  return (
    <OptionsRow>
      {storageOptions?.map((storage) => (
        <OptionButton
          key={storage.capacity}
          selected={selectedStorage === storage.capacity}
          onClick={() => setSelectedStorage(storage.capacity)}
        >
          {storage.capacity}
        </OptionButton>
      ))}
    </OptionsRow>
  );
};
