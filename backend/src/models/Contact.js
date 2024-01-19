import mongoose from 'mongoose'

const Contact = mongoose.model('Contact', new mongoose.Schema({ 
  name: String,
  email: String,
  phone: String,
  photo: String
}));

export default Contact