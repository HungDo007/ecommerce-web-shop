import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import Notification from "../notification/notification.component";

import catalogApi from "../../api/catalog-api";
import salesApi from "../../api/sales.api";

import "./product-info.styles.scss";
import { useDispatch } from "react-redux";
import { toggleNotification } from "../../redux/modal/modal.actions";

const ProductInfo = ({ productId }) => {
  const [listComponent, setListComponent] = useState([]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    description: "",
    poster: "",
    viewCount: 0,
    images: [],
    productDetails: [],
  });

  const {
    name,
    price,
    poster,
    images,
    viewCount,
    description,
    productDetails,
  } = productInfo;

  const [listImage, setListImage] = useState([]);

  const [index, setIndex] = useState(0);

  const [cartItem, setCartItem] = useState({
    productDetailId: 0,
    amount: 1,
  });

  const [selected, setSelected] = useState([]);

  const [availableItem, setAvailableItem] = useState({
    price: 0,
    stock: 0,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const history = useHistory();

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
        setProductInfo(response);
        await catalogApi.addViewCount(productId);
      } catch (error) {
        console.log("Failed to get product: ", error.response);
      }
    };
    getProduct();
  }, [productId]);

  //set list image for product and change productDetail to array
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
          !a.value.some(
            (item) => item?.name === element.componentDetails[i]?.value
          )
        ) {
          const value = {
            id: element.componentDetails[i]?.id,
            name: element.componentDetails[i]?.value,
          };
          a.value.push(value);
        }
        a.name = element.componentDetails[i]?.name;
      });
      listCompo.push(a);
    }
    let stock = productDetails.reduce(
      (accumulateAmount, item) => accumulateAmount + item.stock,
      0
    );
    setAvailableItem({ price: price, stock });
    setListComponent(listCompo);

    if (productDetails[0]?.componentDetails.length === 0) {
      setCartItem({ ...cartItem, productDetailId: productDetails[0].id });
    }
  }, [productInfo]);

  //add class for thumb image when selected
  useEffect(() => {
    if (listImage.length !== 0) {
      imgRef.current.children[index].className = "active";
    }
  }, [listImage, index]);

  useEffect(() => {
    if (selected.length === productDetails[0]?.componentDetails.length) {
      let a = productDetails.map((item) => {
        let obj = [];
        item.componentDetails.forEach((element) => {
          obj.push(element.id);
        });
        return obj;
      });

      let b = [];
      selected.forEach((element) => {
        b.push(element.id);
      });

      let productDetailId = undefined;
      let price = 100;
      let stock = 0;

      a.forEach((element, idx) => {
        if (element.every((item) => b.includes(item))) {
          productDetailId = productDetails[idx].id;
          price = productDetails[idx].price;
          stock = productDetails[idx].stock;
        }
      });

      setCartItem({ amount: 1, productDetailId });

      setAvailableItem({ price, stock });
    }
  }, [selected, productDetails]);

  const handleChange = (event) => {
    if (event.target.value > availableItem.stock) {
      setCartItem({ ...cartItem, amount: availableItem.stock });
    } else {
      setCartItem({ ...cartItem, amount: event.target.value });
    }
  };

  const handleCompo = (id, idx) => {
    const item = {
      id: id,
      index: idx,
    };

    if (selected.length === 0) {
      setSelected([...selected, item]);
    } else {
      if (selected.some((item) => item.index === idx)) {
        let arr = selected.filter((item) => item.index !== idx);
        arr.push(item);
        setSelected(arr);
      } else {
        setSelected([...selected, item]);
      }
      // if (selected.some((item) => item.id === id)) {
      //   setSelected(selected.filter((item) => item.id !== id));
      // }
    }
  };

  const handleAddToCart = () => {
    if (currentUser) {
      if (cartItem.productDetailId === 0) {
        setNotify({
          isOpen: true,
          message: "Please select component!",
          type: "warning",
        });
      } else if (cartItem.amount > availableItem.stock) {
        setNotify({
          isOpen: true,
          message: "The amount must smaller than available product!",
          type: "warning",
        });
      } else {
        // let amount = 1;
        // console.log(amount);
        const payload = {
          productDetailId: cartItem.productDetailId,
          quantity: cartItem.amount,
        };
        if (cartItem.amount === "") {
          payload.quantity = 1;
        }
        const addToCart = async () => {
          try {
            const response = await salesApi.addToCart(payload);
            if (response.status === 200 && response.statusText === "OK") {
              setNotify({
                isOpen: true,
                message: "Add to cart successfully!",
                type: "success",
              });
              dispatch(toggleNotification());
            }
          } catch (error) {
            console.log("Failed to add product to cart", error.response);
          }
        };
        addToCart();
        //console.log(payload);
      }
    } else {
      history.push("/signin");
    }
  };

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
                  alt="product"
                  onClick={() => handleTab(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="box">
          <div className="row">
            <h2>{name}</h2>
            <div className="product-info-view-count">
              {viewCount} View Count
            </div>
            <div className="product-price">${availableItem.price}</div>
          </div>
          <div className="component-container">
            {listComponent.map((item, index) => (
              <div className="component-item" key={index}>
                <div className="component-name">{item.name}</div>
                <div className="component-values">
                  {item.value.map((value) => (
                    <Button
                      key={value.id}
                      className={
                        selected.map((item) => item.id).includes(value.id)
                          ? "component-value-btn selected"
                          : "component-value-btn"
                      }
                      onClick={() => handleCompo(value.id, index)}
                    >
                      {value.name}
                      {selected.map((item) => item.id).includes(value.id) ? (
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
                    setCartItem({
                      ...cartItem,
                      amount:
                        cartItem.amount < availableItem.stock
                          ? incrementValue + 1
                          : availableItem.stock,
                    })
                  }
                >
                  <AddIcon />
                </button>
              </div>
            </div>
            <div>{availableItem.stock} available</div>
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={
              availableItem.stock === 0 || cartItem.productDetailId === 0
                ? true
                : false
            }
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
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ProductInfo;
