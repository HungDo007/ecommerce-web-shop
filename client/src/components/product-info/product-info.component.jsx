import { Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import catalogApi from "../../api/catalog-api";

import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import "./product-info.styles.scss";

const ProductInfo = ({ productId }) => {
  const [listCompoValue, setListCompoValue] = useState([]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    description: "",
    poster: "",
    images: [],
    productDetails: [],
  });

  const { name, price, poster, images, description, productDetails } =
    productInfo;

  let listCompoName = [["Color"], ["Size"]];

  const [listImage, setListImage] = useState([]);
  const [index, setIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isActive, setIsActive] = useState(-1);
  const incrementValue = Number(amount) || 1;

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
      let a = [];
      //let arr = [];
      productDetails.forEach((element) => {
        if (!a.some((item) => item === element.componentDetails[i]?.value)) {
          a.push(element.componentDetails[i]?.value);
        }
        // arr = a.map((item) => ({
        //   value: item,
        //   id: Math.random().toString(36).substr(2, 9),
        // }));
        //console.log(arr);
      });
      listCompo.push(a);
    }
    setListCompoValue(listCompo);
    //console.log(listCompo);
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
      setAmount(event.target.value);
    }
  };

  const handleSelected = () => {
    console.log("clicked");
    setIsActive();
  };

  console.log(listCompoValue);
  //console.log(productInfo);

  return (
    <div className="app">
      <div className="details">
        <div className="product-info-image">
          <div className="big-img">
            <img
              src={process.env.REACT_APP_IMAGE_URL + listImage[index]}
              alt=""
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
            <div className="component-title">
              {listCompoName.map((name) => (
                <div>{name}</div>
              ))}
            </div>
            <div>
              {listCompoValue.map((value, index) => (
                <div key={index} className="component-block">
                  {value.map((i, idx) => (
                    <button
                      onClick={() => setIsActive(idx)}
                      key={idx}
                      className={
                        isActive === idx
                          ? "component-value active"
                          : "component-value"
                      }
                    >
                      {i}
                      {isActive === idx ? (
                        <div className="component-value-icon">
                          <CheckIcon style={{ fontSize: "14px" }} />
                        </div>
                      ) : null}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="item-container">
            <div className="item-title">Amount</div>
            <div className="item">
              <div className="amount-block">
                <button
                  className="amount-button"
                  onClick={() => setAmount(incrementValue - 1)}
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
                  onClick={() => setAmount(incrementValue + 1)}
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
          <Button variant="contained" color="primary" className="cart">
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
