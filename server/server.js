const path = require('path'); //built in module
const express = require('express');

// taip darome, kad butu patogiau nurodyti path i public folderi
const publicPath = path.join(__dirname, '../public');

var app = express();

// kad leistu naudoti public folderi
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on {$port}` );
});


