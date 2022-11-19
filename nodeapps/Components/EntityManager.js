const Entity = require("../Entity");
const TransformComponent = require("./TransformComponent");
const AudioEmitComponent = require("./AudioEmitComponent");
const PhysicsComponent = require("./PhysicsComponent");
const RendererComponent = require("./RendererComponent");
const ComponentType = require("../../public/class/Enums").ComponentType;

class EntityManager
{
	constructor()
	{
		console.log(this.constructor.name+" creating arrays");

		this.allEntities = [];
		this.allTransformComponents = {};
		this.allAudioEmitComponents = {};
		this.allRendererComponents = {};
		this.allPhysicsComponents = {};

		this.changeQueue = [];
	}

	update()
	{
		console.log(this.constructor.name+".update()");
		console.log(this.constructor.name+": Change Queue length: " + this.changeQueue.length);

		let updateData = 0;
		for(let entityId in this.allPhysicsComponents)
		{
			this.allPhysicsComponents[entityId].update();
			updateData = this.allPhysicsComponents[entityId].getUpdateData();
			this.changeQueue.push(updateData);
		}

		updateData = 0;
		for(let entityId in this.allTransformComponents)
		{
			this.allTransformComponents[entityId].update();
			updateData = this.allTransformComponents[entityId].getUpdateData();
			this.changeQueue.push(updateData);
		}
		
		for(let entityId in this.allRendererComponents)
		{
			this.allRendererComponents[entityId].update();
			updateData = this.allRendererComponents[entityId].getUpdateData();
			this.changeQueue.push(updateData);
		}

		for(let entityId in this.allAudioEmitComponents)
		{
			this.allAudioEmitComponents[entityId].update();
			updateData = this.allAudioEmitComponents[entityId].getUpdateData();
			this.changeQueue.push(updateData);
		}
	}

	createEntity(entityData)
	{
		let thisManager = this;
		let entity = new Entity(entityData);
		this.allEntities.push( entity );
		Object.keys(entityData.components).forEach((component) => { thisManager.addComponent(entityData.entityId, component) });

		return entity;
	 }

	addComponent(entityId, componentType)
	{
		console.log(this.constructor.name+".addComponent("+entityId+", "+ componentType +")");
		switch(componentType)
		{
			case ComponentType.Transform:
			{
				this.allTransformComponents[entityId] = new TransformComponent(entityId);
				this.allTransformComponents[entityId].start();
				break;
			}
			case ComponentType.AudioEmit:
			{
				this.allAudioEmitComponents[entityId] = new AudioEmitComponent(entityId);
				this.allAudioEmitComponents[entityId].start();
				break;
			}
			case ComponentType.RendererComponent:
			{
				this.allRendererComponents[entityId] = new RendererComponent(entityId);
				this.allRendererComponents[entityId].start();
				break;
			}
//			case ComponentType.PhysicsComponent:
//			{
//				this.allPhysicsComponents[entityId] = new PhysicsComponent(entityId);
//				this.allPhysicsComponents[entityId].start();
//				break;
//			}
			default:
			{
				console.warn(this.constructor.name + ".addComponent() -> " + componentType + " is unknown...");
				break;
			}
		}
	}

	getChanges()
	{
		console.log(this.constructor.name+": getChanges("+ this.changeQueue.length+")");
		return this.changeQueue;
	}
}

module.exports = EntityManager