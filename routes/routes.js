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
    if(parseInt(req.query.year)>2019 || parseInt(req.query.year)<2008){
        res.status(404).send()
    }else{
    getDataYearVise(req.query.year).then(result=>{
        res.json(result)
    }) }
    
})

module.exports = route