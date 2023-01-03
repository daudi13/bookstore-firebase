import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';
import { Box, Button, ButtonGroup, Container, Modal, TextField, Typography } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from 'react-hook-form';

const HomePage = () => {

  const [open, setOpen] = useState(false);
  const {register, handleSubmit} = useForm();

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center"
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "10px",
      width: "1150px",
      margin: "20px auto",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.23)",
    },
    box: {
      textAlign: "start",
    },
    boxOne: {
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      width: "180px"
    },
    genre: {
      fontFamily: "Montserrat",
      color: "#3D3D3D",
      fontWeight: "bold",
      fontSize: "15px"
    },
    title: {
      fontFamily: "Montserrat",
      fontWeight: "bolder",
      color: "#1aa7ec",
      fontSize: "18px",
    },
    author: {
      fontFamily: "Montserrat",
      fontSize: "16px",
    },
    chapterTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bolder",
      fontSize: "18px",
    },
    chapter: {

    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)',
      boxShadow: 24,
      width: 500,
      p: 24
    },
    titleName: {
      fontFamily: "Montserrat",
      fontWeight: "700",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      width: "100%",
      backgroundColor: "white",
      gap: "10px",
      borderRadius: "10px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.23)",
    }
  }))


  const { books, user } = BookstoreState();
  const { db } = firebaseEngine;

  const userId = user.uid;
  
  const booksCollectionRef = collection(db, "Books");

  const IncreaseChapters = async (id, chapter, totalChapters) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) < totalChapters ? +(chapter) + 1 : totalChapters };
    await updateDoc(booksDoc, newFields);
  }

  const decreaseChapters = async (id, chapter) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) > 0 ? +(chapter) - 1 : 0 };
    await updateDoc(booksDoc, newFields);
  }

  
  const onSubmit = async (data) => {
    await addDoc(booksCollectionRef, { ...data, createdAt: serverTimestamp(), createdBy: doc(db, "User", userId)})
  }

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "Books", id))
  }

  const { classes } = useStyle();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container className={classes.App}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h6' className='titleName'>Add New Book</Typography>
            <TextField
            label="Add book title"
            fullWidth
            variant='filled'
            focused
            {...register("bookName", {required: "Required"})}
            />
            <TextField
            label="Add book author"
            fullWidth
            variant='filled'
            focused
            {...register("bookAuthor", {required: "Required"})}
            />
            <TextField
            label="Add book genres"
            fullWidth
            variant='filled'
            focused
            {...register("genre", {required: "Required"})}
            />
            <TextField
            label="Add total chapters"
            type="number"
            fullWidth
            variant='filled'
            focused
            {...register("totalChapters", {required: "Required"})}
            />
            <TextField
            label="Add current chapter"
            type="number"
            fullWidth
            variant='filled'
            focused
            {...register("currentChapter", {required: "Required"})}
            />
            <Button variant='contained' type="submit">Add book</Button>
          </form>
        </Box>
      </Modal>
      {
        books.map((book) => {
          return (
            <Container key={book.id} className={classes.wrapper}>
              <Box className={classes.boxOne}>
              <Typography variant='caption' className={classes.genre}>{book.genre}</Typography>
              <Typography variant='body2' className={classes.title}>{book.bookName}</Typography>
              <Typography variant='caption' className={classes.author}>{book.author}</Typography>
              <Button variant='outlined' onClick={() => deleteBook(book.id)}>Delete Book</Button>
              </Box>
              <Box className={classes.box}>
                <Box style={{ width: 80, height: 80 }}>
                <CircularProgressbar value={((book.currentChapter/book.TotalChapters)*100).toFixed(0)} text={`${((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%`} />
                </Box>
              </Box>
              <Box className={classes.box}>
              <Typography variant='caption' className={classes.chapterTitle}>Current Chapter</Typography>
              <Typography variant='body1' className={classes.chapter}>Chapter{book.currentChapter}</Typography>
              <ButtonGroup
              disableElevation
              variant='contained'
              aria-label="Disabled elevation buttons"
              >
              <Button onClick={() => IncreaseChapters(book.id, book.currentChapter, book.TotalChapters)}>+</Button>
              <Button onClick={() => decreaseChapters(book.id, book.currentChapter)}>-</Button>
              </ButtonGroup>
              </Box>
            </Container>
            
          )
        })
      }
      <Button variant='contained' onClick={handleOpen}>
        Add Book
      </Button>
    </Container>
  );
}

export default HomePage