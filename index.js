const url = require('url')
const http = require('http')
const path = require('path')
const fs = require('fs')
const slugify = require('slugify')
replaceTemplates=require('./replace-templates')
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)
const slugs = dataObj.map(el=>slugify(el.productName,{lower:true}))
console.log(slugs)

const server = http.createServer(function(req,res){
     const {query,pathname} = url.parse(req.url,true)
       
    //Overview page
    if (pathname =='/overview'|| pathname ==='/') {
        res.writeHead(200,{'content-type':'text/html'})
        const cardsHtml = dataObj.map(el=>replaceTemplates(tempCard,el)).join('')
        const output =tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output)

        res.end(tempOverview)
    //Product Page
    }else if(pathname == '/product'){
        const product = dataObj[query.id]
        const Output = replaceTemplates(tempProduct,product )
        res.end(Output)
    //Api
    }else if(pathname ==='/api'){
        res.writeHead(200,{'content-type':"text/html"})
        res.end(data)
    }
    //Not found
    else{
        res.writeHead(404,{
            'content-Type':'text/html'
        })
        res.end('<h1>Page Not Found</h1>')
    }
})
server.listen(4000,function(){
    console.log('app is running at 3000')
})