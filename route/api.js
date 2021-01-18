const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const Todo = require("../model/Todo");

router.post("/saveTodo", multipartMiddleware, async(req,res)=>{
    let todo = new Todo({
        _id: req.body.id,
        title: req.body.title,
        completed: req.body.completed,
        created_at: new Date()
    })
    await todo.save()
    res.end()
})
router.delete("/removeTodo/:id", async(req, res)=>{
    
    await Todo.findByIdAndDelete(req.params.id);
    res.end()

})
router.put("/updateTodo/:id",multipartMiddleware, async (req, res)=>{
    let todo = await Todo.findByIdAndUpdate(req.params.id)
    if(req.body.title){
        todo.title = req.body.title
    }
    if(req.body.completed){
        todo.completed = !todo.completed
    }
    await todo.save()
    res.end()
})
router.get("/getAll", async(req, res)=>{
    let todos = await Todo.find({})
    res.json({todos:JSON.stringify(todos)})
})
router.get("/test", (req, res)=>{
    res.json({name:"hi"})
})
module.exports = router;