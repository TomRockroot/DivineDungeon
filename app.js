const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const util = require('util');

const Bouncer = require('./nodeapps/Bouncer').Bouncer;
const bouncer = new Bouncer("Bob");

const Simulation = require('./nodeapps/Simulation').Simulation;
const simulation = new Simulation(io);

const EntityData = require('./public/class/EntityData').EntityData;
const Entity = require('./nodeapps/Entity').Entity;

const Action = require('./public/class/Enums').Action;
const Reply = require('./public/class/Enums').Reply;

app.use(express.static('./public/'));
app.get('/', function(req, res)
	{
		res.sendFile('index.html');
		res.sendFile('index.css', function(err)
			{
				if(err) 
				{
					console.error("Failed to load CSS: " + err.status);
				}
				else
				{
					console.log('Sent index.css');
				}
			});
	});

setInterval(() => simulation.simulate(), Simulation.simulationSpeed);


io.on(Action.Connection, function(socket)
	{
		console.log('A user connected');

		socket.on(Action.Disconnect, function()
		{
			console.log('A user disconnected');
		});

		socket.on(Action.Login, function(loginData)
		{
			console.log("Logging into server: " + loginData.nickname);

			let reason = bouncer.isLoginOk(loginData);
			if(!reason)
			{
				io.emit(Reply.LoginSucceeded, bouncer.greetPeople(loginData));
			}
			else
			{
				socket.emit(Reply.LoginFailed, reason);
			}
		});

		socket.on(Action.Logout, function()
		{
			console.log("LOGGED OUT");
			socket.emit(Reply.LogoutSucceeded);
		});

		socket.on(Action.CreateEntity, function(entityData)
		{
			simulation.createEntity(entityData);
		});
	});

http.listen(3000, function()
	{
		console.log("Listening on port 3000");
	});