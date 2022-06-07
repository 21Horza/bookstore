import "./App.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#4caf50",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Hello world</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
