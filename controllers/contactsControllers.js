const Contact = require("../models/contact");
const asyncHandler = require("express-async-handler");
const {
  NOT_FOUND
} = require("../constants");

//@desc Get all contacts
//@route GET /api/v1/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });

  if (contacts.length === 0) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error("No contacts found");
  }

  res.status(200).json({
    contacts: contacts
  });
});

//@desc Get contact by id
//@route GET /api/v1/contact/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`No contact found for id ${req.params.id}`);
  }

  res.status(200).json({
    contact: contact
  });
});

//@desc Create a new contact
//@route POST /api/v1/contact
//@access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log("Requested body:", req.body);
  const contact = await Contact.create({ user_id: req.user._id, name, email, phone });

  res.status(201).json({
    contact: contact
  });
});

//@desc Update contact by id
//@route PUT /api/v1/contact/:id
//@access public
const updateContactById = asyncHandler(async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      upsert: false
    }
  );

  if (!updatedContact) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`No contact found for id ${req.params.id}`);
  }

  res.status(201).json({
    contact: updatedContact
  });
});

//@desc Delete contact by id
//@route DELETE /api/v1/contact/:id
//@access public
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`No contact found for id ${req.params.id}`);
  }

  res.status(200).json({
    message: `Contact of id ${req.params.id} is deleted`
  });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById
};
