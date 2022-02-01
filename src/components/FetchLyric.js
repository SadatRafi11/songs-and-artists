import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FetchLyric({ path, open, handleClose }) {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetchArtistSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  const fetchArtistSong = () => {
    fetch(`https://genius.p.rapidapi.com${path}/songs`, {
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
        setSongs(data.response.songs);
        console.log(data.response.songs);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
