import { Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardMedia, TextField, Button } from "@mui/material";
import { useState } from "react";
import "../styles/PublishPage.css";
import { CardActions } from "@mui/material";

const PublishPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    // axios
    //   .get(`http://localhost:5000/books/${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setBook(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setBook({
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
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("image", book.image);
    formData.append("description", book.description);
    axios
      .post("http://localhost:5000/books", {
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   Authorization: `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWNjYmVmZWJiM2Q4MGY1NTI3YjQyOCIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNjU0NDQzMzQxLCJleHAiOjE2NTQ0NTQxNDF9.8T3qTVP4XetFQRkZG32gdqBv9vUpw6Pd9AEpOp2o76E"`,
        // },
        formData,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "grid",
          gap: 10,
        }}
        className="info-grid"
      >
        <Card>
          book cover
          <CardMedia
            component="img"
            image={id ? book.image : "https://via.placeholder.com/300x400"}
          />
          <CardActions>
            <Button>Upload</Button>
          </CardActions>
        </Card>
        <Card
          sx={{
            padding: "10px",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Box textAlign="center">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{
                  width: "50%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
                marginTop: "20px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Author"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                id="standard-textarea"
                label="Description"
                placeholder="write the description here"
                multiline
                variant="filled"
                sx={{
                  width: "100%",
                }}
                rows={12}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "100%",
                }}
                color="secondary"
              >
                Publish
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default PublishPage;
