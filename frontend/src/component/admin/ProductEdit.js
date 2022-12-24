import React, { Fragment, useEffect, useState } from "react";
import "./ProductEdit.css";
import * as Types from "../Store/action/types";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  clearErrors,
  adminEditProduct,
  getProductDetails,
} from "../Store/action/productAction";
import SideBar from "./SideBar";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    loading,
    error: isEditError,
    isEdit,
  } = useSelector((state) => state.isDeleted);
  const { error, product } = useSelector((state) => state.productDetail);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isEditError) {
      alert.error(isEditError);
      dispatch(clearErrors());
    }
    if (isEdit) {
      alert.success("Product Edit successfully");
      navigate("/admin/products");
      dispatch({ type: Types.ADMIN_PRODUCT_EDIT_RESET });
    }
  }, [dispatch, isEditError, alert, error, navigate, isEdit, product, id]);

  const editProductSubmitHandler = (e) => {
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
    dispatch(adminEditProduct(id, newForm));
  };
  const editProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={editProductSubmitHandler}
          >
            <h1>Edit Product</h1>

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
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                value={stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={editProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Product Preview" />
              ))}
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

export default ProductEdit;
