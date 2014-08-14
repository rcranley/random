/**
 * Override for Sencha Touch 2.3.0's Ext.data.writer.Writer that adds support 
 * for deeply nested mapping property names (when nameProperty: 'mapping').
 */
Ext.define('rcranley.override.Writer', {
	override: 'Ext.data.writer.Writer',
	
	/**
	 * Utility method that is capable of setting a deeply nested property,
	 * adding missing segments along the way.
	 */
	setNestedProperty: function (object, path, value) {
		var segments = path.split('.');
		var node = object;
		Ext.Array.each(
			segments,
			function (segment, index) {
				if (index < segments.length - 1) {
					if (Ext.isObject(node) && ! node.hasOwnProperty(segment)) {
						node[segment] = {};
					}
					node = node[segment];
				}
				else
				{
					node[segment] = value;
				}
			}
		);
	},
	
	/**
	 * Override for Sencha Touch 2.3.0's Ext.data.writer.Writer::getRecordData() method.
	 */
	getRecordData: function(record) {
		var isPhantom = record.phantom === true,
			writeAll = this.getWriteAllFields() || isPhantom,
			nameProperty = this.getNameProperty(),
			fields = record.getFields(),
			data = {},
			changes, name, field, key, value;
		
		if (writeAll) {
			fields.each(function(field) {
				if (field.getPersist()) {
					name = field.config[nameProperty] || field.getName();
					value = record.get(field.getName());
					if (field.getType().type == 'date') {
						value = this.writeDate(field, value);
					}
					//data[name] = value;
					this.setNestedProperty(data, name, value);
				}
			}, this);
		} else {
			// Only write the changes
			changes = record.getChanges();
			for (key in changes) {
				if (changes.hasOwnProperty(key)) {
					field = fields.get(key);
					if (field.getPersist()) {
						name = field.config[nameProperty] || field.getName();
						value = changes[key];
						if (field.getType().type == 'date') {
							value = this.writeDate(field, value);
						}
						//data[name] = value;
						this.setNestedProperty(data, name, value);
					}
				}
			}
			if (!isPhantom) {
				// always include the id for non phantoms
				data[record.getIdProperty()] = record.getId();
			}
		}
		return data;
	}
});
