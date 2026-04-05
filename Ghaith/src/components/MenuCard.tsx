interface MenuCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onAdd: () => void;
}

const MenuCard = ({ name, price, description, image, onAdd }: MenuCardProps) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image}
        alt={name}
        className="card-img-top menu-card-img"
        loading="lazy"
        width={640}
        height={512}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="card-title fw-semibold mb-0">{name}</h6>
          <span className="fw-semibold" style={{ color: 'var(--shop-primary)' }}>${price.toFixed(2)}</span>
        </div>
        <p className="card-text text-muted small mb-3">{description}</p>
        <button onClick={onAdd} className="btn btn-shop w-100 mt-auto">
          + Add to Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
