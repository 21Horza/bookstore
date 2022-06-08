import React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import { CardActions } from "@mui/material";
import { Container } from "@mui/material";
import { styled } from "@mui/material";
import { Grid } from "@mui/material";
import Search from "./UI/Search";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"The Alchemist" is a novel by Brazilian author Paulo Coelho. It is the story of Santiago, an Andalusian shepherd',
      published: "2006",
    },
    {
      id: 2,
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"A Game of Thrones" is the first novel in the series of fantasy novels',
      published: "2006",
    },
    {
      id: 3,
      title: "Quantum of Solace",
      author: "Neal Stephenson",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"Quantum of Solace" is the second novel in the series of fantasy novels',
      published: "2006",
    },
    {
      id: 4,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"The Name of the Wind" is the first novel in the series of fantasy novels',
      published: "2006",
    },
    {
      id: 5,
      title: "The Wise",
      author: "Patrick Rothfuss",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"The Wise" is the first novel in the series of fantasy novels',
      published: "2006",
    },
    {
      id: 6,
      title: "principles",
      author: "Patrick Rothfuss",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        '"principles" is the first novel in the series of fantasy novels',
      published: "2006",
    },
  ];
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "10px",
      }}
    >
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <Button
          sx={{
            backgroundColor: "dodgerblue",
            color: "white",
          }}
          id="sort"
        >
          Sort by
        </Button>
        <Search />
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Item
            sx={{
              height: "100vh",
              width: "100%",
              backgroundColor: "transparent",
              backgroundImage: "none",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 5,
              }}
              className="gallery-grid"
            >
              {books.map((item) => (
                <Card className="gallery-card">
                  <Box
                    className="gallery-card-media"
                    onClick={() => navigate(`/info/${item.id}`)}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt="Paella dish"
                    />
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => navigate(`/info/${item.id}`)}
                    >
                      More info
                    </Button>
                  </CardActions>
                </Card>
              ))}
              <Box sx={{ height: "10px" }}></Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
