	// ADD FIELD ELEMENT TO VIEW
	$('.addfield').live('click', function(){
	    var selected = $(this).attr('title');
	    selectField(selected,  true);
	    return false;
	});

	// VIEW ACTION
	$('.viewField').live('click', function(){ 
		$(".edit").editable("vis_edit/save.php");
		$('.viewField').removeClass('fieldselected');
		$(this).toggleClass('fieldselected');
		var inputTypes = [];
		$('.field[name]', this).each(function(){
		    inputTypes.push($(this).attr('name'),$(this).attr('class'),$(this).attr('value'));
		});

		var rowid = $(this).attr('id').split("_");
		var getid = $('h3', this).attr('title');

	    selectField(getid, false, rowid[1]);
	    parseProperties(inputTypes);

	    console.log('viewField.click: ',getid, rowid);
	});

	$('.field').live('change', function(){
		var val = $(this).val();
		$(this).attr('value',val);
	});

	// PROPERTIES ACTION
	$('.property').live('change', function(){ 
		var parentid 	= this.parentNode.id.split("_");
		var indexid 	= '#edit_'+parentid[1];
		var element		= $(this).attr('id'); //only for group, return indexid & type
		var val 		= $(this).val();
		var name 		= $(this).attr('name');
		var field 		= (typeof element != 'undefined')? ' .field.'+element : ' .field';

		console.log('property.change: ',parentid,element,indexid,field,val,name);

		switch(name){
			case 'label':
				$(indexid+' label').html(val);
			break;
			case 'cols':
			case 'name':
			case 'rows':
			case 'value':
			case 'onclick':
				$(indexid + field).attr(name, val);
			break;
			case 'required':
				target.toggleClass('required');
			break;
			case 'option':
				constructOption(indexid + field, val, (element == 'chain')); //chain select == true
			break;
			case 'date': // SELECT DATE
				constructDate(indexid + field, val, indexid, element);
			break;
			case 'groupName':
				$(indexid + field).attr('name', val+'[]');
			break;
			case 'groupValue':
				constructGroupOptions(indexid, val, indexid, element);
			break;
		// TBAdd
		// constructOption as filtration, split to 3 view( date, chain, group, select)
		}
	});