class Game
{
	constructor(socket, gameContainerID)
	{
		console.log(this.constructor.name + " LET'S GO!");
		this.socket = socket;

		this.registerComponentUpdates(this.socket);
		
		let gameWidth = 640; // this.container.innerWidth
		let gameHeight = 480; // this.container.innerHeight

		this.container = document.getElementById(gameContainerID);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, gameWidth / gameHeight, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( gameWidth, gameHeight);
		this.container.appendChild( this.renderer.domElement);

		this.updateQueue = new Queue();

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const light = new THREE.DirectionalLight(0xFFFFFF);
		light.position.set( 0, 20, 10);
		const ambient = new THREE.AmbientLight(0x070707);

		const material = new THREE.MeshPhongMaterial( { color: 0x00aaff });

		this.cube = new THREE.Mesh( geometry, material);

		this.scene.background = new THREE.Color(0x000000);
		this.scene.add( this.cube );
		this.scene.add( light );
		this.scene.add( ambient );

		this.camera.position.z = 3;

		this.animate();
	}

	animate()
	{
		const game = this;
		requestAnimationFrame( function() { game.animate(); } );

		this.processComponentUpdateQueue();

		this.renderer.render( this.scene, this.camera );
	}

	registerComponentUpdates(socket)
	{
		let thisGame = this;
		for(let key in ComponentType)
		{
			console.log(this.constructor.name + ".registerComponentUpdates() -> " + key);
			socket.on(ComponentType[key], function(updateData)
			{
				thisGame.addToComponentUpdateQueue(updateData);
			});
		}
	}

	addToComponentUpdateQueue(updateData)
	{
		this.updateQueue.enqueue(updateData);
	}

	processComponentUpdateQueue()
	{
		console.log(this.constructor.name + ".processComponentUpdateQueue("+this.updateQueue.length+")");
		while(!this.updateQueue.isEmpty)
		{
			let updateData = this.updateQueue.dequeue();

			console.log(JSON.stringify(updateData));
		}
	}
}