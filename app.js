const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/af1ddd5f77"

  const options = {
    method: "POST",
    auth: "stavros1:c17630f6e4a41f7bc5a91eb38747fc92-us20"
  }


  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      //console.log(JSON.parse(data));
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.send(__dirname + "/failure.html")
        }
      })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/")
})


app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});


// const api_key = "c17630f6e4a41f7bc5a91eb38747fc92-us20"
// list_id = "af1ddd5f77"
