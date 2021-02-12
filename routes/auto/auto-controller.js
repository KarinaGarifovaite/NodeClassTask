const Auto = require("./auto-module");

getAllObjs = (req, res) => {
    Auto.find({}, (items, error) => {
        if (error) return res.json(error);
        res.json(items);
    });
};


createAutoObject = async (req, res) => {
    let {
        make,
        model,
        makeDate,
        rida,
        gearbox
    } = req.body;


    let info = new Auto({
        make,
        model,
        makeDate,
        rida,
        gearbox
    });

    try {
        let savedInfo = await info.save();
        res.json(savedInfo);
    } catch (e) {
        res.status(404).json(e);
    }

};

getById = async (req, res) => {

    try {
        let carObj = await Auto.findById({
            _id: req.body._id
        })
        res.json(carObj)
    } catch (err) {
        res.status(401).json(err)
    }
};

deleteObj = async (req, res) => {

    let id = req.body._id;

    try {
        let idExist = await Auto.findById(id);
        if (idExist === null) throw "This id already deleted"
        let deletedItem = await Auto.deleteOne({
            _id: id
        });
        res.json(deletedItem);
    } catch (err) {
        res.status(404).json(err);
    }
};



updateAutoObj = async (req, res) => {
    try {
        let updatedItem = await Auto.findByIdAndUpdate(req.body._id, req.body);
        res.json(updatedItem);
    } catch (err) {
        res.status(404).json(err);
    }
};

filterByRida = async (req, res) => {
    try {
        let filteredCars;
        switch (req.body.filterBy) {
            case "rida":
                req.body.greaterThan ?
                    filteredCars = await Auto.find({
                        rida: {
                            $gt: req.body.filterValue
                        }
                    }) :
                    filteredCars = await Auto.find({
                        rida: {
                            $lt: req.body.filterValue
                        }
                    });
                break;
            case "year":
                req.body.greaterThan ?
                    filteredCars = await Auto.find({
                        makeDate: {
                            $gt: new Date(req.body.filterValue.toString())
                        }
                    }) :
                    filteredCars = await Auto.find({
                        makeDate: {
                            $lt: new Date(req.body.filterValue.toString())
                        }
                    });
                break;
            case "pavaruDeze":
                filteredCars = await Auto.find({
                    gearbox: req.body.filterValue

                });
                break;
        }
        res.json(filteredCars)

    } catch (err) {
        res.status(404).json(err)
    }
}



module.exports = {
    getAllObjs,
    createAutoObject,
    getById,
    deleteObj,
    updateAutoObj,
    filterByRida
};