const categoryModel = require('../models/categoryModel');
const todoController = require('../controllers/todoController');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

module.exports.addCatergory = async (req, res) => {
    const { text,groupId } = req.body;
    try {
        const result = await categoryModel.create({ text ,groupId});
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
}


module.exports.getAllCategories = async (req, res) => {
    try {
        const allCategoriesAndTodosCount = await categoryModel.aggregate([{$match:{groupId:ObjectId(req.params.id)}},{
            $lookup: {
                from: "todos",
                let: { catId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$$catId", "$categoryId"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            "$status", "NC"
                                        ]
                                    }
                                ]
                            },
                        },
                    },
                    {
                        $count: "NotcompletedTodos"
                    }
                ],
                as: "NotcompletedTodos",
            }
        } , {
            $lookup: {
                from: "todos",
                let: { catId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$$catId", "$categoryId"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            "$status", "C"
                                        ]
                                    }
                                ]
                            },
                        },
                    },
                    {
                        $count: "CompletedTodos"
                    }
                ],
                as: "CompletedTodos",
            },
        }
        ]);
        res.json(allCategoriesAndTodosCount);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const result = await todoController.deleteAllTodosWithCategory(req.params.id);
        const categoryResult = await categoryModel.findByIdAndDelete({ _id: req.params.id });
        res.json({ success: "Category Was Deleted With All Todo's in it" });
    }
    catch (err) {
        console.log(err);
        res.json({ err })
    }
}
