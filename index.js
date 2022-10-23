/*
const express = require('express')
const port = 3002

const app = express()

app.get('/users', (request, response)=>{
    return response.send('ola todo mundo')
})


app.listen(port, ()=>{
    console.log(`🚀 Tudo certo bora bora 😎 ${port}`)
})
*/


const express = require('express')
const uuid = require('uuid')
const cors = require('cors')



const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());


const  users = [];
const checkUserId = (request, response, next) => {
    const { id } = request.params;
   
    const  index = users.findIndex( (user) => user.id === id);

    if( index < 0){
        return response.status(404).json({error: "Not found"});
    }

    request.userIndex = index;
    request.userId = id;
    next();
};


app.get('/users', (request, response) => {
  
    return response.json(users);
});

app.post('/users', (request, response) => {
    const {pedido, nome} = request.body; 
    const user = { id:uuid.v4(), pedido, nome};

    users.push(user);
    return response.status(201).json(user);
});

app.put('/users/:id',checkUserId, (request, response) => {

    const {pedido, nome} = request.body;
    const index = request.userIndex;
    const id = request.userId;
     
    const updatedUser = {id, pedido, nome};


    users[index] = updatedUser;

    return response.json(updatedUser);
});


app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex;


    users.splice(index, 1);

    return response.status(204).json();
});


app.listen(port, () => {

    console.log(`🚀 Tudo certo bora bora meu povo 😎 ${port}`);
}); 
