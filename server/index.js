const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const userRouter = require('./routes/User');
app.use('/auth', userRouter);
const cardRouter = require('./routes/Card');
app.use('/card', cardRouter);



const port = 3001;

db.sequelize.sync().then(() => {
    app.listen(port, () =>{
        console.log('\nserver running on port %d', port);
    });
});