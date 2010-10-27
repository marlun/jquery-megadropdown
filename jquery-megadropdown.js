(function($) {
	$.fn.megaDropDown = function() {

    return this.each(function() {

      var $this = $(this);
      var value = $this.val();
      var selected = $this.find("option[value='" + value + "']:first");
			var options = $this.find("option");
						
			// 1. Dölja $this
			$this.hide();
			
			// 2. Lägga in ny html på selectens plats
			var control = $('<div>' + selected.html() + '</div>');
			$this.after(control);
			
			// 3. Koppla namespacat event till nya html koden
			// 4. Vid klick/event vissa själva listan
			control.bind("click.megaDropDown", function (){
				console.log("marlun clicked the control");
				
				var view = $('<div></div>');
				
			});
						
			
			// 5. Koppla event till alternativ i listan
			
			// 6. Fånga event och sätta värdet som klickades i den dolda selecten, och uppdatera vår control
      
    });

  };
})( jQuery );
