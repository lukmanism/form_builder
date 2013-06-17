$(document).ready(function(){
	
	$('.addfield').live('click', function(){
		var attribute = $(this).attr('title');
		constructProp(attribute);
	});

	$('#formProp .field').live('change', function(){
		var name 		= $(this).attr('name');
		var value 		= $(this).val();
		var attribute 	= $(this).parent().attr('title');
		var parentid 	= $(this).parent().attr('id');		
		constructView(attribute,name,value,parentid,'view');
	});

	$('#formView .rows').live('click', function(){
		var attribute 	= $(this).attr('title');
		var parentid	= $(this).attr('id');
		reconstructProp(attribute,$(':input', this),parentid);
	});


});