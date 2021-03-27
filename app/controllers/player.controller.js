// Import Player model
const db = require("../models");
const Player = db.player;

// Handle index actions
exports.index = async function(req, res) {
    var players = Player.aggregate([{
        $project: { ID: 1, Name: 1, Club: 1, Nationality: 1 },
    }, ]).exec(function(err, data) {
        if (err) return console.log("err", err);
        return res.json({
            status: "success",
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
            .sort({ 'ID': -1 })
            .limit(20)
            .skip((page - 1) * 20)
            .exec();

        return res.json({
            status: "success",
            message: "Player Added Successfully",
            data: {
                players: players,
                totalPage: Math.ceil(totalPlayer / 20),
            },
        });
    } catch (err) {
        return res.send(err);
    }
};

// Handle search actions
exports.search = async function(req, res) {
    var players = Player.caseInsesitiveDemo.find({ "Name": { '$regex': req.params.name } }).exec(function(err, data) {
        if (err) return console.log("err", err);
        return res.json({
            status: "success",
            message: "Player Added Successfully",
            data: data,
        });
    });
};

// Handle view actions
exports.view = async function(req, res) {
    await Player.find({
            ID: req.params.id
        },
        async function(err, player) {
            if (err) return res.status(400).send(err);

            console.log(player)

            return res.json({
                message: "player Detail Loading...",
                data: player,
            });
        }
    );
};

// Handle create actions
exports.create = async function(req, res) {
    var player = Player(req.body);

    var players = await Player.find()
        .sort({ 'ID': -1 })
        .limit(1)
        .exec();

    player.ID = parseInt(players[0].ID) + 1;

    player.save(async function(err, player) {
        if (err) return res.status(400).json(err);

        player = JSON.parse(JSON.stringify(player));

        return res.json({
            message: "Player succesfully created",
            data: player,
        });
    });
};

// Handle update actions
exports.update = function(req, res) {
    var player = req.body.player;
    player.updateAt = Date.now();
    Player.findOneAndUpdate({ ID: req.params.id }, {
            $set: player,
        })
        .then((player) => {
            if (player) {
                return res.json({
                    message: "player berhasil diperbarui",
                    data: player,
                });
            } else {
                return res.status(400).json({
                    message: "player tidak ditemukan",
                    data: {},
                });
            }
        })
        .catch((err) => {
            return res.json({
                message: "error",
                data: err,
            });
        });
};

// Handle delete actions
exports.delete = function(req, res) {
    Player.remove({
            ID: req.params.id,
        },
        function(err, player) {
            if (err) return res.send(err);
            return res.json({
                status: "success",
                message: "Player Deleted!",
            });
        }
    );
};