	// PARSE FIELD SETTING
	function parseProperties(inputTypes){
		// console.log(inputTypes);
		return false;
	}

	// VIEW
	// selectField() -> addProperties() -> this
	function viewField(type,element,viewid){
		console.log('viewField: ',type,element,viewid);
		var field;
		open 		= '<div class="viewField rows_horizontal" id="edit_'+viewid+'"><h3 class="number" title="'+element+'_'+type+'">'+viewid+'</h3><div id="container_'+type+'">';
		close 		= '</div><input type="button" value="-" class="remove"></div>';
		label 		= '<label for="'+type+'" class="edit">'+element+'</label>';

		switch(element){
			case 'text':
			case 'input':
			case 'radio':
			case 'checkbox':
			case 'hidden':
				field = open+label+'<input class="fetch field '+type+'" name="'+type+'" type="'+element+'" value="'+type+'">'+close;
			break;
			case 'select':
				field = open+label+'<select class="fetch field '+type+'" name="'+type+'"></select>'+close;
			break;
			case 'textarea':
				field = open+label+'<textarea class="fetch field '+type+'" name="'+element+'" value=""></textarea>'+close;
			break;
		}

		return field;
	}

	// PROPERTIES
	// load selected field properties 
	// selectField() -> addProperties() -> this
	function propertiesField(property,type,element,rowid,elementid) { 
		console.log('propertiesField: ',property,type,element,rowid);
		var field;

		var label = '<label for="'+property+'">'+property+'</label>';

		switch(property) {
			case 'required': //checkbox
				field = label+'<input type="checkbox" class="property" name="'+property+'" value="1">';
			break;
			case 'name':
			case 'value':
			case 'onclick':
			case 'cols':
			case 'rows': //text
				field = label+'<input type="text" class="property" name="'+property+'" value="">';
			break;
			case 'groupValue': //textarea
				field = label+'<textarea class="property" name="'+property+'" id="'+element+'"></textarea>';
			break;
			case 'option':
				field = label+'<textarea class="property" name="'+property+'" id="'+type+'"></textarea>';
			break;
			case 'region': //select
			case 'select':
				field = label+'<select id="'+type+'" name="'+property+'" class="property">';
				field += propertiesSelect(property)+'</select>';
			break;
		}
		return '<div class="properties" id="prop_'+elementid+'">'+field+'</div>';
	}

	function propertiesSelect(property){
		var option, options;
		switch(property){
			case 'region':
				options = ['US', 'International'];
			break;
			case 'select':
				options = ['MMYYYY', 'YYYY'];
			break;
		}
		option += '<option value="">Please Select...</option>';
		$.each(options, function(val, val) {
			option += '<option value="'+val+'">'+val+'</option>';
		});
		return option;
	}


	// FIELDS
	// load selected field setting 
	// $(event) -> this
	function selectField(getid,added,rowid){
		rowid = (typeof rowid == 'undefined')? $("#formView h3").length+1 : rowid;

		console.log('selectField: ',getid,added,rowid);
		var getid 	= getid.split("_"); // 0 = element type, 1 = group
		element 	= getid[0];
		type 		= getid[1];		

		var properties;
		switch(type){
			case 'email':
			case 'text':
			default:
				properties = ['required','name'];
			break;
			case 'postcode':
			case 'phone':
				properties = ['required','name','region'];
			break;
			case 'button':
			case 'reset':
			case 'submit':
				properties = ['name','onclick'];
			break;
			case 'textarea':
				properties = ['required','name','cols','rows'];
			break;
			case 'group':
				properties = ['required','groupValue'];
			break;
			case 'hidden':
			case 'checkbox':
				properties = ['required','name','value'];
			break;
			case 'select':
			case 'chain':
				properties = ['required','option'];
			break;
			case 'date':
				properties = ['required','select'];
			break;
		}

	   	addProperties(properties,element,type,added,rowid);
    	return false;
	}


	// Add field properties input
	// selectField() -> this
	function addProperties(properties,element,type,added,rowid) {
		console.log('addProperties: ',properties,element,type,added,rowid);
		var viewid;
		$('.element').removeAttr("id");
		$('.element').html('');
		if(added) { //true = add field
			for (var i = 0; i < properties.length; i++) {
				$('.element').append(propertiesField(properties[i],type,element,rowid,i)).attr('id','element_'+rowid);
			}			
				$('.view').append(viewField(type,element,rowid));
		} else { //false = load field
			for (var i = 0; i < properties.length; i++) {
				$('.element').append(propertiesField(properties[i],type,element,rowid,i)).attr('id','element_'+rowid);
			}
		}
    	return false;
	}

	// Applied to Select & Chain Select values
	// constructOption() -> this
	function extractVal(a,separator) {
		a = a.split(separator);
		var b = [a[0]], i, j, tmp;
		for (i = 1; i < a.length; i++) {
			tmp = 1;
		for (j = 0; j < b.length; j++) {
			if (a[i] == b[j]) { tmp = 0; break; }
		}
		if (tmp) { b.push(a[i]); }
		}
		return b.sort();
	}

	// search string in haystack
	// constructOption() -> this
	function strstr(haystack, needle) {
	    var i = 0,
	        tempLength = 0,
	        temp = [];
	    for (;;) {
	        if (haystack[i] === undefined || needle == null) {
	            // return "No match";
	            return false;
	        }
	        //if the char doesn't match then reset
	        else if (haystack[i] !== needle[tempLength]) {
	            temp = [];
	            tempLength = 0;
	        } 
	        //the char matches so let's store it.
	        else if (haystack[i] === needle[tempLength]) {
	            temp[tempLength] = haystack[i];
	            if (needle[tempLength + 1] === undefined) {
	                // return temp;
	                return true;
	            }
	            tempLength++;
	        }
	     i++;
	   }
	}

	function constructDate(target, thatval, type, element) {
		// TBAdd
		// 
		console.log('constructDate: ',target, thatval, type, element);

		$(target +" option").remove();
		var index = target.split("_");
		index = index[1].replace(' .field','');
		var myDate 	= new Date();
		var years 	= new Array();
		var month 	= new Array();
		var months 	= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for(var i = 0; i < 3; i++){
			var year = myDate.getFullYear()+i;
			if(year == myDate.getFullYear()){
				year += '{SELECTED}';
			}
			years.push(year);
		}
		$.each(months, function(key, value){
			if(key == myDate.getMonth()+1){
				value += '{SELECTED}';
			}
			month.push(value);
		});
		var option = [];
		switch(thatval){
			case 'MMYYYY':
				option.push(month);
				option.push(years);
			break;
			case 'YYYY':
				option.push(years);
			break;
		}
		var options = new Array();
		options.push(option);
		var select,groupname;
		$('.element .name').remove();


		$('#container_date').html('');
		$.each(option, function(vals) {
			name = '<div id="prop_'+index[0]+'" class="properties"><label for="name">name '+vals+'</label><input type="text" value="" name="name" class="property" id="date_'+vals+'"></div>';
			$('.element').append(name);

			select = '</br><label class="edit" for="date">select</label><select name="date" class="fetch field date_'+vals+'"></select></br>';
			$('#container_date').append(select);
			$(target + '.date_'+vals).append(new Option('Please Select...',''));	
			$.each(option[vals], function(val, val) {
			var selected = false;			
				if(val != ''){
					// focus selected value
					if(strstr(val, '{SELECTED}')){
						val = val.replace('{SELECTED}','');
						selected = true;
					}
			    	$(target + '.date_'+vals).append(new Option(val,val,selected));
				}
			});
		});
	}

	// Applied to Select & Chain Select
	// $(event) -> this
	function constructOption(target, thatval, chainselect) { 
		console.log('constructOption: ',target, thatval, chainselect);

		$('.element .selections').remove();
		$(target +" option").remove();

		if(chainselect) {
			$('#container_chain').html('');
			var cloneselect = '</br><label class="edit" for="chain">select</label><select name="chain" class="fetch field chain_1"></select></br>';
			cloneselect += '</br><label class="edit" for="chain">select</label><select name="chain" class="fetch field chain_2"></select></br>';
			$('#container_chain').append(cloneselect);
		}

		var index = target.split("_");
		index = index[1].replace(' .field','');
		var options = extractVal(thatval,"\n");


		// TBAdd
		// Chain Level i.e. 2 levels, 3 levels
		// start crate level loop
		$('.element .name').remove();
		name = '<div id="prop_'+index[0]+'" class="properties"><label for="name">name 1</label><input type="text" value="" name="name" class="property" id="chain_1"></div>';
		name += '<div id="prop_'+index[0]+'" class="properties"><label for="name">name 2</label><input type="text" value="" name="name" class="property" id="chain_2"></div>';
		$('.element').append(name);
		// end create loop


		var i=0;
		var count;
		if(chainselect){
			// append container
    		var selections = '<div class="selections prop_'+index[0]+'"></div>';
    		$('.element').append(selections);
    	}


		$('#edit_1 .field').append(new Option('Please Select...',''));
		$.each(options, function(val, val) {
		var selected = false;
			if(val != ''){
				// focus selected value
				if(strstr(val, '{SELECTED}')){
					val = val.replace('{SELECTED}','');
					selected = true;
				}
				if(chainselect){
					index = i++;
		    		$(target + '_1').append(new Option(val,index,selected));
		    		// clone options properties
		    		var clone = '<label for="'+val+'">'+val+'</label><textarea name="option'+ index +'" class="property" id="chain_'+index+'"></textarea>';
		    		$('.selections').append(clone);
				} else {
					// construct <options>
		    		$(target).append(new Option(val,val,selected));
				}
			}
		});
		// construct chain select array
		$('.selections').live('change', function(){	
    		window.chain_sel = new Array();
			$('.property[name]', this).each(function(){
				var chain_val = extractVal($(this).attr('value'),"\n");
				if(chain_val != ''){
					chain_sel.push(chain_val);
				}
			});
		});	

		// reconstruct <options> according to selection
		// only for chain select
		$(target + '_1').live('change', function(){
			$(target + '_2 option').remove();
			var val = $(this).val();	
			$(target + '_2').append(new Option('Please Select...',''));		
			$.each(window.chain_sel[val], function(val, val) {
				if(val != ''){
			    	$(target + '_2').append(new Option(val,val));
				}
			});
		});

	}


	function constructGroupOptions(target, thatval, type, element){
		$('.element .selections').remove();
		console.log('constructGroupOptions: ',target, thatval, type, element);

		$(target +" option").remove();
		var index = target.split("_");
		index = index[1].replace(' .field','');
		var options = extractVal(thatval,"\n");

		var i=0;
		var count, option, property, groupname, selections;
		// append container
		$('.element .groupname').remove();
		groupname = '<div id="prop_'+index[0]+'" class="properties groupname"><label for="groupName">groupName</label><input type="text" value="" name="groupName" class="property"></div>';
		$('.element').append(groupname);

		selections = '<div id="prop_'+index[0]+'" class="selections prop_'+index[0]+'"></div>';
		$('.element').append(selections);

		$(target + ' #container_group').html('');
		$.each(options, function(val, val) {
			if(val != ''){
				index = i++;
	    		// clone optiones
	    		option = '</br><label class="edit" for="goption">'+val+'</label><input type="'+element+'" value="'+val+'" name="goption" class="field '+element+'_'+ index +'"></br>';
	    		$(target + ' #container_group').append(option);
	    		// clone options properties
	    		property = '<label for="'+val+'">Value '+ index +'</label><input type="text" value="'+val+'" name="value" class="property" id="'+element+'_'+ index +'">';
	    		$('.selections').append(property);
			}

		});
	}