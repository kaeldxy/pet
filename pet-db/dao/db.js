const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we're connected!");
});

// require("./module/adminUserModule.js");
// require("./module/frontUserModule.js");
// require("./module/movieModule.js");
// require("./module/cinemaModule.js");
// require("./module/theaterModule.js");
// require("./module/scheduleModule.js");
// require("./module/orderModule.js");
