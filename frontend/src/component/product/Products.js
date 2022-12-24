import React,{Fragment, useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { clearErrors, getProduct } from '../Store/action/productAction';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard';
import './Products.css'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData'

    const categories=[
        "laptop",
        "Football",
        "Iphone",
        "IpadPro",
        "SmartPhone",
        "Camera",
    ]


const Products = () => {
    const alert = useAlert()
    const {keyword}=useParams()
    const dispatch = useDispatch()
    const {loading,error,products,productsCount,resultPerPage} = useSelector(state => state.products)
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,25000])
    const [category,setCategory] = useState("")
    const [ratings,setRatings] = useState(0)

    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)
    }

    // Price range
    

    const priceHandler =(event,newPrice)=>{
        setPrice(newPrice)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings))

    }, [dispatch,error,alert,keyword,currentPage,price,category,ratings])

    

    return (
        <Fragment>
           {
               loading ? ( <Loader />) :
               (<Fragment>
                   <MetaData title="products E-commerce" />
                    <h2 className="productsHeading"> Products</h2>
                  <div className="products">
                    {
                       products.map(product => <ProductCard key ={product._id} product ={product} />)
                    }
                  </div>

                    <div className="filterPrice">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            main={0}
                            max={25000}
                        />
                        <Typography>Category</Typography>
                        <ul className="categoryBox">
                            {
                                categories.map((category)=>(
                                <li
                                    className="categoryLink"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                                ))
                            }
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                            value={ratings}
                            onChange={(e,newRating)=>setRatings(newRating)}
                            valueLabelDisplay="auto"
                            aria-labelledby="continous-slider"
                            main={0}
                            max={5}
                        />
                        </fieldset>
                    </div>


                    {
                      resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="next"
                            prevPageText="prev"
                            firstPageText="1st"
                            lastPageText="last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                            />
                        </div>
                      )
                    }
                </Fragment>)
           }
        </Fragment>
    );
};

export default Products;