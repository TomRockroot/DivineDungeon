class Player
{
	defaultProperties =
	{
		id : -1,
		name : "noName"
	}

	constructor(properties)
	{
		console.log(this.constructor.name + "()");
		for(let key in this.defaultProperties.key)
		{
			if(!properties[key])
			{
				properties[key] = this.defaultProperties[key];
			}
		}
		this.properties = properties;
		console.log(this.properties);
	}
}

module.exports = Player;