import { useEffect, useRef, useState } from "react";

import "./product-info.styles.css";

const ProductInfo = ({ productId }) => {
  //console.log(productId);
  const product = {
    _id: "1",
    title:
      "Giày 𝐍𝐈𝐊𝐄 Thể Thao Nam Nữ Đẹp Màu Trắng Giày Sneaker Trắng HotTrends_SN001",
    src: [
      "https://shopgiayreplica.com/wp-content/uploads/2019/11/nike-air-force-1-shadow-replica.jpg",
      "https://rubystore.com.vn/wp-content/uploads/2020/07/giay-nike-air-jordan-1-high-x-dior-sieu-cap.jpg",
      "https://hanghieuvip.net/wp-content/uploads/2021/03/Nike-Air-Force-1-Shadow-Aura-Green-88.jpg",
      "https://lakbay.vn/cdn/images/Nike/Nike%20n%E1%BB%AF/giay-nike-air-force-1-high-utility.jpg",
      "http://hystore.vn/wp-content/uploads/2020/11/xam-1.jpg",
    ],
    description: "UI/UX designing, html css tutorials",
    content:
      "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
    price: 2000000003,
    colors: ["red", "black", "white", "teal"],
    size: ["36", "37", "38", "39", "40", "41", "42", "43"],
    count: 1,

    productDetails: [
      {
        id: 1,
        stock: 10,
        price: 100000,
        componentDetails: [
          {
            id: 1,
            value: "40",
          },
          {
            id: 2,
            value: "Red",
          },
        ],
      },
      {
        id: 2,
        stock: 15,
        price: 100000,
        componentDetails: [
          {
            id: 3,
            value: "41",
          },
          {
            id: 4,
            value: "White",
          },
        ],
      },
    ],
  };

  const [index, setIndex] = useState(0);

  const imgRef = useRef(null);

  const handleTab = (index) => {
    setIndex(index);
    const images = imgRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
    console.log(imgRef.current.children);
  };

  useEffect(() => {
    imgRef.current.children[index].className = "active";
  }, []);

  return (
    <div className="app">
      <div className="details">
        <div>
          <div className="big-img">
            <img src={product.src[index]} alt="" />
            <div className="thumb" ref={imgRef}>
              {product.src.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => handleTab(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="box">
          <div className="row">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
          </div>
          <div className="colors">
            <div className="color-title">Color</div>
            <div className="color-items">
              {product.colors.map((color, index) => (
                <button key={index}>{color}</button>
              ))}
            </div>
          </div>
          <div className="colors">
            <div className="color-title">Size</div>
            <div className="color-items">
              {product.size.map((size, index) => (
                <button key={index}>{size}</button>
              ))}
            </div>
          </div>
          <p>{product.description}</p>
          <p>{product.content}</p>

          <button className="cart">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
