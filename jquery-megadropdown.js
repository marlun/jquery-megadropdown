(function($) {
	$.fn.megaDropDown = function() {

		return this.each(function() {

			var $this = $(this);
			var value = $this.val();
			var selected = $this.find("option[value='" + value + "']:first");
			var options = $this.find("option");

			// 1. Hide the old HTML control
			$this.hide();

			// 2. Show our control's HTML
			var control = $('<div>' + selected.html() + '</div>');
			$this.after(control);

			// 3. Connect namespaced click event on our control
			// 4. On click: Show the MegaDropDown list
			control.bind("click.megaDropDown", function (){
				console.log("marlun clicked the control");

				var view = $('<div></div>');

			});


			// 5. Connect events to the items in the list

			// 6. On click event
			// 6.1 Set the correct values on the original select
			// 6.2 Update MegaDropDown control to show the selected value

		});

	};
})( jQuery );
