import { Link } from "react-router-dom";
import "./product-item.styles.scss";

const ProductItem = ({ item }) => {
  const { id, name, price, imageUrl } = item;
  //const [clicked, setClicked] = useState(false)

  return (
    <Link to={"/product/" + id}>
      <div className="product-item">
        <div
          className="image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="product-footer">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
