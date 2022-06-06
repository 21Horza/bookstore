import "./App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<div>Hello world</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
