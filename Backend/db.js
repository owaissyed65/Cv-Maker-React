const mongoose = require('mongoose');
const mongooseUrl = 'mongodb://localhost:27017/mernstack';
const connectToMongo = () => 
{
   mongoose.connect(mongooseUrl,).then(()=>{
    console.log('Connect To MongoDB Compass Successfully');
   }).catch((error)=>console.log('Connection dismiss'))
}
module.exports = connectToMongo
