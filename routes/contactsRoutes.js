const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById
} = require("../controllers/contactsControllers");

router.use(validateTokenHandler);
router.route("/get-all").get(getContacts);
router.route('').post(createContact);
router.route("/contact/:id").get(getContactById).put(updateContactById).delete(deleteContactById);

module.exports = router;
