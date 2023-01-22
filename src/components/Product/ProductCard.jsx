import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../contexts/CartContextProvider";
import "./styles.css";
import { useAuth } from "../../contexts/AuthContextProvider";
import { ADMIN } from "../../helpers/consts";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProducts();
  const { addProductToCart, checkProductInCart } = useCart();

  let navigate = useNavigate();

  const {
    user: { email },
  } = useAuth();

  return (
    <Card
      className="product-card"
      sx={{
        width: "300px",
        margin: "0rem 1rem",
        // opacity: "0.8",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={item.picture}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <br />
        <Typography
          sx={{ fontWeight: "700", fontSize: "2rem", color: "blue" }}
          variant="body2"
          color="text.secondary"
        >
          {item.price}$
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          {item.type}
        </Typography>
      </CardContent>

      <CardActions>
        {email === ADMIN ? (
          <>
            <Button
              variant="outlined"
              onClick={() => navigate(`/edit/${item.id}`)}
              sx={{ color: "blueviolet", fontWeight: "600" }}
            >
              edit
            </Button>

            <Button
              variant="outlined"
              sx={{ color: "pink", fontWeight: "600" }}
              onClick={() => deleteProduct(item.id)}
            >
              delete
            </Button>
          </>
        ) : (
          <IconButton onClick={() => addProductToCart(item)}>
            <ShoppingCartIcon
              sx={{ width: "2rem", height: "2rem" }}
              color={checkProductInCart(item.id) ? "primary" : ""}
            />
          </IconButton>
        )}

        <Button variant="outlined" sx={{ color: "aqua", fontWeight: "600" }}>
          details
        </Button>
      </CardActions>
    </Card>
  );
}
