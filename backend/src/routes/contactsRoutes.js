import express from 'express'
import Contact from '../models/Contact.js'
import fileUpload from "express-fileupload"
const router = express.Router()
router.use(fileUpload())

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({})

    res.status(202).json(contacts)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
})

router.get('/:id', async (req, res) => {

  const {id} = req.params

  try {
    const contact = await Contact.findById(id)

    res.status(202).json(contact)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
})

router.post('/', async (req, res) => {
  try {
    const {name, email, phone} = req.body
    const { photo } = req.files;

    if(!name || !email || !phone) return res.status(400).json({message: 'The name, email and phone are required'})

    if (!photo) return res.status(400).json({message: 'The photo is required'})

    photo.mv('./public/upload/' + photo.name)

    const newContact = await Contact.create({ name, email, phone, photo: '/public/upload/' + photo.name })

    res.status(202).json(newContact)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body)

    if(!result) {
      return res.status(404).send({message: 'Contact not founded'})
    }

    return res.status(201).send({message: 'Contact updated'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id)

    if(!result) {
      return res.status(404).send({message: 'Contact not founded'})
    }

    return res.status(201).send({message: 'Contact deleted'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
})

export default router