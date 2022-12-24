import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import * as Types from "../Store/action/types";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { clearErrors, adminCreateProduct } from "../Store/action/productAction";
import SideBar from "./SideBar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "laptop",
    "Football",
    "Iphone",
    "IpadPro",
    "SmartPhone",
    "Camera",
  ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product create successfully");
      navigate("/admin/dashboard");
      dispatch({ type: Types.ADMIN_NEW_REVIEW_RESET });
    }
  }, [dispatch, error, alert, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    newForm.set("name", name);
    newForm.set("price", price);
    newForm.set("description", description);
    newForm.set("category", category);
    newForm.set("stock", stock);
    images.forEach((image) => {
      newForm.append("images", image);
    });
    dispatch(adminCreateProduct(newForm));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="createProductContainer">
          <MetaData title="Create product --Admin" />
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            {/* <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button> */}
            <input
              id="createProductBtn"
              type="submit"
              value="submit"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
