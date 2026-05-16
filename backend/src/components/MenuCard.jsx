import { useState } from "react";

const fallbackImage = new URL("../assets/coffee/latte.jpg", import.meta.url).href;

export default function MenuCard({ name, price, image, description, onAdd }) {
  const [imageSrc, setImageSrc] = useState(image || fallbackImage);

  return (
    <div
      className="card shadow-sm menu-card-clickable"
      role="button"
      tabIndex={0}
      onClick={onAdd}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onAdd();
        }
      }}
    >
      <img
        src={imageSrc}
        alt={name}
        className="card-img-top menu-card-img"
        loading="lazy"
        width={640}
        height={512}
        onError={() => setImageSrc(fallbackImage)}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3 menu-card-title-row">
          <div>
            <h6 className="card-title fw-semibold mb-1">{name}</h6>
            {description ? <p className="small text-muted mb-0">{description}</p> : null}
          </div>
          <span className="fw-semibold" style={{ color: "var(--shop-primary)" }}>
            ${Number(price || 0).toFixed(2)}
          </span>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onAdd();
          }}
          className="btn btn-shop w-100"
        >
          + Add to Order
        </button>
      </div>
    </div>
  );
}
