import { Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import catalogApi from "../../api/catalog-api";

import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import "./product-info.styles.scss";

const ProductInfo = ({ productId }) => {
  const [listComponent, setListComponent] = useState([]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    description: "",
    poster: "",
    images: [],
    productDetails: [],
  });

  const variant = [
    {
      name: "color",
      values: [
        {
          id: 1,
          name: "L",
        },
      ],
    },
  ];

  const { name, price, poster, images, description, productDetails } =
    productInfo;

  const [listImage, setListImage] = useState([]);
  const [index, setIndex] = useState(0);

  const [cartItem, setCartItem] = useState({
    productDetailId: 0,
    amount: 1,
  });

  const [isActive, setIsActive] = useState(false);

  const incrementValue = Number(cartItem.amount) || 1;

  const imgRef = useRef(null);

  const handleTab = (index) => {
    setIndex(index);
    const images = imgRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await catalogApi.getProductById(productId);
        console.log(response);
        setProductInfo(response);
      } catch (error) {
        console.log("Failed to get product: ", error.response);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    setListImage([poster, ...images]);

    let listCompo = [];
    let num = productDetails[0]?.componentDetails.length;
    for (let i = 0; i < num; i++) {
      let a = {
        name: "",
        value: [],
      };
      productDetails.forEach((element) => {
        if (
          !a.value.some((item) => item === element.componentDetails[i]?.value)
        ) {
          a.value.push(element.componentDetails[i]?.value);
        }
        a.name = element.componentDetails[i]?.name;
      });
      listCompo.push(a);
    }
    setListComponent(listCompo);
  }, [productInfo]);

  useEffect(() => {
    if (listImage.length !== 0) {
      imgRef.current.children[index].className = "active";
    }
  }, [listImage]);

  const handleChange = (event) => {
    if (event.target.value > 100) {
      return;
    } else {
      //setAmount(event.target.value);
      setCartItem({ ...cartItem, amount: event.target.value });
    }
  };

  const handleCompo = (event) => {
    setIsActive(!isActive);
    console.log(event);
  };

  const handleAddToCart = () => {
    if (cartItem.productDetailId === 0) {
      alert("Select component ");
    }
    console.log(cartItem);
  };

  console.log(listComponent);

  return (
    <div className="app">
      <div className="details">
        <div className="product-info-image">
          <div className="big-img">
            <img
              src={process.env.REACT_APP_IMAGE_URL + listImage[index]}
              alt="product"
              className="image"
            />
            <div className="thumb" ref={imgRef}>
              {listImage.map((img, index) => (
                <img
                  className="thumb-image"
                  key={index}
                  src={process.env.REACT_APP_IMAGE_URL + img}
                  alt=""
                  onClick={() => handleTab(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="box">
          <div className="row">
            <h2>{name}</h2>
            <div className="product-price">${price}</div>
          </div>
          <div className="component-container">
            {/* <div className="component-title">
              {listCompoName.map((name, index) => (
                <div key={index}>{name}</div>
              ))}
            </div>
            <div>
              {listCompoValue.map((value, index) => (
                <div key={index} className="component-block">
                  {value.map((i, idx) => (
                    <button
                      value={i}
                      key={idx}
                      onClick={handleCompo}
                      className={
                        isActive ? "component-value active" : "component-value"
                      }
                    >
                      {i}
                      {isActive ? (
                        <div className="component-value-icon">
                          <CheckIcon style={{ fontSize: "14px" }} />
                        </div>
                      ) : null}
                    </button>
                  ))}
                </div>
              ))}
            </div> */}
            {listComponent.map((item, index) => (
              <div className="component-item" key={index}>
                <div className="component-name">{item.name}</div>
                <div className="component-values">
                  {item.value.map((value) => (
                    <Button
                      value={value}
                      className={
                        isActive
                          ? "component-value-btn active"
                          : "component-value-btn"
                      }
                      onClick={handleCompo}
                    >
                      {value}
                      {isActive ? (
                        <div className="component-value-icon">
                          <CheckIcon style={{ fontSize: "14px" }} />
                        </div>
                      ) : null}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="item-container">
            <div className="item-title">Amount</div>
            <div className="item">
              <div className="amount-block">
                <button
                  className="amount-button"
                  onClick={() =>
                    setCartItem({ ...cartItem, amount: incrementValue - 1 })
                  }
                >
                  <RemoveIcon />
                </button>
                <input
                  className="amount-button amount-input"
                  type="text"
                  value={incrementValue}
                  onChange={handleChange}
                  onFocus={(event) => event.target.select()}
                />
                <button
                  className="amount-button"
                  onClick={() =>
                    setCartItem({ ...cartItem, amount: incrementValue + 1 })
                  }
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="cart"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-title">PRODUCT DESCRIPTION</div>
        <div className="product-content">{description}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
