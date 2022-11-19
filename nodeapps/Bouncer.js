class Bouncer
{
	constructor(name)
	{
		console.log("The bouncer "+name+" now protects the Dungeon...");
	}

	isLoginOk(loginData)
	{
		console.log(this.constructor.name+".isLoginOk()");
		let reason = this.isNicknameOk(loginData.nickname);
		if(reason)
		{
			console.log("Nickname reason: " + reason);
			return reason;
		}
		
		reason = this.isPasswordOk(loginData.password);
		if(reason)
		{
			console.log("Password reason: " + reason);
			return reason;
		}
		
		console.log("Appearently no reason: " + reason);
		return null;
	}

	isNicknameOk(nickname)
	{
		console.log(this.constructor.name+".isNicknameOk()");
		let reason = null;
		if(!nickname)
		{
			console.warn(nickname + " is not a valid Nickname");
			reason = { message : "No valid nickname" };
		}
		else
		{
			console.log(nickname + " is ok for a Nickname");
		}
		return reason;
	}

	isPasswordOk(password)
	{
		let reason = null;
		if(password == "1234")
		{
			reason = { message : "Bad password" };
		}
		return reason;
	}

	greetPeople(loginData)
	{
		let greetingData =
			{
				message : "Greetings " + loginData.nickname + " and Welcome!",
			};
		return greetingData;
	}
}

module.exports = 
{
	Bouncer: Bouncer
}