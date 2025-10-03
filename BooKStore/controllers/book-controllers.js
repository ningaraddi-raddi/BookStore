
const Book=require('../models/books')

const getAllBooks=async(req,res)=>{
    try {
        const allBooks=await Book.find({});
        if(allBooks?.length>0){
            res.status(200).json({
                success:true,
                message:'All books fetched successfully',
                data:allBooks
            })
        }
        else{
            res.status(404).json({
            success:false,
            message:"No books in the database"
        })
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
        
        
    }

}



const getSingleBookById=async(req,res)=>{

    try {
        //we have to pass the id of the book in the url
    const bookId=req.params.id;
    const findBookById=await Book.findById(bookId);
    if(!findBookById){
        res.status(404).json({
            success:false,
            message:"book with provided id is not found in the database try with different id"
        })
        
    }
    else{
        res.status(200).json({
            success:true,
            message:"book with provided id is fetches successfully",
            data:findBookById
        })
    }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
        
    }


}



const addNewBook=async(req,res)=>{
    try {
        //when the user submit the data in the frontend with tittle,author and the year i get that in the req.body
        const newFormData=req.body;
        console.log("Headers:", req.headers);
        console.log("body",req.body)
        const newlyCreatedBook=await Book.create(newFormData);
        if(newlyCreatedBook){
            res.status(200).json({
                success:true,
                message:"New book added successfully",
                data:newlyCreatedBook

            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
        
        
    }

}


const updateBook=async(req,res)=>{

    try {
        const updateBookFormData=req.body;
        const updateBookId=req.params.id;
        const updatedBook=await Book.findByIdAndUpdate(updateBookId,updateBookFormData,{new:true})


         if(!updatedBook){
        res.status(404).json({
            success:false,
            message:"book with provided id is not found in the database try with different id"
        })
        
    }
    else{
        res.status(200).json({
            success:true,
            message:"book with provided id is fetches successfully",
            data:updatedBook
        })
    }
        
    } catch (error) {
          console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })

        
    }

}



const deleteBook=async(req,res)=>{
    try {
        const toDeleteBookId=req.params.id;
        const bookToDelete=await Book.findByIdAndDelete(toDeleteBookId);
        if(!bookToDelete){
            res.status(404).json({
                success:false,
                message:"book with the id is not found try with different id",

            })
        }
        else{
            res.status(200).json({
                success:true,
                message:"book deleted successfully",
                data:bookToDelete
                
            })
        }
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })

        
    }

}


module.exports={getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook};