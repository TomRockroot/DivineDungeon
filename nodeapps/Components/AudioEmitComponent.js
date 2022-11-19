const Component = require("./Component");
const { ComponentType } = require("../../public/class/Enums");

class AudioEmitComponent extends Component
{
	constructor(entityId, type = ComponentType.AudioEmitComponent)
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

module.exports = AudioEmitComponent;