import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import { useEffect, useState } from "react";

import Home from "./components/HomePage";
import PublishPage from "./components/PublishPage";
import InfoPage from "./components/InfoPage";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(user);
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [user]);

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
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info/:id" element={<InfoPage />} />
          <Route path="/publish" element={<PublishPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
