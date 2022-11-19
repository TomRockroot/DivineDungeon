const Component = require("./Component");
const { ComponentType } = require("../../public/class/Enums");

class PhysicsComponent extends Component
{

	start()
	{
		console.log(this.constructor.name + ".start()");
	}

	update()
	{
		console.log(this.constructor.name + ".update()");
	}
}

module.exports = PhysicsComponent;