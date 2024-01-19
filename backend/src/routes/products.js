const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return req.statusCode(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename });
    });
});

router.post("/", auth, async (req, res, next) => {
    console.log(req.body);
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    //console.log(req.body);
    // asc 오름차순, desc 내림차순
    const order = req.query.order ? req.query.order : "desc";
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};

    for (let key in req.query.filters) {
        if (req.query.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    //greater than equal
                    $gte: req.query.filters[key][0],
                    //less than equal
                    $lte: req.query.filters[key][1],
                };
            } else {
                findArgs[key] = req.query.filters[key];
            }
        }
    }

    if (term) {
        findArgs["$text"] = { $search: term };
    }

    console.log(findArgs);
    try {
        const products = await Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);
        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;
        return res.status(200).json({ products, hasMore });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    const type = req.query.type;
    let productIds = req.params.id;
    // console.log("1" + productIds);
    //productId 를 이용해서 db에서 productID와 같은 상품의 정보를 가져옵니다.
    if (type === "array") {
        //id=213213132,1515161,51516516
        //productIds=['32132123','132123132','123132']
        let ids = productIds.split(",");
        productIds = ids.map((item) => {
            return item;
        });
    }

    try {
        const product = await Product.find({
            _id: { $in: productIds },
        }).populate("writer");

        return res.status(200).send(product);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
