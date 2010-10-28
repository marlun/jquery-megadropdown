var MegaDropDown = (function ($) {
	var pub = {};
	var settings;
	var items = [];
	var selectElement;
	var mddSelectBox;
	var mddListView;

	//
	// SelectBox
	//

	function buildSelectBox() {
		var selected = getOriginalSelected();
		var control = $('<div>');
		control.addClass('mdd-selectbox');
		control.bind('click.megaDropDown', selectBoxClickHandler);

		var text = $('<span>');
		text.html(selected.text);
		control.append(text);

		var arrow = $('<span>&#9660;</span>');
		arrow.addClass('mdd-selectbox-arrow');
		control.append(arrow);

		return control;
	}

	function selectBoxClickHandler(e) {
		mddListView.toggle();
		if (mddListView.is(':visible')) {
			setSelectBoxArrow('up');
		}
		else {
			setSelectBoxArrow('down');
		}
	}

	function setSelectBoxText(text) {
		mddSelectBox.find('span:first').html(text);
	}

	function setSelectBoxArrow(direction) {
		if (direction == 'down') {
			mddSelectBox.find('span:last').html('&#9660;');
		}
		else {
			mddSelectBox.find('span:last').html('&#9650;');
		}
	}

	//
	// Listview
	//

	function buildListView() {
		var control = $('<div>');
		control.addClass('mdd-listview');

		for (var i = 0; i < items.length; i++) {
			var item = $('<p>');
			item.html(items[i].text);
			item.data('value', items[i].key);
			item.addClass('mdd-item');
			item.bind('click.megaDropDown', listViewItemClickHandler);
			control.append(item);
		}

		return control;
	}

	function listViewItemClickHandler(e) {
		console.log("Clicked element value: " + $(this).data('value'));

		// 6.1 Set the correct values on the original select
		selectElement.val($(this).data('value'));

		// 6.2 Update MegaDropDown control to show the selected value
		setSelectBoxText($(this).html());
		setSelectBoxArrow('down');
		mddListView.toggle();
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
		mddSelectBox = buildSelectBox();
		selectElement.after(mddSelectBox);
		mddListView = buildListView();
		mddListView.hide();
		mddSelectBox.after(mddListView);
	};

	pub.init = function (options, element) {
		settings = options;
		// Save the original select element for later use
		selectElement = element;
		selectElement.hide();
		getOriginalItems();
	};

	return pub;
}(jQuery));

(function($) {
	$.fn.megaDropDown = function(options) {

		var settings = {
			'cssPrefix' : 'mdd'
		};

		return this.each(function() {

			if (options) {
				$.extend(settings, options);
			}

			MegaDropDown.init(settings, $(this));
			MegaDropDown.show();
		});
	};
})(jQuery);
