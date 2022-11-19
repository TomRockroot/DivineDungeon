// const Simulation = require("../EntityManager");
const { ComponentType } = require("../../public/class/Enums");

class Component
{
	constructor(entityId, type)
	{
		console.log(this.constructor.name+" of type ["+ type +"] was created for [" + entityId+ "]...");
		this.entityId = entityId;
		this.type = type;
		this.isDirty = true;
	}

	start()
	{
		console.warn(this.constructor.name+".start() is not implemented...");
	}

	update()
	{
		console.warn(this.constructor.name+".update() is not implemented...");
	}

	getUpdateData()
	{
		console.warn(this.constructor.name + ".getUpdateData() is not implemented...");
		return 0;
	}

	getComponent(type)
	{
		// TODO
	}
}

module.exports = Component;