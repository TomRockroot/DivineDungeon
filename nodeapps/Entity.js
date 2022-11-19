const EntityData = require("../public/class/EntityData");

class Entity
{
	constructor(entityData)
	{
		console.log(this.constructor.name + "() -> \n" + JSON.stringify(entityData));
		this.entityData = entityData;
	}

	simulate()
	{
		console.log(this.constructor.name + ".simulate() => " + JSON.stringify(this.entityData) );
	}
}

module.exports = Entity;