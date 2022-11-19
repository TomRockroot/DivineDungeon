const Component = require("./Component");
const { ComponentType } = require("../../public/class/Enums");

class TransformComponent extends Component
{
	constructor(entityId, type =  ComponentType.Transform, position = {x:0, y:0, z:0}, rotation = {x:0, y:0, z:0}, scale = {x:1, y:1, z:1})
	{
		super(entityId, type);
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
	}

	start()
	{
		console.log(this.constructor.name + ".start()");
	}

	update()
	{
		this.isDirty = false;
		console.log(this.constructor.name + ".update()");
	}

	getUpdateData()
	{
		if(!this.isDirty)
		{
			return 0;
		}

		let updateData =
		{
			entityId : this.entityId,
			type : this.type,
			position : this.position,
			rotation : this.rotation,
			scale : this.scale
		}
		return updateData;
	}
}

module.exports = TransformComponent;