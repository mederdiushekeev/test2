import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ACTIONS, JSON_API_PRODUCTS } from "../helpers/consts";

export const productContext = createContext();

export const useProducts = () => {
  return useContext(productContext);
};

const INIT_STATE = {
  products: [],
  productDetails: {},
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };

    case ACTIONS.GET_PRODUCTS_DETAILS:
      return { ...state, productDetails: action.payload };

    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const location = useLocation();

  const navigate = useNavigate();

  // getProducts

  async function getProducts() {
    const { data } = await axios.get(
      `${JSON_API_PRODUCTS}${window.location.search}`
    );

    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: data,
    });
  }

  // addProduct
  const addProduct = async (newProduct) => {
    await axios.post(JSON_API_PRODUCTS, newProduct);
  };

  //deleteProduct
  async function deleteProduct(id) {
    await axios.delete(`${JSON_API_PRODUCTS}/${id}`);
    getProducts();
  }

  // get one product details
  async function getProductDetails(id) {
    let { data } = await axios.get(`${JSON_API_PRODUCTS}/${id}`);
    dispatch({ type: ACTIONS.GET_PRODUCTS_DETAILS, payload: data });
  }

  // patching edited product
  async function editedProduct(id, product) {
    await axios.patch(`${JSON_API_PRODUCTS}/${id}`, product);
    getProducts();
  }

  //=========

  const fetchByParams = async (query, value) => {
    const search = new URLSearchParams(location.search);

    if (value === "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${location.pathname}?${search.toString()}`;
    // console.log(search.toString());
    // console.log(url);
    navigate(url);
  };
  // console.log(location.pathname);

  let values = {
    addProduct,
    getProducts,
    products: state.products,
    deleteProduct,

    fetchByParams,

    getProductDetails,
    productDetails: state.productDetails,

    editedProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
