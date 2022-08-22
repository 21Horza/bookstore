import React from "react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import axiosInstance from "../utils/axios";

const InfoPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    // axios
    axiosInstance
      .get(`/books/info/${id}`)
      .then((res) => {
        setBook({
          ...res.data,
          publish_date: new Date(res.data.publish_date).toLocaleDateString(),
          picture: Buffer.from(res.data.picture, "base64").toString("base64"),
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
            image={
              id
                ? `data:image/png;base64, ${book.picture}`
                : "https://via.placeholder.com/300x400"
            }
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
                  <TableCell>{book.publish_date}</TableCell>
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
