const express = require('express');
const path = require('path');
const app = express();

const multer  = require('multer');
const {mergePdfs} = require('./merge');
const upload = multer({ dest: './public/data/uploads/' });
const port = process.env.PORT || 3000;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/index.html'));
})

app.post('/merge', upload.array('pdfs', 2),async(req, res)=> {
  let d = await mergePdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/data/${d}.pdf`);
})

app.use((req, res) => {
  res.status(404).send("<h1>ERROR:Sorry can't find that!</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})