// $(document).ready(function(){
	$('.addfield').live('click', function(){
		var attribute = $(this).attr('title');
		construct(attribute);
	});
	$('#formProp .field').live('change', function(){
		var name = $(this).attr('name');
		var value = $(this).val();
		var attribute = $(this).parent().attr('title');
		var parentid = $(this).parent().attr('id');
		reConstruct(attribute,name,value,parentid);
	});


// });