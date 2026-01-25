import './TitlePrice.css';

export const TitlePrice = ({
  name,
  basePrice,
}: {
  name: string;
  basePrice: number;
}) => {
  return (
    <div className="title-price-container">
      <h1 className="title-price-title">{name}</h1>
      <p
        className="title-price-price"
        aria-label={`Precio: ${basePrice} euros`}
      >
        {basePrice} EUR
      </p>
    </div>
  );
};
