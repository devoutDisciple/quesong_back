const resultMessage = require("../util/resultMessage");
const sequelize = require("../dataSource/MysqlPoolClass");
const goods = require("../models/goods");
const GoodsModel = goods(sequelize);

module.exports = {
	// 获取同一家商店的所有食物
	getByShopId: async (req, res) => {
		let id = req.query.id;
		try {
			let goods = await GoodsModel.findAll({
				where: {
					shopid: id
				}
			});
			let result = [];
			goods.map(item => {
				result.push(item.dataValues);
			});
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 增加不同商品的销量
	addSales: async (req, res) => {
		let body = req.body;
		let goodIds = body.goodIds;
		console.log(goodIds, 888);
		try {
			goodIds.map(async (item) => {
				await GoodsModel.increment(["sales"], {
					by: item.num,
					where: {
						id: item.id
					}
				});
			});
			return "success";
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	}
};
