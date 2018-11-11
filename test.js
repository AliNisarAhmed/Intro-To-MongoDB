const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/intro-to-mongodb');  // mongodb is the PROTOCOL, like http; returns a promise
}

// mongoose.connect('mongodb://localhost/intro-to-mongodb');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  faveFoods: [{ type: String }],
  info: {
    school: {
      type: String
    },
    shoesize: {
      type: Number
    }
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'school'  // this is the model name
  }
});

const schoolSchema = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{type: String}]
})

const School = mongoose.model('school', schoolSchema);
const Student = mongoose.model('student', studentSchema);

connect()
  .then(async connection => {

    const schoolConfig = {
      name: 'DOW',
      openSince: 2009,
      students: 1000,
      isGreat: true,
      staff: ['a', 'b', 'c']
    }
    const schoolConfig2 = {
      name: 'NED',
      openSince: 1987,
      students: 10000,
      isGreat: true,
      staff: ['x', 'b', 'z']
    }

    const schools = await School.create([ schoolConfig, schoolConfig2])
    const match = await School.find({
      staff: 'b'
    }).exec();

    // const school2 = await School.findOneAndUpdate(
    //   {name: 'AKUH'}, 
    //   {name: 'AKUH'}, 
    //   {upsert: true, new: true}
    // ).exec();

    console.log(match)
  })
  .catch(e => console.log(e))
 