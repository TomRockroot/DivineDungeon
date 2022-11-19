class MessageBoard
{
	constructor(messageBoardId, messageContainerId)
	{
		console.log("new" + this.constructor.name + "()");
		this.messageBoardId = messageBoardId;
		this.messageContainerId = messageContainerId;
	}

	appendToMessages(text)
	{
		$('#'+this.messageBoardId).append($('<li>').text(text));

		let jElem = $('#'+this.messageContainerId);
		console.log(jElem.scrollTop() + " + " + jElem.height() + " = " + (jElem.scrollTop() + jElem.height()));
		jElem.scrollTop(jElem.prop("scrollTop") + jElem.height());
	}
}