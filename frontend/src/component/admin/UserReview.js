import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../Store/action/types";
import "./UserReview.css";
import { DataGrid } from "@material-ui/data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  adminGetAllReviews,
  clearErrors,
  adminDeletedAllReviews,
} from "../Store/action/productAction";
import MetaData from "../layout/MetaData";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";

const UserReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, reviews } = useSelector((state) => state.allReviews);
  const { error: DeletedError, isDeleted } = useSelector(
    (state) => state.reviews
  );

  const [productId, setProductId] = useState("");

  const UserReviewDeleteHandler = (id) => {
    // console.log('Reviews id ',id);
    dispatch(adminDeletedAllReviews(id, productId));
  };
  const reviewProductSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("Product id", productId);
    dispatch(adminGetAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(adminGetAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (DeletedError) {
      alert.error(DeletedError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Reviews Deleted Successfully..");
      navigate("/admin/reviews");
      dispatch({ type: Types.ADMIN_ALL_REVIEW_DELETED_RESET });
    }
  }, [dispatch, error, alert, navigate, DeletedError, isDeleted, productId]);
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      editable: true,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 170,
      editable: true,
      flex: 0.7,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      editable: true,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "Action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      editable: false,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                UserReviewDeleteHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  reviews &&
    reviews.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title="Review list -- Admin" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="reviewListContainer">
              <form
                className="reviewSearchForm"
                onSubmit={reviewProductSubmitHandler}
              >
                <h1>Product Reviews</h1>

                <div>
                  <StarIcon />
                  <input
                    type="text"
                    placeholder="Product id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <Button
                  id="searchReviewtBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                >
                  Search
                </Button>
                {/* <input
                  id="createProductBtn"
                  type="submit"
                  value="submit"
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                /> */}
              </form>
              {reviews && reviews.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTables"
                  autoHeight
                />
              ) : (
                <h1 className="noReviews">No Review Found</h1>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserReview;
