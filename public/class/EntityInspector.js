class EntityInspector
{
	constructor(entityInspectorId, entityInspectorContainerId)
	{
		console.log("new" + this.constructor.name + "()");
		this.entityInspectorId = entityInspectorId;
		this.entityInspectorContainerId = entityInspectorContainerId;

		this.allEntities = {};
	}

	appendListing(entityData)
	{
		if(this.doesItemExist(entityData.entityId))
		{
			this.updateEntry(entityData);
		}
		else
		{
			this.createNewEntry(entityData);
		}

		let container = $('#'+this.entityInspectorContainerId);
		container.scrollTop(container.prop("scrollTop") + container.height());
	}

	/**
	 * Checks if the entity is already listed as a checkbox-item
	 * 
	 * @return {boolean}
	 */
	doesItemExist(entityId)
	{
		if(this.allEntities[(entityId)])
		{
			return true;
		}
		return false;
	}

	updateEntry(entityData)
	{
		console.log(this.constructor.name+".updateEntity("+entityData.entityId+")");
	}

	createNewEntry(entityData)
	{
		let entityId = entityData.entityId;
		this.allEntities[entityId] = entityData;

		// Add a sorrounding div
		let someContainer = $('<div>', { "class" : "contentItem" });
		// Add a Checkbox with entityId as Label
		let someCheckbox = $('<input />', { type: 'checkbox', id: 'cb'+entityId, value: entityId});
		let thisInspector = this;
		someCheckbox.click(() => thisInspector.onCheckboxClicked(someCheckbox));

		
		someCheckbox.appendTo(someContainer);
		$('<label />', { 'for': 'cb'+entityId, text : entityId}).appendTo(someContainer);

		let list = $('#'+this.entityInspectorId);
		someContainer.appendTo(list);
	}

	onCheckboxClicked(someCheckbox)
	{
		console.log(this.constructor.name + ".onCheckboxClicked("+$(someCheckbox).val()+")");
	}
}