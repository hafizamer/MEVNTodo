const { Router } = require('express')
const TodoModel = require('../../models/TodoModel')

const router= Router()

router.get('/', async (req,res)=>{
    try{
        const todoList= await TodoModel.find()
        if(!todoList) throw new Error('No item')
        const sorted=todoList.sort((a,b)=>{
            return new Date(a.date).getTime()-new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/',async(req, res)=>{
    const newTodo=new TodoModel(req.body)
    try{
        const todoList= await newTodo.save()
        if (!todoList) throw new Error('There is saving error')
        res.status(200).json(todoList)
    } catch(error) {
        res.status(500).json({message: error.message})
    }

})

router.put('/:id', async (req, res)=>{
    const { id } =req.params

    try{
        const response =await TodoModel.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('Updating Error')
        const updated ={...response._doc,...req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: error.message})

    }
})

router.delete('/:id', async(req,res)=>{
    const { id } =req.params
    try{
        const removed = await TodoModel.findByIdAndDelete(id)
        if(!removed) throw new error("Deleting Error")
        res.status(200).json(removed)

    } catch(error){
        res.status(500).json({message: error.message})

    }
})

module.exports= router