import { Box, Grid, Pagination } from "@mui/material";
// import { hover } from "@testing-library/user-event/dist/hover";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { getProducts, products } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
    setPage(1);
  }, [searchParams]);

  //pagination

  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  const count = Math.ceil(products.length / itemsPerPage);

  const handleChange = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return products.slice(begin, end);
  }

  return (
    <>
      <Grid item md={9}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: "4rem",
          }}
        >
          {currentData().map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Box>
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          onChange={handleChange}
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </>
  );
};

export default ProductList;
