const express = require('express');
const getData = require('../utility/collectData');
const getDataYearVise = require('../utility/collectDatYearVise')

const route = express.Router();

route.get('/getStaticData',(req,res)=>{

    getData().then(result=>{
        res.send(result)
    })
})

route.post('/getdata',(req,res)=>{
    getDataYearVise(req.query.year).then(result=>{
        res.json(result)
    }) 
    
})

module.exports = route