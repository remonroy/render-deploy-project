import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../Store/action/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
            <h1>Welcome to E-commerce</h1>
            <p>Find Amazing Products Bellow </p>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>

          <div className="container" id="container">
            {products &&
              products.map((products) => (
                <Product key={products._id} product={products} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
