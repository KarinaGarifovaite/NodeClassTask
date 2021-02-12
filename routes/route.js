const router = require("express").Router();
const autoController = require("./auto/auto-controller")

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// All controller router
// get all obj
router.get('/auto', autoController.getAllObjs)
// save object
router.post("/auto", autoController.createAutoObject)
// get by id
router.get("/auto", autoController.getById)
// delete by id 
router.delete("/auto", autoController.deleteObj)
// update obj
router.patch("/auto", autoController.updateAutoObj)
//filter by rida
router.post("/auto/filter", autoController.filterByRida)

module.exports = router