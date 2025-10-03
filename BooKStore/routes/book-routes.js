const express=require('express');

const router=express.Router();

const {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook}=require('../controllers/book-controllers')

//create the all routes related to the book
//earlier we used to write in the route as app.get('/',()=>{}) but now we will write the logic in the controllers
router.get('/get',getAllBooks)
router.get('/get/:id',getSingleBookById)
router.post('/add',addNewBook)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)


module.exports=router

