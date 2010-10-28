(function($) {
	$.fn.megaDropDown = function() {

		return this.each(function() {

			var $this = $(this);
			var selectElement = $this;
			var value = $this.val();
			var selected = $this.find("option[value='" + value + "']:first");
			var optionElements = $this.find("option");

			// 1. Hide the old HTML control
			$this.hide();

			// 2. Show our control's HTML
			var control = $('<div>' + selected.html() + '</div>');
			control.addClass('megadd-select');
			$this.after(control);

			// 3. Connect namespaced click event on our control
			// 4. On click: Show the MegaDropDown list
			control.bind("click.megaDropDown", function () {
				console.log("marlun clicked the control");

				var view = $('<div>');
				view.addClass('megadd-list');

				// Add all of the select options as items in the list
				optionElements.each(function (idx, optionElement) {
					var item = $('<p>');
					item.html($(optionElement).html());
					item.data('value', $(optionElement).val());

					// 5. Connect events to the items in the list
					item.bind('click.megaDropDown', function () {
						console.log("Clicked element value: " + $(this).data('value'));
						// 6. On click event
						// 6.1 Set the correct values on the original select
						var selectElement = $(this).closest('select');
						selectElement.val($(this).data('value'));
						// 6.2 Update MegaDropDown control to show the selected value
						var megaDropDownSelect = $(this).closest('.megaadd-select');
						megaDropDownSelect.html($(this).html());
					});

					view.append(item);
				});

				// Show the list after the dropdown control
				$(this).after(view);
			});
		});
	};
})( jQuery );
