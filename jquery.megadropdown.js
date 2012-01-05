var MegaDropDown = function (options, element) {
	this.settings = options;
	this.oldSelect = element.hide();
	this.selectBox = null;
	this.listView = null;
	this.items = this.getOriginalItems();
};

jQuery.extend(MegaDropDown.prototype, {

	render: function () {
		this.selectBox = this.buildSelectBox();
		this.oldSelect.after(this.selectBox);
		this.listView = this.buildListView();
		this.listView.hide();
		this.selectBox.after(this.listView);

		$(document).bind('click.megaDropDown', jQuery.proxy(function (e) {
			if (this.isOpen()) {
				this.close();
			}
		}, this));
	},

	getOriginalItems: function () {
		var list = [],
				elements = this.oldSelect.find('option');

		elements.each(function (idx, element) {
			list.push({'text' : $(element).html(), 'key' : $(element).val()});
		});

		return list;
	},

	getOriginalSelected: function () {
		var selected = this.oldSelect.find("option[value='" + this.oldSelect.val() + "']:first");
		return {'text': selected.html(), 'key': selected.val()};
	},

	//
	// SelectBox
	//

	buildSelectBox: function () {
		var selected = this.getOriginalSelected(),
				control = $('<div>'),
				text = $('<span>'),
				arrow = $('<span>&#9660;</span>');
		
		control.addClass('mdd-selectbox');
		control.attr('style', 'width: ' + this.settings.selectWidth + ';');
		control.bind('click.megaDropDown', jQuery.proxy(this.selectBoxClickHandler, this));

		text.addClass('mdd-selectbox-text');
		text.html(selected.text);
		control.append(text);

		arrow.addClass('mdd-selectbox-arrow');
		control.append(arrow);

		return control;
	},

	selectBoxClickHandler: function (e) {
		if (this.isOpen())
		{
			this.close();
		}
		else
		{
			this.open();
		}

		e.stopPropagation();
	},

	setSelectBoxText: function(text) {
		this.selectBox.find('span:first').html(text);
	},

	setSelectBoxArrow: function (direction) {
		if (direction == 'down') {
			this.selectBox.find('span:last').html('&#9660;');
		}
		else {
			this.selectBox.find('span:last').html('&#9650;');
		}
	},
	
	open: function () {
		this.selectBox.addClass('mdd-selectbox-open');
		this.setSelectBoxArrow('up');
		this.listView.show();
	},
	
	close: function () {
		this.selectBox.removeClass('mdd-selectbox-open');
		this.setSelectBoxArrow('down');
		this.listView.hide();
	},
	
	isOpen: function () {
		return this.selectBox.hasClass('mdd-selectbox-open');
	},

	//
	// ListView
	//

	buildListView: function () {
		var control = $('<div>');
		control.attr('style', 'width: ' + this.settings.listWidth + ';');

		control.addClass('mdd-listview');
		control = this.buildColumnListView(control);

		return control;
	},

	buildColumnListView: function(control) {
		var index = 0,
				itemsPerColumn = Math.ceil(this.items.length / this.settings.columns),
				listWidth = 100 / this.settings.columns,
				list,
				item;
				
				
		for (var col = 0; col < this.settings.columns; col++) {
			list = $('<ul>');
			list.css({'width' : listWidth + "%", 'float' : 'left'});
			for (var i = index; i < itemsPerColumn * (col + 1); i++) {
				if (index >= this.items.length) {
					break;
				}
				item = $('<li>');
				item.html(this.items[index].text);
				item.data('value', this.items[index].key);
				item.addClass('mdd-item');
				if (item.data('value') == this.oldSelect.val()) {
					item.addClass('mdd-item-selected');
				}
				item.bind('click.megaDropDown', jQuery.proxy(this.listViewItemClickHandler, this));
				list.append(item);
				index += 1;
			}
			control.append(list);
		}

		return control;
	},

	listViewItemClickHandler: function (e) {
		var item = $(e.target);
		//console.log("Clicked element value: " + item.data('value'));

		// Set the correct values on the original select
		this.oldSelect.val(item.data('value'));

		this.listView.find('.mdd-item-selected').removeClass('mdd-item-selected');
		item.addClass('mdd-item-selected');

		// Update MegaDropDown control to show the selected value
		this.setSelectBoxText(item.html());
		
		this.close();

		e.stopPropagation();
	}

});

(function($) {
	$.fn.megaDropDown = function(options) {

		var settings = {
			'columns' : 2,
			'listWidth': 600,
			'selectWidth': 200
		};

		return this.each(function() {
			if (options) {
				$.extend(settings, options);
			}

			var plugin = new MegaDropDown(settings, $(this));
			plugin.render();
		});
	};
})(jQuery);
