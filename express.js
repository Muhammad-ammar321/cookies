const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))


const port =3010;



const cookieParser=(headers)=>{
    if(!headers.cookie) return {};
    const cookieObj = {}

    const cookiesArr = headers.cookie.split('; ')
    for(let i= 0;i < cookiesArr.length;i++){
        const cookie = cookiesArr[i];
        const cookieArr =  cookie.split('=')
        cookieObj[cookieArr[0]] = cookieArr[1] 
    }
    return cookieObj
    

}

app.use((req,res,next)=>{
    const cookies = cookieParser(req.headers)
    req.cookies = cookies
    
    next()
})
const checkAuth = (req,res,next)=>{
 const {sessionId} = req.cookies 
 if(!sessionId || !sessions[sessionId] ) return res.status(401).send('Unauthorized');
 next()

}




const users = [
    { id: 1, username: 'asd', password: '123' }
    // { id: 2, username: 'bob', password: 'abc' }
  ];

const sessions ={
    
}



app.get('/login',checkAuth,(req,res)=>{
    res.send('>>>> protect your data by yourself, we are not your employ')
})


  
  

app.post('/login',(req,res)=>{
    const us = req.body || {};
    console.log(req.body);
    if(!us.username || !us.password ) return  res.status(422).send('requriment  is not fullfill') 
    // const user = users.find(u=> u.username == username && u.password == password )
    const user = users.find(u => u.username === us.username && u.password === us.password);
    console.log(user);
    if(users.username == us.username || users.password == us.password ) return res.status(401).send('requriment  is not fullfill')
    // if(!user) return res.status(401).send('requriment  is incorrect')
    console.log(user)
    const sessionId = Math.ceil(Math.random() * 10000)
    sessions[sessionId] = user.id;
    res.setHeader('Set-Cookie',`sessionId=${sessionId}; HttpOnly; Path=/dasboard; Max-Age=${60*5}`)
    
  
    res.send({
        message:'login succseful',
        sessionId
  
    })
  
    
})

app.listen(port,(req,res)=>{
    console.log('sever port>>>>>',port)
})
