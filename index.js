const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const { PORT = 8000 } = process.env;
// app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/', function (req, res) {
  res.send('ok');
});

app.use('/view', express.static(path.join(__dirname,'images')));

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  const file = req.files[[Object.keys(req.files)[0]]];

  if (file.size > 1024 * 1024) {
    // 1 MB
    return res.status(400).send('1MB file is allowed.');
  }
  const uploadPath = path.join(__dirname + '/images') + '/' + file.name;

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
