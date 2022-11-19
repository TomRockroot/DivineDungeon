const Action = Object.freeze(
{
	Connection : 'connection',
	Disconnect : 'disconnect',

	Login : 'login',
	Logout : 'logout',

	CreateEntity : 'create entity'
});

const Reply = Object.freeze(
{
	LoginSucceeded : 'login succeeded',
	LoginFailed : 'login failed',

	LogoutSucceeded : 'logout succeeded',

	EntityCreated : 'entity created'
});

const ComponentType = Object.freeze(
{
	NONE : 'none',
	Transform : 'transform',
	AudioEmit : 'audioEmit',
	Renderer : 'renderer',
	Physics : 'physics'
});

module.exports = 
{
	Action: Action,
	Reply : Reply,
	ComponentType : ComponentType
}