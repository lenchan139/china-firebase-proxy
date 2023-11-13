var http = require("http");
var proxyFirebaseConfig = require("./proxy-firebase-config");

const html = `
<!DOCTYPE html>
  <head><title>china firebase proxy client</title></head>
  <body>
    <script type="text/javascript">
      fetch('https://o9r2lz1n69.sse.codesandbox.io:8118')
        .then(res => {
          console.log(res)
        })
    </script>
  </body>
</html>
`

  http
    .createServer(function(req, res) {
      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write(html);  
      res.end(); // end the response
    })
    .listen(8080); //the server object listens on port 8080
