class EntityData
{
	constructor(entityId = -1, components, creator = "unknown", creationTime = "")
	{
		this.entityId = entityId;
		this.components = components;
		this.creator = creator;
		this.creationTime = creationTime;
	}
}

module.exports = 
{
	EntityData: EntityData
}