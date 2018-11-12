const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/intro-to-mongodb');  // mongodb is the PROTOCOL, like http; returns a promise
}

// mongoose.connect('mongodb://localhost/intro-to-mongodb');


const schoolSchema = new mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'district',
  },
  name: {
    type: String,
    unique: true
  },
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{type: String}]
})

const districtSchema = new mongoose.Schema({
  name: String,
})

// **** COMPOUND INDEX ****

schoolSchema.index({
  district: 1,  // These two lines mean name is going to be unique under district, we first "index" by district, then under district we make name true;
  name: 1,
}, { unique: true })

const School = mongoose.model('school', schoolSchema);
const District = mongoose.model('district', districtSchema);

connect()
  .then(async connection => {

    const districtConfig = {
      name: "East"
    }
    const myDistrict = await District.create(districtConfig);

    const schoolConfig = {
      district: myDistrict.id,
      name: 'DOW',
      openSince: 2009,
      students: 1000,
      isGreat: true,
      staff: ['a', 'b', 'c', 'd']
    }

    const mySchool = await School.create(schoolConfig);

    console.log(mySchool);
    
  })
  .catch(e => console.log(e))
 