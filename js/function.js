function constructProp(request,reload){
    var element, type, options, rowid;

    rowid       = (typeof rowid == 'undefined')? $("#formView h3").length+1 : rowid;
    options     = request.split('_');
    element     = options[0];
    type        = options[1];

    if(!reload){
        viewElement(element,type,rowid,request);        
    }
    propElement('input',type,rowid,request);
}

function reconstructProp(request,object,rowid){
    var element, type, options;
    rowids      = rowid.split('_');
    options     = request.split('_');
    element     = options[0];
    type        = options[1];
    $('#formProp .fields').html('');

    propElement('input',type,rowids[1],request);

    attributes  = getAttr(type);
    $.each(attributes, function(key, val) {
        constructView(request,val[0],object.attr(val[0]),rowid,'prop');
    });
}

function constructView(attribute,name,value,parentid,target){
    console.log('constructView: ', attribute,name,value,parentid,target);
    var attribute, editField;

    if(target == 'view'){
        attribute = attribute.split('_');
        editField = $('#formView #'+parentid+' '+attribute[0]);
        applyAttr(value,name,editField);
        // console.log('constructView: ', attribute[0],name,value,parentid,target);
    } else {
        editField = $('#formProp #'+parentid+' [name=\''+name+'\']');
        applyAttr(value,name,editField);
        // console.log('constructProp: ', name,value,parentid,target);
    }
}

function applyAttr(value,name,object){    
    if(value == ''){
        $(object).removeAttr(name);
    } else {
        $(object).attr(name,value);
    }
}

// View
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

// Properties
function propElement(element,type,rowid,request){
    var type,attributes,field,format,attrType,attrField;
    var propContainer   = $(getContainer(rowid,request));
    var formProp        = $('#formProp .fields');

    formProp.html('');
    formProp.append(propContainer);

    attributes   = getAttr(type);

    $.each(attributes, function(key, val) {
        attrField   = getField(element,val[1],val[0]);
        propContainer.append(attrField);
    });

    //not yet applied
    validation  = getValidation(type);

    if(typeof validation != 'undefined'){
        attrField   = $(getField('select','','validation'));
        $.each(validation, function(tkey, tval) {
            $(attrField[1]).append(new Option(tval[1],tval[0]));
        });
        propContainer.append(attrField);        
    }   
}

function getContainer(rowid,request) {
    var container = '<div class="rows" id="row_'+rowid+'" title="'+request+'"></div>';
    return container;
}

function getField(field,type,name){
    //REVISIT LATER
    name            = (typeof name == 'undefined')? type : name;
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

function getValidation(type){
    var validation  = Array();
    validation      = Array(['','None']);    
    switch(type){
        case 'text':
            validation.push(['email','Email'],['postal','Postal'],['disabled','Disabled'],['readonly','Read Only']);
        break;
        // case 'checkbox':
        // case 'radio':
        // case 'button':
        // case 'submit':
        // case 'submit':
        // break;
        case 'textarea':
            validation.push(['readonly','Read Only']);
        break;
        // case 'chain':
        // case 'single':
        // case 'date':
        // break;
    }
    return validation;
}

function getAttr(type){
    var attribute = Array();
    var attribute = Array(['class','text'],['id','text'],['value','text'],['name','text']);
    
    switch(type){
        case 'text':
            attribute.push(['size','text'],['maxlength','text']); 
        break;
        // case 'checkbox':
        // case 'radio':
        // case 'button':
        // case 'submit':
        // case 'submit':
        // break;
        case 'textarea':
            attribute.push(['cols','text'],['rows','text']); 
        break;
        case 'chain':
        case 'single':
        case 'date':
            attribute.push(['type','text'],['size','text']); 
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

// function getFormat(field){
//     var format = Array(['','Select...']);
//     switch(field){
//         case 'input':
//             format.push(['checkbox','Checkbox'],['button','Button'],['hidden','Hidden'],['radio','Radio'],['reset','Reset'],['submit','Submit'],['text','Text']);
//         break;
//         case 'select':
//             format.push(['format','Format'],['chain_select','Chain Select'],['single','Single'],['date','Date']);
//         break;
//     }
//     return format.sort();
// }
