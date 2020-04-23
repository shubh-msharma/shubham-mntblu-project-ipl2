const express = require('express');
const path = require('path');

const route = require('./routes/routes');

const app = express();

const PORT = process.env.PORT || 3005 ;

app.use(route);

app.use(express.static(path.join(__dirname,"./public")));

app.listen(PORT,()=>{console.log(`server is up on ${PORT}`)});

