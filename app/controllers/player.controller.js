// Import Player model
const { response } = require("express");
const db = require("../models");
const Player = db.player;

// Handle index actions
exports.index = async function(req, res) {
    var players = Player.aggregate([{
        $project: { ID: 1, Name: 1, Club: 1, Nationality: 1 },
    }, ]).exec(function(err, data) {
        if (err) return res.status(500).json({
            status: 500,
            message: "Player Added Successfully",
            data: null,
        });
        return res.status(200).json({
            status: 200,
            message: "Player Added Successfully",
            data: data,
        });
    });
};

// Handle index actions
exports.indexByPage = async function(req, res) {
    var page = req.params.page;
    try {
        var totalPlayer = await Player.count();
        var players = await Player.find()
            .sort({ ID: -1 })
            .limit(20)
            .skip((page - 1) * 20)
            .exec();

        return res.status(200).send({
            status: 200,
            message: "Player Added Successfully",
            data: {
                players: players,
                totalPage: Math.ceil(totalPlayer / 20),
            },
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err,
            data: null,
        });
    }
};

// Handle search actions
exports.search = async function(req, res) {
    var players = Player.caseInsesitiveDemo
        .find({ Name: { $regex: req.params.name } })
        .exec(function(err, data) {
            if (err)
                return res.status(500).send({
                    status: 500,
                    message: err,
                    data: null,
                });
            return res.status(200).send({
                status: 200,
                message: "Player Added Successfully",
                data: data,
            });
        });
};

// Handle view actions
exports.view = async function(req, res) {
    await Player.find({
            ID: req.params.id,
        },
        async function(err, player) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            return response.status(200).send({
                status: 200,
                message: "player Detail Loading...",
                data: player,
            });
        }
    );
};

// Handle create actions
exports.create = async function(req, res) {
    var player = Player(req.body);

    var players = await Player.find().sort({ ID: -1 }).limit(1).exec();

    player.ID = parseInt(players[0].ID) + 1;

    player.save(async function(err, player) {
        if (err)
            return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });

        player = JSON.parse(JSON.stringify(player));

        return res.status(200).send({
            status: 200,
            message: "Player succesfully created",
            data: player,
        });
    });
};

// Handle update actions
exports.update = function(req, res) {
    var player = req.body;
    console.log(player);
    console.log(req.params);
    var id = parseInt(req.params.id);
    Player.findOneAndUpdate({ ID: id }, {
            $set: player,
        })
        .then((player) => {
            console.log(player);
            if (player) {
                return res.status(200).send({
                    status: 200,
                    message: "Player was updated successfully",
                    data: player,
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Player was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                status: 500,
                message: err,
                data: null,
            });
        });
};

// Handle delete actions
exports.delete = function(req, res) {
    Player.remove({
            ID: req.params.id,
        },
        function(err, player) {
            if (err) return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });

            return res.status(200).send({
                status: 200,
                message: "Player was deleted successfully",
                data: null,
            });
        }
    );
};