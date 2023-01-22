import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  TextField,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";

const SideBar = () => {
  const { fetchByParams } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  return (
    <Grid item md={3}>
      <Paper elevation={5} sx={{ p: 2 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="search..."
          variant="standard"
        />
        <Grid>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="all"
              name="radio-buttons-group"
              onChange={(e) => fetchByParams("type", e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="telephone"
                control={<Radio />}
                label="Telephone"
              />
              <FormControlLabel
                value="laptop"
                control={<Radio />}
                label="Laptop"
              />
              <FormControlLabel
                value="watch"
                control={<Radio />}
                label="Watch"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => fetchByParams("price_lte", e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="100"
              control={<Radio />}
              label="Less than 100$"
            />
            <FormControlLabel
              value="250"
              control={<Radio />}
              label="Less than 250$"
            />
            <FormControlLabel
              value="500"
              control={<Radio />}
              label="Less than 500$"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default SideBar;
