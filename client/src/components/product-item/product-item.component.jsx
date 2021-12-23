import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/format-money";
import { cut } from "../../utils/cut-string";

import "./product-item.styles.scss";

const ProductItem = ({ item }) => {
  const { id, name, price, poster, viewCount } = item;

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
                <div className="name">{cut(name, 24)}</div>
                <div className="product-info">
                  <span>{`$${formatMoney(price)}`}</span>
                  <span>{`View Count ${viewCount}`}</span>
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
