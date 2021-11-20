import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import "./product-item.styles.scss";

const ProductItem = ({ item }) => {
  const { id, name, price, poster } = item;
  //const [clicked, setClicked] = useState(false)

  const useStyles = makeStyles({
    root: {
      padding: "6px",
    },
  });

  const classes = useStyles();
  return (
    <Link to={"/product/" + id}>
      <Card>
        <CardContent className={classes.root}>
          <div className="product-item">
            <div
              className="image"
              style={{
                backgroundImage: `url(${
                  process.env.REACT_APP_IMAGE_URL + poster
                })`,
              }}
            />
            <div className="product-footer">
              <span className="name">{name}</span>
              <span className="price">{`$${price}`}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
