import React, { useEffect, useState, useMemo } from "react";
import { Paper, Box, Container, styled, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Search from "./UI/Search";
import Select from "./UI/Select";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import BookCard from "./UI/BookCard";
import { Buffer } from "buffer";

const Home = () => {
  // const books = [
  //   {
  //     id: 1,
  //     title: "The Alchemist",
  //     author: "Paulo Coelho",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Alchemist" is a novel by Brazilian author Paulo Coelho. It is the story of Santiago, an Andalusian shepherd',
  //     published: "2006",
  //   },
  //   {
  //     id: 2,
  //     title: "A Game of Thrones",
  //     author: "George R.R. Martin",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"A Game of Thrones" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 3,
  //     title: "Quantum of Solace",
  //     author: "Neal Stephenson",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"Quantum of Solace" is the second novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 4,
  //     title: "The Name of the Wind",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Name of the Wind" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 5,
  //     title: "The Wise",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"The Wise" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  //   {
  //     id: 6,
  //     title: "principles",
  //     author: "Patrick Rothfuss",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
  //     price: "12.99",
  //     rating: 4.5,
  //     description:
  //       '"principles" is the first novel in the series of fantasy novels',
  //     published: "2006",
  //   },
  // ];
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // returns -1
  const sortedBooks = useMemo(() => {
    console.log("selectedSort:", selectedSort);
    if (selectedSort) {
      return [...books].sort((a, b) => {
        console.log("a:", a[selectedSort].localeCompare(b[selectedSort]));
        return a[selectedSort].localeCompare(b[selectedSort]);
      });
    }
    return books;
  }, [selectedSort, books]);

  //
  const sortedAndSearchedBooks = useMemo(() => {
    return sortedBooks.filter((book) =>
      book.title.toLowerCase().includes(searchInput)
    );
  }, [searchInput, sortedBooks]);

  useEffect(() => {
    axiosInstance
      .get("/books/info")
      .then((res) => {
        console.log(res.data);
        // const data = res.data.map(
        //   ({ _id, title, author, publish_date, description, picture }) => {
        //     return {
        //       _id,
        //       title,
        //       author,
        //       publish_date,
        //       description,
        //       picture: btoa(String.fromCharCode(...new Uint8Array(picture))),
        //     };
        //   }
        // );
        setBooks(
          res.data.map((book) => {
            return {
              ...book,
              picture: Buffer.from(book.picture, "base64").toString("base64"),
            };
          })
        );
        // setBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </FormControl>
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        </Box>
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
              {searchInput
                ? sortedAndSearchedBooks.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  ))
                : selectedSort
                ? sortedBooks.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  ))
                : books.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  ))}

              {/* {selectedSort
                ? sortedBooks.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  )) : sortedAndSearchedBooks.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  ))?
                : books.map((item) => (
                    <BookCard key={item._id} item={item} navigate={navigate} />
                  ))} */}
              <Box sx={{ height: "10px" }}></Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
