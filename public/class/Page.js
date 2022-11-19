class Page
{
	constructor(socket, IDs)
	{
		this.socket = socket;
		this.IDs = IDs;
	}

	init()
	{
		console.log(this.constructor.name + ".init()");
		const thisPage = this;
		this.messageBoard = new MessageBoard(this.IDs.output.messages,
											this.IDs.container.messages);
		this.entityInspector = new EntityInspector(this.IDs.output.entityList,
												this.IDs.container.entityList);

		console.log("Registering 'login succeeded'...");
		this.socket.on(Reply.LoginSucceeded, function(greetingData)
			{
				thisPage.onLoginSucceeded(greetingData);
			});

		console.log("Registering 'login failed'...");
		this.socket.on(Reply.LoginFailed, function(reason)
			{
				thisPage.onLoginFailed(reason);
			});

		this.socket.on(Reply.LogoutSucceeded, function()
			{
				thisPage.onLogoutSucceeded();	
			});

		this.socket.on(Reply.EntityCreated, function(entityData)
			{
				thisPage.listEntity(entityData);
			});
	}

	login()
	{
		let nicknameInput = $("#"+this.IDs.input.nickname).val();
		let passwordInput = $("#"+this.IDs.input.password).val();
		console.log(this.constructor.name + ".login() " + nicknameInput);
		this.loginData =
			{
				nickname : nicknameInput,
				password : passwordInput
			};
		this.socket.emit(Action.Login, this.loginData);
	}

	logout()
	{
		console.log(this.constructor.name + ".logout()");
		this.socket.emit(Action.Logout);
	}

	createEntity()
	{
		console.log(this.constructor.name + ".createEntity()");

		let entityId = $("#"+this.IDs.input.entityId).val();
		let components = {};
		$('input[name="components"]:checked').each(function() {
			components[$(this).val()] = $(this).val();
		});

		let entityData = new EntityData(entityId, components, this.loginData.nickname, new Date());
		this.socket.emit(Action.CreateEntity, entityData);
	}

	listEntity(entityData)
	{
		console.warn(this.constructor.name+".listEntity(entityData)");
		this.entityInspector.appendListing(entityData);
	}

	onLoginSucceeded(greetingData)
	{
		console.log(this.constructor.name + ".onLoginSucceeded()");
		$('#'+this.IDs.container.login).hide();
		$('#'+this.IDs.container.logout).show();
		$('#'+this.IDs.container.engine).show();

		this.messageBoard.appendToMessages(greetingData.message);
	}

	onLoginFailed(reason)
	{
		console.log(this.constructor.name + ".onLoginFailed()");
		$('#'+this.IDs.container.login).show();
		$('#'+this.IDs.container.logout).hide();
		$('#'+this.IDs.container.engine).hide();

		this.messageBoard.appendToMessages("Failed to login: " + reason.message);
	}

	onLogoutSucceeded()
	{
		console.log(this.constructor.name + ".onLogoutSucceeded()");
		$('#'+this.IDs.container.login).show();
		$('#'+this.IDs.container.logout).hide();
		$('#'+this.IDs.container.engine).hide();

		this.messageBoard.appendToMessages("Logged out");
	}
}