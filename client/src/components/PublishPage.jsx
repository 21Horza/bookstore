import {
  Box,
  Card,
  CardMedia,
  TextField,
  Button,
  CardActions,
  CardHeader,
  Typography,
  Container,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import "../styles/PublishPage.css";

const PublishPage = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    image: {},
    published: "",
  });
  const [base64, setBase64] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    setBook({ ...book, image: file });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData();

    console.log("book", book);

    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("image", book.image);
    formData.append("description", book.description);
    formData.append("publish_date:", book.published);
    axios
      .post("/books/create", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        formData,
      })
      .then((res) => {
        console.log(res);
        setStatusCode(res.status);
        setResponseMsg("Published successfully!");
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg(err.response.data.message);
      });
  };

  return (
    <Container>
      <form method="post" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "grid",
            gap: 10,
          }}
          className="info-grid"
        >
          <Card sx={{ position: "relative" }}>
            <CardHeader subheader="preview" />
            <CardMedia
              component="img"
              image={base64 ? base64 : "https://via.placeholder.com/400x300"}
            />
            <CardActions sx={{ position: "absolute", bottom: 0 }}>
              <Button variant="contained" component="label">
                Upload image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              padding: "10px",
            }}
          >
            <Box textAlign="center">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{
                  width: "50%",
                }}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
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
                onChange={(e) =>
                  setBook({ ...book, published: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Author"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
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
                onChange={(e) =>
                  setBook({ ...book, description: e.target.value })
                }
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
                type="submit"
              >
                Publish
              </Button>
            </Box>
            <Typography
              variant="subtitle2"
              color={statusCode === 200 ? green[500] : red[500]}
            >
              {responseMsg}
            </Typography>
          </Card>
        </Box>
      </form>
    </Container>
  );
};

export default PublishPage;
