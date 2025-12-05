import prisma from '../config/database.js'

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message
      }
    })

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: { id: contact.id }
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    })
  }
}