const {Router} = require ("express");
const router = Router();
const apiBookCtrl = require("../controller/apiBooks.controler");

router.post("/register", apiBookCtrl.postRegister );
router.post("/login", apiBookCtrl.postLogin);

router.get("/", apiBookCtrl.getStart);

//router.get("/books", booksCtrl.getOneBook);

router.get("/books", apiBookCtrl.getBooks);

router.post("/books", apiBookCtrl.postBook);

router.put("/books", apiBookCtrl.putBook);

router.delete("/books", apiBookCtrl.deleteBook);

module.exports = router;