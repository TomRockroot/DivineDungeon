const { Reply } = require("../public/class/Enums");
const EntityManager = require("./Components/EntityManager");
const ComponentType = require("../public/class/Enums").ComponentType;

class Simulation
{
	static simulationSpeed = 1000;

	constructor(io)
	{
		console.log(this.constructor.name+" starting...");
		this.io = io;
		this.entityManager = new EntityManager();
		this.instance = this;
	}

	createEntity(entityData)
	{
		let entity = this.entityManager.createEntity(entityData);

		this.io.emit(Reply.EntityCreated, entity.entityData);
	}

	simulate()
	{
		this.entityManager.update();
		this.sendChanges( this.entityManager.getChanges() );
	}

	sendChanges(changeQueue = [])
	{
		let currentChange;
		while(changeQueue.length > 0)
		{
			console.log(this.constructor.name+": Change Queue length: " + changeQueue.length);
			currentChange = changeQueue.pop();
			console.log("-> " + JSON.stringify(currentChange));
			if(currentChange)
			{
				this.io.emit(currentChange.type, currentChange);
			}
		}
	}
}

module.exports =
{
	Simulation : Simulation
}
