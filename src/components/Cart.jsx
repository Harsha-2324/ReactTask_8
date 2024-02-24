import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const [productCount, setProductCount] = useState(
    products.reduce((counts, product) => {
      counts[product.id] = 1; // Default count for each product is 1
      return counts;
    }, {})
  );

  const increaseCount = (productId) => {
    setProductCount((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  const decreaseCount = (productId) => {
    if (productCount[productId] > 1) {
      setProductCount((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    } else {
      // If quantity is 1 or below, remove the product from the cart
      removeProduct(productId);
    }
  };

  const removeProduct = (id) => {
    dispatch(remove(id));
    setProductCount((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id];
      return newCounts;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * productCount[product.id];
    });
    return total;
  };

  const cards = products.map((product) => (
    <div className="card-container-fluid" key={product.id}>
      <div className="card-products">
        <Card style={{ width: "18rem" }} className="cards">
          <Card.Img
            variant="top"
            src={product.images}
            // style={{ width: "250px", height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Current Price: <i class="fa fa-inr"></i>
              {product.price}
            </Card.Text>
            <div className="InDe">
              <div className="price-total">
                <Card.Text className="card-text">
                  Subtotal of product price:<i class="fa fa-inr"></i>{" "}
                  {product.price * productCount[product.id] || product.price}
                </Card.Text>
              </div>
              <div className="price-total">
                <Button
                  variant="dark"
                  className="increament"
                  style={{ borderRadius: "10%" }}
                  onClick={() => decreaseCount(product.id)}
                >
                  -
                </Button>
                <Card.Text className="text">
                  {productCount[product.id] || 1}
                </Card.Text>
                <Button
                  variant="dark"
                  className="increament"
                  style={{ borderRadius: "10%" }}
                  onClick={() => increaseCount(product.id)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              variant="dark"
              className="add mt-1"
              onClick={() => removeProduct(product.id)}
            >
              Remove Item
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  ));

  return (
    <>
      <div className="text-dark">
        <span style={{ fontSize: 30 }}>My Cart</span> <br />
        <span style={{ fontSize: 30 }}>
          Grand Total:<i class="fa fa-inr"></i> {calculateTotalPrice()}
        </span>
        {products.length === 0 && (
          <div class="NoItems1">
            
            <img src="/image/cart.png" alt="Cart Empty image" />
            <p class="text-secondary fs-3 my-5">Shopping Cart is Empty</p>
            <button class="btn1">
              {" "}
              <Link className="text-white" to="/">
                Continue Shopping
              </Link>
            </button>
            <button className="text-white my-4 "class="btn1"> Checkout</button>
          </div>
        )}
        <div className="card-products mb-4">{cards}</div>
      </div>
    </>
  );
};

export default Cart;
