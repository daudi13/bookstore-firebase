import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';
import { Box, Button, ButtonGroup, Container, Modal, Pagination, TextField, Typography } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from 'react-hook-form';

const HomePage = () => {

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: {errors} } = useForm();

  const useStyle = makeStyles()((theme) => ({
    App: {
      textAlign: "center",
    },
    bodyWrapper: {
      height: "600px",
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
      [theme.breakpoints.down("md")]: {
        width: "700px",
      },
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        width: "380px",
        flexDirection: "column",
        gap: "20px"
      },
    },
    box: {
      textAlign: "start",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        marginBottom: "40px"
      }
    },
    boxCircle: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }
    },
    boxOne: {
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      width: "180px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      }
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
    },
    deleteBook: {
      border: "1px solid red",
      color: "red",
      "&:hover": {
        backgroundColor: "red",
        color: "white",
        border: "1px solid red"
      },
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "red",
        color: "white",
        border: "1px solid red"
      }
    }
  }))


  const { books } = BookstoreState();
  const { db } = firebaseEngine;

  const user = JSON.parse(localStorage.getItem('user'));

  const userId = user.uid;
  
  const booksCollectionRef = collection(db, "Books");

  const IncreaseChapters = async (id, chapter, totalChapters) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) < +(totalChapters) ? +(chapter) + 1 : totalChapters };
    await updateDoc(booksDoc, newFields);
  }

  const decreaseChapters = async (id, chapter) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) > 0 ? +(chapter) - 1 : 0 };
    await updateDoc(booksDoc, newFields);
  }

  
  const onSubmit = async (data) => {
    handleClose();
    await addDoc(booksCollectionRef, { ...data, createdAt: serverTimestamp(), createdBy: doc(db, "User", userId) })
  }

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "Books", id))
    setPage(1)
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
            label="Book title"
            fullWidth
            variant='filled'
            focused
            {...register("bookName", { required: "Add a Book title" })}
            error={!!errors?.bookName}
            helperText={errors?.bookName ? errors.bookName.message : null}
            />
            <TextField
            label="Book author"
            fullWidth
            variant='filled'
            focused
              {...register("author", { required: "Add Author name" })}
              error={!!errors?.author}
              helperText={errors?.author ? errors.author.message : null}
            />
            <TextField
            label="Book genres"
            fullWidth
            variant='filled'
            focused
            {...register("genre", { required: "Add a Book genre" })}
            error={!!errors?.genre}
            helperText={errors?.genre ? errors.genre.message : null}
            />
            <TextField
            label="total chapters"
            type="number"
            fullWidth
            variant='filled'
            focused
            {...register("TotalChapters", { required: "Add total chapters" })}
            error={!!errors?.TotalChapters}
            helperText={errors?.TotalChapters ? errors.TotalChapters.message : null}
            />
            <TextField
            label="current chapter"
            type="number"
            fullWidth
            variant='filled'
            focused
            {...register("currentChapter", { required: "Add your current chapter" })}
            error={!!errors?.currentChapter}
            helperText={errors?.currentChapter ? errors.currentChapter.message : null}
            />
            <Button variant='contained' type="submit">Add book</Button>
          </form>
        </Box>
      </Modal>
      <Container className={classes.bodyWrapper}>
        {
          books.slice((page - 1) * 3, ((page - 1) * 3) + 3).map((book) => {
            return (
              <Container key={book.id} className={classes.wrapper}>
                <Box className={classes.boxOne}>
                <Typography variant='caption' className={classes.genre}>{book.genre}</Typography>
                <Typography variant='body2' className={classes.title}>{book.bookName}</Typography>
                <Typography variant='caption' className={classes.author}>{book.author}</Typography>
                <Button variant='outlined' className={classes.deleteBook} onClick={() => deleteBook(book.id)}>Delete Book</Button>
                </Box>
                <Box className={classes.boxCircle}>
                  <Box style={{ width: 80, height: 80 }}>
                  <CircularProgressbar value={(Number(book.currentChapter/book.TotalChapters)*100).toFixed(0)} text={`${((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%`} />
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
      </Container>
      {
        books.length > 3 && 
        <Pagination
          count={Math.ceil(+(books.length) / 3) || 0}
          variant="outlined"
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450)
          } }
        />
      }
      {/* <Button variant='contained' onClick={handleOpen}>
        Add Book
      </Button> */}
    </Container>
  );
}

export default HomePage