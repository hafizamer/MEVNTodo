const { Schema, model }=require('mongoose')

const TodoSchema= new Schema(
    {
        description:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            default: Date.now,
        },
    }
)

const TodoModel = model('Todo', TodoSchema)

module.exports=TodoModel;