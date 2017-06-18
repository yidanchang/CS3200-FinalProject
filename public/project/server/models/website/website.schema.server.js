module.exports = function (mongoose) {
    // var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectPageModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project_website'});

    module.exports = websiteSchema;
}