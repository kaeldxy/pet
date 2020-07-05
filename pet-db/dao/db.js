const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we're connected!");
});

require("./models/adminModel.js");
require("./models/goodModel.js");
require("./models/goodmidModel.js");
require("./models/myseverModel.js");
require("./models/mysevermidModel.js");
require("./models/petModel.js");
require("./models/petmidModel.js");
require("./models/shopModel.js");
require("./models/userModel.js");


