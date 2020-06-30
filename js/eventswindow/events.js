$(".draggable-element").draggable({containment :"#mibody", scroll:false, handle: ".card-header"});
// $(".resize-element").resizable({containment :"#mibody",scroll:false});

$('.card').on('click', '.btn-close', function(event) { //cerrar card con btn-close
	event.preventDefault();
	$(this).parents('.card').removeClass('visible').addClass('notvisible');
});

