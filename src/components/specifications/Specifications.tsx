import type { ProductDetail } from '../../schemas/product.schemas';
import './Specifications.css';

export const Specifications = ({
  productDetail,
}: {
  productDetail: ProductDetail;
}) => {
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
    <div data-testid="specifications" className="specificationsContainer">
      <h2 className="specificationsTitle">SPECIFICATIONS</h2>
      <dl className="specsTable">
        {specifications.map((spec, index) => (
          <div key={index} className="specRow">
            <dt className="specLabel">{spec.label}</dt>
            <dd className="specValue">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
