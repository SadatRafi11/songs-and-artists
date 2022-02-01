import { CardActionArea } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import FetchLyric from "../components/FetchLyric";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MUI Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalPoint]);

  const fetchData = () => {
    fetch(`https://genius.p.rapidapi.com/search?q=${endPoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "genius.p.rapidapi.com",
        "x-rapidapi-key": "8e43afc4a5mshaf142fdbb43bc08p1bcde9jsne05c6bf04a8a",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data.response.hits);
        console.log(data.response.hits);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            For the admirers of music
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Looking for songs and artists?
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              This is a page where you can search for songs and artists
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmitHandler}
              >
                <TextField
                  id="standard-basic"
                  label="Type in here..."
                  variant="standard"
                  value={endPoint}
                  onChange={onChangeHandler}
                />
                <Button type="submit" variant="contained" size="small">
                  Submit
                </Button>
              </Box>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {container.map((card) => (
              <Grid item key={card.result.id} xs={8} sm={6} md={4}>
                <Card
                  onClick={() => {
                    setOpen(true);
                    <FetchLyric
                      path={card.result.primary_artist.api_path}
                      open={open}
                      handleClose={handleClose}
                    />;
                  }}
                  key={card.result.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={card.result.song_art_image_url}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.result.full_title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
