import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import "./product-item.styles.scss";

const ProductItem = ({ item }) => {
  const { id, name, price, poster, viewCount } = item;
  //const [clicked, setClicked] = useState(false)

  const useStyles = makeStyles({
    root: {
      padding: "6px",
    },
  });

  const classes = useStyles();
  return (
    <div>
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
                <div className="name">{name}</div>
                <div className="product-info">
                  <span>{`$${price}`}</span>
                  <span>View Count {viewCount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ProductItem;
