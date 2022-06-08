import React from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardMedia } from "@mui/material";
import { useState } from "react";
import "../styles/InfoPage.css";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Typography } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { Paper } from "@mui/material";

const InfoPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    // axios

    const data = {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      price: "12.99",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus vitae aliquet nec ullamcorper sit. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Purus sit amet luctus venenatis lectus magna fringilla urna. Sed enim ut sem viverra. Condimentum lacinia quis vel eros donec ac odio. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Orci eu lobortis elementum nibh. Leo duis ut diam quam nulla porttitor. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.",
      published: "2006",
    };
    setBook(data);
  }, [id]);
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
          <CardMedia
            component="img"
            image={id ? book.image : "https://via.placeholder.com/300x400"}
          />
        </Card>
        <Card
          sx={{
            padding: "10px",
          }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ maxWidth: "20px" }}>Title</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ maxWidth: "20px" }}>Author</TableCell>
                  <TableCell>{book.author}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ maxWidth: "20px" }}>Published</TableCell>
                  <TableCell>{book.published}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Paper variant="outlined" sx={{ marginTop: "10px" }}>
            <Card sx={{ boxShadow: "none" }}>
              <CardHeader subheader="Description" />
              <CardContent>
                <Typography>{book.description}</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Card>
      </Box>
    </Container>
  );
};

export default InfoPage;
