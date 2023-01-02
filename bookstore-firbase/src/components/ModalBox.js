import React, { useState } from 'react';
import { Box, Modal, TextField } from '@mui/material';
import { BookstoreState } from '../BookstoreContex';
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';
import firebaseEngine from '../firebase';
import { makeStyles } from 'tss-react/mui';

const ModalBox = () => {
  
  const [title, setTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClose = setOpen(true);
  const { user } = BookstoreState();

  const { db } = firebaseEngine;
  const userId = user.uid;

  const booksCollectionRef = collection(db, "Books");

  const addNewBook = async () => {
    await addDoc(booksCollectionRef, { bookName: title, author: bookAuthor, genre: genre, currentChapter: currentChapter, TotalChapters: totalChapters, createdAt: serverTimestamp(), createdBy: doc(db, "User", userId)})
    setGenre("");
    setTitle("");
    setTotalChapters("");
    setBookAuthor("")
    setCurrentChapter("")
  }

  const useStyle = makeStyles()(() => ({
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)',
      boxShadow: 24,
      width: 500,
      p: 24
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      width: "100%",
      backgroundColor: "yellow",
      gap: "10px",
      borderRadius: "10px"
    }
  }))

  const { classes } = useStyle();

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Box className={classes.form}>
            <TextField
            label="Add book title"
            value={title}
            onChange={(e) =>{ setTitle( e.target.value)} }
            variant='outlined'
            />
            <TextField
            label="Add book author"
            value={bookAuthor}
            onChange={(e) => { setBookAuthor(e.target.value) }}
            variant='outlined'
            />
            <TextField
            label="Add book genres"
            value={genre}
            onChange={(e) => { setGenre(e.target.value) }}
            variant='outlined'
            />
            <TextField
            label="Add total chapters"
            type="number"
            value={totalChapters}
            onChange={(e) => { setTotalChapters(e.target.value) }}
            variant='outlined'
            />
            <TextField
            label="Add current"
            type="number"
            value={currentChapter}
            onChange={(e) => { setCurrentChapter(e.target.value) }}
            variant='outlined'
            />
            <button onClick={addNewBook}>Add book</button>
          </Box>
        </Box>
      </Modal>
  )
}

export default ModalBox