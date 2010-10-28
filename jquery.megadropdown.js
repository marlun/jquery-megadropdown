var MegaDropDown = (function ($) {
	var pub = {};
	var selectElement;
	var megaddSelectBox;
	var items = [];

	//
	// SelectBox
	//

	function buildSelectBox() {
		var selected = getOriginalSelected();
		var control = $('<div>');
		control.html(selected.text);
		control.addClass('megadd-select');
		control.bind('click.megaDropDown', selectBoxClickHandler);

		return control;
	}

	function selectBoxClickHandler(e) {
		var listview = buildListView();
		megaddSelectBox.after(listview);
	}

	function listViewItemClickHandler(e) {
		console.log("Clicked element value: " + $(this).data('value'));
		// 6.1 Set the correct values on the original select
		//var selectElement = $(this).closest('select');
		//selectElement.val($(this).data('value'));
		// 6.2 Update MegaDropDown control to show the selected value
		//var megaDropDownSelect = $(this).closest('.megaadd-select');
		//megaDropDownSelect.html($(this).html());
	}

	//
	// Listview
	//

	function buildListView() {
		var control = $('<div>');
		control.addClass('megadd-list');


		for (var i = 0; i < items.length; i++) {
			var item = $('<p>');
			item.html(items[i].text);
			item.data('value', items[i].key);
			item.bind('click.megaDropDown', listViewItemClickHandler);
			control.append(item);
		}

		return control;
	}

	//
	// General functions
	//

	function getOriginalItems() {
		var elements = selectElement.find('option');

		elements.each(function (idx, element) {
			items.push({'text' : $(element).html(), 'key' : $(element).val()});
		});
	}

	function getOriginalSelected() {
		var selected = selectElement.find("option[value='" + selectElement.val() + "']:first");
		return {'text' : selected.html(), 'key' : selected.val()};
	}

	//
	// Public methods
	//

	pub.show = function () {
		megaddSelectBox = buildSelectBox();
		selectElement.after(megaddSelectBox);
	};

	pub.init = function (element) {
		// Save the original select element for later use
		selectElement = element;
		selectElement.hide();
		getOriginalItems();
	};

	return pub;
}(jQuery));

(function($) {
	$.fn.megaDropDown = function() {
		return this.each(function() {
			MegaDropDown.init($(this));
			MegaDropDown.show();
		});
	};
})(jQuery);
