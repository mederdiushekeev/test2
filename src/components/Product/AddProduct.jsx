import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";

const AddProduct = () => {
  let { addProduct } = useProducts();

  let navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    picture: "",
    type: "",
  });

  function handleInp(e) {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  }
  console.log(product);

  return (
    <Box sx={{ width: "60vw", margin: "10vh auto" }}>
      <Typography
        sx={{ textAlign: "center", color: "blue" }}
        variant="h4"
        element="h4"
      >
        ADMIN PAGE
      </Typography>

      <TextField
        value={product.name}
        sx={{ marginBottom: "1rem" }}
        onChange={handleInp}
        fullWidth
        name="name"
        id="outlined-basic"
        label="name"
        variant="outlined"
      />
      <TextField
        value={product.description}
        sx={{ marginBottom: "1rem" }}
        onChange={handleInp}
        fullWidth
        name="description"
        id="outlined-basic"
        label="description"
        variant="outlined"
      />
      <TextField
        value={product.price}
        sx={{ marginBottom: "1rem" }}
        onChange={handleInp}
        fullWidth
        name="price"
        id="outlined-basic"
        label="price"
        variant="outlined"
      />
      <TextField
        value={product.picture}
        sx={{ marginBottom: "1rem" }}
        onChange={handleInp}
        fullWidth
        name="picture"
        id="outlined-basic"
        label="picture"
        variant="outlined"
      />
      <TextField
        value={product.type}
        sx={{ marginBottom: "1rem" }}
        onChange={handleInp}
        fullWidth
        name="type"
        id="outlined-basic"
        label="type"
        variant="outlined"
      />

      <Button
        onClick={() => {
          addProduct(product);
          setProduct({
            name: "",
            description: "",
            price: 0,
            picture: "",
            type: "",
          });
          navigate("/products");
        }}
        variant="outlined"
        fullWidth
        size="large"
      >
        CREATE PRODUCT
      </Button>
    </Box>
  );
};

export default AddProduct;
