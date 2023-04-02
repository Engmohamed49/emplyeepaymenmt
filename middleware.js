const Middleware=((req, res, next)=> {
    let userToken = req.headers['token']
    if(!userToken)return res.status(403).send("You do not have permission to access this");
      next()
  
  });
  
  module.exports =Middleware;