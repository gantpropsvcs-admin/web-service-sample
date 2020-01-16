const fs = require('fs');
const path = require('path');
const datafilename = path.join(__dirname,"../data/prices.json");

const data = fs.readFileSync(datafilename);
let diesel = JSON.parse(data);

const appRouter = function(app) {
    // i'd load API documentation here    
    app.get("/", function(req, res) {
        res.status(200).send("Welcome");
    });

    // get all prices
    app.get("/diesel", function(req, res) {
        res.status(200).send(diesel);
    });

    // get a price details
    app.get("/diesel/:id", function(req, res, next) {
        try {
            let priceId = req.params.id;

            // validate id is a number
            if (isNaN(parseInt(priceId))) {
                let err = new Error();
                err.status = 400;
                err.message = 'Method is expecting a number';
                throw err;
            }

            let price = diesel.find(dieselprice => dieselprice.id === parseInt(priceId));  
            
            if (!price) {
                let err = new Error();
                err.status = 400;
                err.message = 'A diesel price for id='+priceId+' was not found';
                throw err;
            }
            res.status(200).send(price);
        } catch (e) {
            res.status(400).send(e);
        }

    });

    // add a new price
    app.post("/diesel", function(req, res, next) {
        try {
            let maxid = Math.max.apply(Math, diesel.map( (price) => { 
                return price.id;  
            }));

            let newId = maxid+1;

            let newItem = {
                "id": newId,
                "price": req.body.price,
                "location": {
                    "lat": req.body.location.lat,
                    "long": req.body.location.long   
                },
                "location_name" : req.body.location_name,
                "date": (new Date()).toISOString()
            };
            newItem.id = newId;

            diesel.push(newItem);

            fs.writeFileSync(datafilename, JSON.stringify(diesel));

            res.status(200).send(JSON.stringify(newItem));
        } catch (e) {
            res.status(400).send("Error adding new diesel price");
        }
    });

    app.put("/diesel/:id", function (req, res, next) {
        try {
            let priceId = req.params.id;

            // validate id is a number
            if (isNaN(parseInt(priceId))) {
                let err = new Error('Method is expecting a number');
                err.status = 400;
                throw err;
            }

            let price = diesel.find(dieselprice => dieselprice.id === parseInt(priceId));  

            if (!price) {
                let err = new Error('A diesel price for id='+priceId+' was not found');
                err.status = 400;
                throw err;
            }

            price.price = req.body.price;
            price.location.lat = req.body.location.lat;
            price.location.long = req.body.location.long;
            price.location_name = req.body.location_name;
            price.date = (new Date()).toUTCString();

            let newprices = diesel.map(dieselprice => {
                if (price.id === parseInt(priceId)) {
                    return price;
                } else {
                    return dieselprice;
                }
            })

            fs.writeFileSync(datafilename, JSON.stringify(diesel));

            res.status(200).send(JSON.stringify(price));
        } catch (error) {
            res.status(400).send("Error updating diesel price");
        }
    });

    app.delete("/diesel/:id", function(req,res,next){
        try {
            let priceId = req.params.id;

            // validate id is a number
            if (isNaN(parseInt(priceId))) {
                let err = new Error('Method is expecting a number');
                err.status = 400;
                throw err;
            }

            let price = diesel.find(dieselprice =>  dieselprice.id === parseInt(priceId));

            if (!price) {
                let err = new Error();
                err.status = 400;
                err.message = 'A diesel price for id='+priceId+' was not found';
                throw err;
            }

            let newprices = diesel.filter(dieselprice => dieselprice.id !== parseInt(priceId));

            let oldprice = newprices.find(dieselprice =>  dieselprice.id === parseInt(priceId));

            if (!oldprice) {
                fs.writeFileSync(datafilename, JSON.stringify(newprices));

                res.status(200).send("Id="+priceId+" was deleted successfully.");                
            } else {
                res.status(400).send("Id="+priceId+" was not deleted."); 
            }


        } catch (e) {
            next(e);
        }
    });
    
}

module.exports = appRouter;