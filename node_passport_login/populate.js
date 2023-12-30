var mongoose = require("mongoose");
var assert = require("assert");

mongoose.connect(
  "mongodb+srv://admin:admin@project-lvdff.mongodb.net/test?retryWrites=true&w=majority"
);

var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  aadhar: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  private_string: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

// Now, the interesting part:
data = [
  {
    email: "amoghm14@gmail.com",
    aadhar: "1111",
    private_string:
      "9e4cf430cd659b54ef1681617ab09151f32013cecdb10e598ea73d8a18587004"
  },
  {
    email: "nirmalkuttappa@gmail.com",
    aadhar: "2222",
    private_string:
      "c226fbe52c342d0a7fbeb15a081962a7dab64cda38b9660ae91982026b41cf15"
  }
];

for (let i = 0; i < data.length; i++) {
  User.findOne({
    email: data[i]["email"]
  }).then(user => {
    if (!user) {
      User.collection.insertOne(data[i]);
    }
  });
}
