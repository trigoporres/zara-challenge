import { styled } from 'styled-components';
import type { ProductDetail } from '../../types';

const SpecsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 48px 0;
`;

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin: 0 0 48px 0;
`;

const SpecsTable = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
`;

const SpecRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const SpecLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #000000;
  flex: 0 0 200px;
`;

const SpecValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  flex: 1;
`;

interface SpecificationsProps {
  productDetail: ProductDetail;
}

export const Specifications = ({ productDetail }: SpecificationsProps) => {
  const { brand, name, description, specs } = productDetail;

  const specifications = [
    { label: 'BRAND', value: brand },
    { label: 'NAME', value: name },
    { label: 'DESCRIPTION', value: description },
    { label: 'SCREEN', value: specs?.screen },
    { label: 'RESOLUTION', value: specs?.resolution },
    { label: 'PROCESSOR', value: specs?.processor },
    { label: 'MAIN CAMERA', value: specs?.mainCamera },
    { label: 'SELFIE CAMERA', value: specs?.selfieCamera },
    { label: 'BATTERY', value: specs?.battery },
    { label: 'OS', value: specs?.os },
    { label: 'SCREEN REFRESH RATE', value: specs?.screenRefreshRate },
  ];

  return (
    <SpecsContainer>
      <Title>SPECIFICATIONS</Title>
      <SpecsTable>
        {specifications.map((spec, index) => (
          <SpecRow key={index}>
            <SpecLabel>{spec.label}</SpecLabel>
            <SpecValue>{spec.value}</SpecValue>
          </SpecRow>
        ))}
      </SpecsTable>
    </SpecsContainer>
  );
};
