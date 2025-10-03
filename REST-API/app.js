const express=require('express')

const app=express();

//now we use the middleware
app.use(express.json());

const books=[
    {
        id:1,
        tittle:"book 1"

    },{
        id:2,
        tittle:"book 2"

    }
]


app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to our Book Store"
    })
})

app.get('/get',(req,res)=>{
    res.json(books);
})



//get a single book 
app.get('/get/:id',(req,res)=>{
    const book=books.find(item=> item.id===parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({
            message:"book not found try different book id"
        })
    }
})

app.post('/add',(req,res)=>{
    const newBook={
        id:books.length+1,
        tittle:`Book ${books.length+1}`
    }

    books.push(newBook);
    res.status(200).json({
        data:newBook,
        message:"New Book Added Successfully"
    })
})


//updating the content 
app.put('/update/:id',(req,res)=>{
    const updateBook=books.find(bookItem=>bookItem.id=== parseInt(req.params.id));
    if(updateBook){
        updateBook.tittle=req.body.tittle||updateBook.tittle;

        res.status(200).json({
            message:`Book with id ${req.params.id} updated successfully`,
            data:updateBook
        })
    }
    else{
        res.status(404).json({
            message:"error updating the book"
        })
    }
})


app.delete('/delete/:id',(req,res)=>{
    const findIndexOfCurrentBook=books.find(item=>item.id=== parseInt(req.params.id));

    if(findIndexOfCurrentBook!=-1){
        const deletedBook=books.splice(findIndexOfCurrentBook,1);

        res.status(200).json({
            message:"Book deleted successfuly",
            data:deletedBook[0]
        })
    }
    else{
        res.status(404).json({
            message:"Error deleting the book"
        })
    }
})



app.listen(3000,()=>{
    console.log("app is running")
})