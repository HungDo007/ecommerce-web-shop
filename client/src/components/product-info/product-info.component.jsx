import { useEffect, useRef, useState } from "react";

import "./product-info.styles.css";

const ProductInfo = ({ productId }) => {
  console.log(productId);
  const product = {
    _id: "1",
    title:
      "Giày 𝐍𝐈𝐊𝐄 Thể Thao Nam Nữ Đẹp Màu Trắng Giày Sneaker Trắng HotTrends_SN001",
    src: [
      "https://shopgiayreplica.com/wp-content/uploads/2019/11/nike-air-force-1-shadow-replica.jpg",
      "https://rubystore.com.vn/wp-content/uploads/2020/07/giay-nike-air-jordan-1-high-x-dior-sieu-cap.jpg",
      "https://hanghieuvip.net/wp-content/uploads/2021/03/Nike-Air-Force-1-Shadow-Aura-Green-88.jpg",
      "https://lakbay.vn/cdn/images/Nike/Nike%20n%E1%BB%AF/giay-nike-air-force-1-high-utility.jpg",
    ],
    description: "UI/UX designing, html css tutorials",
    content:
      "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
    price: 2000000003,
    colors: ["red", "black", "white", "teal"],
    size: ["36", "37", "38", "39", "40", "41", "42", "43"],
    count: 1,

    anotherClassify: [
      {
        name: "color",
        class1: [
          {
            value: "red",
          },
          {
            value: "blue",
          },
          {
            value: "green",
          },
        ],
      },
      {
        name: "size",
        class2: [
          {
            value: "S",
          },
          {
            value: "M",
          },
          {
            value: "L",
          },
        ],
      },
    ],

    classify: [
      {
        nameClass1: "color",
        nameClass2: "size",
        class1: [
          {
            value: "red",
            class2: [
              {
                value: "S",
                price: 1000,
                stock: 50,
              },
              {
                value: "M",
                price: 50000,
                stock: 10,
              },
              {
                value: "L",
                price: 100000,
                stock: 25,
              },
            ],
          },
          {
            value: "blue",
            class2: [
              {
                value: "S",
                price: 1000,
                stock: 50,
              },
              {
                value: "M",
                price: 50000,
                stock: 10,
              },
              {
                value: "L",
                price: 100000,
                stock: 25,
              },
            ],
          },
          {
            value: "green",
            class2: [
              {
                value: "S",
                price: 1000,
                stock: 50,
              },
              {
                value: "M",
                price: 50000,
                stock: 10,
              },
              {
                value: "L",
                price: 100000,
                stock: 25,
              },
            ],
          },
        ],
      },
    ],
  };

  const [index, setIndex] = useState(0);

  const myRef = useRef(null);
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  useEffect(() => {
    myRef.current.children[index].className = "active";
  }, []);

  return (
    <div className="app">
      <div className="details">
        <div className="big-img">
          <img src={product.src[index]} alt="" />
          <div className="thumb" ref={myRef}>
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
