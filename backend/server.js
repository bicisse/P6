
// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const server = http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     fs.readFile('test.html', function(error, data){
//         if(error){
//             console.log("Error : File Not Found");
//             res.writeHead(404)
//             res.write('Error: File Not Found')
//         } else {
//             console.log('File Found');
//             res.write(data)
//         }
//          res.end()
// })
//     })
   

// server.listen(port, function(error){
//     if(error){
//     console.log('Something went wrong :', error)
//     } else {
//     console.log('Server is listening on port', + port)
//     }
// });