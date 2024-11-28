import React from 'react';

interface Product {
  id: string | number;
  title: string;
  description?: string;
  price: string;
  image: string;
}

interface ProjectItemProps {
  product: Product;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ product }) => {
  return (
    <div className="col max-w-xs" key={product.id}>
      <div className="card h-100 d-flex flex-column">
        <img
          src={product.image}
          className="card-img-top object-contain h-48"
          alt={product.title}
        />
        <div className="card-body flex-grow-1">
          <h5 className="card-title font-bold text-xl">{product.title}</h5>
          <p className="card-text truncate">{product.description}</p>
        </div>
        <div className="card-footer">
          <h1 className="card-price">{product.price} $</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
