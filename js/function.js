function construct(request){
    var element, type, options, rowid;

    rowid       = (typeof rowid == 'undefined')? $("#formView h3").length+1 : rowid;
    options     = request.split('_');
    element     = options[0];
    type        = options[1];

    viewElement(element,type,rowid,request);
    propElement(element,type,rowid,request);

    // console.log('construct: ', request,field,type,field,attribute,type,validation);
}

function reConstruct(attribute,name,value,parentid){
    console.log('reConstruct: ', attribute,name,value,parentid);
    var editField = $('#formView #'+parentid+' .field');

    if(value == ''){
        editField.removeAttr(name);
    } else {
        editField.attr(name,value);
    }



}

function viewElement(element,type,rowid,request){
    var field;
    var viewContainer   = $(getContainer(rowid,request));
    var formView        = $('#formView .fields');
    var counter         = $('<h3>'+rowid+'</h3>');
    field               = getField(element,type);

    formView.append(viewContainer);
    viewContainer.append(counter);
    viewContainer.append(field);
}

function propElement(element,type,rowid,request){
    var type,attributes,field,attrType,attrField;
    var propContainer   = $(getContainer(rowid,request));
    var formProp        = $('#formProp .fields');

    formProp.html('');
    formProp.append(propContainer);

    attributes   = getAttr(element,type);
    console.log('getAttr: ',attributes);

    $.each(attributes, function(key, val) {
        attrType    = (val == 'format')? 'select': element;
        attrField   = getField(attrType,val,key);
        propContainer.append(attrField);
        console.log('attributes: ', key, val);
    });
    // type        = getType(element);
    // validation  = getValidation(element);

    // console.log('propElement: ', element,type,rowid,request);
}

function getContainer(rowid,request) {
    var container = '<div class="rows" id="row_'+rowid+'" title="'+request+'"></div>';
    return container;
}

function getField(field,type,name){
    name = (typeof name == 'undefined')? type : name;
    var addname     = addAttr('name',name);
    var addtype     = addAttr('type',type);
    var addlabel    = (typeof name == 'undefined')? '<label>'+type+'</label>' : '<label>'+name+'</label>';
    var element;
    switch(field){
        case 'input':
            element = addlabel+'<input class="field"'+addtype+addname+' />';
        break;
        case 'textarea':
            element = addlabel+'<textarea class="field"'+addname+' />';
        break;
        case 'select':
            element = addlabel+'<select class="field"'+addname+' />';
        break;
    }
    return element;
}

function getAttr(field,type){
    var attribute = {'class':'text','id':'text','value':'text','name':'text'};
    switch(field){
        case 'input':
            // if(type == 'text'){
                // attribute.push('type':'text','size':'text','maxlength':'text','format':'text');
                attribute = {'type':'text','size':'text','maxlength':'text','format':'text'}; 
            // }
        break;
        case 'textarea':
            attribute.push('cols','rows');
        break;
        case 'select':
            attribute.push('type','size','format');
        break;
    }
    return attribute;
}

function addAttr(name,val){
    if(typeof name == 'undefined') {
        return false;
    } else {
        return ' '+name+'="'+val+'"';
    }
}

function getType(field){
    var type = [];
    switch(field){
        case 'input':
            type.push('checkbox','button','hidden','radio','reset','submit','text');
        break;
        case 'select':
            type.push('format','chain_select','single','date');
        break;
    }
    return type.sort();
}

function getValidation(field){
    var validation = [];    
    switch(field){
        case 'input':
        case 'textarea':
            validation.push('required','disabled','readonly');
        break;
        case 'select':
            validation.push('required');
        break;
    }
    return validation;
}