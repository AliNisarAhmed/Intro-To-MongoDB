const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/intro-to-mongodb');  // mongodb is the PROTOCOL, like http; returns a promise
}

// mongoose.connect('mongodb://localhost/intro-to-mongodb');


const schoolSchema = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{type: String}]
})

schoolSchema.virtual('staffCount')
  .get(function () {  // we use regular function to get correct this binding, do not use arrow func
    // console.log("In virtual");
    return this.staff.length;
  });


// **** MIDDLEWARES *****


// schoolSchema.pre('save', function() {
//   console.log("before save");
// })

schoolSchema.post('save', function(doc, next) {
  setTimeout(() => {
    console.log('post saved', doc);
    next();
  }, 300)
})

const School = mongoose.model('school', schoolSchema);

connect()
  .then(async connection => {

    const schoolConfig = {
      name: 'DOW',
      openSince: 2009,
      students: 1000,
      isGreat: true,
      staff: ['a', 'b', 'c', 'd']
    }

    const mySchool = await School.create(schoolConfig)
    
    console.log(mySchool.staffCount)
  })
  .catch(e => console.log(e))
 