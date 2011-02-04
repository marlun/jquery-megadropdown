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
			if (this.selectBox.hasClass('mdd-selectbox-open')) {
				this.selectBox.click();
			}
		}, this));
	},

	getOriginalItems: function () {
		var list = [];
		var elements = this.oldSelect.find('option');

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
		var selected = this.getOriginalSelected();
		var control = $('<div>');
		control.addClass('mdd-selectbox');
		control.bind('click.megaDropDown', jQuery.proxy(this.selectBoxClickHandler, this));

		var text = $('<span>');
		text.html(selected.text);
		control.append(text);

		var arrow = $('<span>&#9660;</span>');
		arrow.addClass('mdd-selectbox-arrow');
		control.append(arrow);

		return control;
	},

	selectBoxClickHandler: function (e) {
		this.listView.toggle();
		if (this.listView.is(':visible')) {
			this.setSelectBoxArrow('up');
			this.selectBox.addClass('mdd-selectbox-open');
		}
		else {
			this.setSelectBoxArrow('down');
			this.selectBox.removeClass('mdd-selectbox-open');
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

	//
	// ListView
	//

	buildListView: function () {
		var control = $('<div>');
		control.addClass('mdd-listview');

		control = this.buildColumnListView(control);
		return control;
	},

	buildColumnListView: function(control) {
		var index = 0;
		var itemsPerColumn = Math.ceil(this.items.length / this.settings.columns);
		for (var col = 0; col < this.settings.columns; col++) {
			var listWidth = 100 / this.settings.columns;
			var list = $('<ul>');
			list.css({'width' : listWidth + "%", 'float' : 'left'});
			for (var i = index; i < itemsPerColumn * (col + 1); i++) {
				if (index >= this.items.length) {
					break;
				}
				var item = $('<li>');
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
		this.setSelectBoxArrow('down');

		this.listView.toggle();

		e.stopPropagation();
	}

});

(function($) {
	$.fn.megaDropDown = function(options) {

		var settings = {
			'columns' : 2,
			'width': 640
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
