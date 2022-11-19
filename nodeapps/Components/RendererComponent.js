const Component = require("./Component");
const { ComponentType } = require("../../public/class/Enums");

class RendererComponent extends Component
{
	constructor(entityId, type = ComponentType.Renderer)
	{
		super(entityId, type);
	}

	start()
	{
		console.log(this.constructor.name + ".start()");
	}

	update()
	{
		console.log(this.constructor.name + ".update()");
	}
}

module.exports = RendererComponent;