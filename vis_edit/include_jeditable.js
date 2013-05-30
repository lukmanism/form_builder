(function(e){function t(e,n){return this instanceof t?this.init(e,n):new t(e,n)}e.fn.document=function(){var t=this[0];if(t.nodeName.toLowerCase()=="iframe")return t.contentWindow.document;else return e(this)};e.fn.documentSelection=function(){var e=this[0];if(e.contentWindow.document.selection)return e.contentWindow.document.selection.createRange().text;else return e.contentWindow.getSelection().toString()};e.fn.wysiwyg=function(n){if(arguments.length>0&&arguments[0].constructor==String){var r=arguments[0].toString();var i=[];for(var s=1;s<arguments.length;s++)i[s-1]=arguments[s];if(r in t){return this.each(function(){e.data(this,"wysiwyg").designMode();t[r].apply(this,i)})}else return this}var o={};if(n&&n.controls){var o=n.controls;delete n.controls}var n=e.extend({html:"<"+'?xml version="1.0" encoding="UTF-8"?'+'><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">STYLE_SHEET</head><body>INITIAL_CONTENT</body></html>',css:{},debug:false,autoSave:true,rmUnwantedBr:true,controls:{},messages:{}},n);e.extend(n.messages,t.MSGS_EN);e.extend(n.controls,t.TOOLBAR);for(var u in o){if(u in n.controls)e.extend(n.controls[u],o[u]);else n.controls[u]=o[u]}return this.each(function(){t(this,n)})};e.extend(t,{insertImage:function(n){var r=e.data(this,"wysiwyg");if(r.constructor==t&&n&&n.length>0)r.editorDoc.execCommand("insertImage",false,n)},createLink:function(n){var r=e.data(this,"wysiwyg");if(r.constructor==t&&n&&n.length>0){var i=e(r.editor).documentSelection();if(i.length>0){r.editorDoc.execCommand("unlink",false,[]);r.editorDoc.execCommand("createLink",false,n)}else if(r.options.messages.nonSelection)alert(r.options.messages.nonSelection)}},clear:function(){var t=e.data(this,"wysiwyg");t.setContent("");t.saveContent()},MSGS_EN:{nonSelection:"select the text you wish to link"},TOOLBAR:{bold:{visible:true,tags:["b","strong"],css:{fontWeight:"bold"}},italic:{visible:true,tags:["i","em"],css:{fontStyle:"italic"}},strikeThrough:{visible:false,tags:["s","strike"],css:{textDecoration:"line-through"}},underline:{visible:false,tags:["u"],css:{textDecoration:"underline"}},separator00:{visible:false,separator:true},justifyLeft:{visible:false,css:{textAlign:"left"}},justifyCenter:{visible:false,tags:["center"],css:{textAlign:"center"}},justifyRight:{visible:false,css:{textAlign:"right"}},justifyFull:{visible:false,css:{textAlign:"justify"}},separator01:{visible:false,separator:true},indent:{visible:false},outdent:{visible:false},separator02:{visible:false,separator:true},subscript:{visible:false,tags:["sub"]},superscript:{visible:false,tags:["sup"]},separator03:{visible:false,separator:true},undo:{visible:false},redo:{visible:false},separator04:{visible:false,separator:true},insertOrderedList:{visible:false,tags:["ol"]},insertUnorderedList:{visible:false,tags:["ul"]},insertHorizontalRule:{visible:false,tags:["hr"]},separator05:{separator:true},createLink:{visible:true,exec:function(){var t=e(this.editor).documentSelection();if(t.length>0){if(e.browser.msie)this.editorDoc.execCommand("createLink",true,null);else{var n=prompt("URL","http://");if(n&&n.length>0){this.editorDoc.execCommand("unlink",false,[]);this.editorDoc.execCommand("createLink",false,n)}}}else if(this.options.messages.nonSelection)alert(this.options.messages.nonSelection)},tags:["a"]},insertImage:{visible:true,exec:function(){if(e.browser.msie)this.editorDoc.execCommand("insertImage",true,null);else{var t=prompt("URL","http://");if(t&&t.length>0)this.editorDoc.execCommand("insertImage",false,t)}},tags:["img"]},separator06:{separator:true},h1mozilla:{visible:true&&e.browser.mozilla,className:"h1",command:"heading",arguments:["h1"],tags:["h1"]},h2mozilla:{visible:true&&e.browser.mozilla,className:"h2",command:"heading",arguments:["h2"],tags:["h2"]},h3mozilla:{visible:true&&e.browser.mozilla,className:"h3",command:"heading",arguments:["h3"],tags:["h3"]},h1:{visible:true&&!e.browser.mozilla,className:"h1",command:"formatBlock",arguments:["h1"],tags:["h1"]},h2:{visible:true&&!e.browser.mozilla,className:"h2",command:"formatBlock",arguments:["h2"],tags:["h2"]},h3:{visible:true&&!e.browser.mozilla,className:"h3",command:"formatBlock",arguments:["h3"],tags:["h3"]},separator07:{visible:false,separator:true},cut:{visible:false},copy:{visible:false},paste:{visible:false},separator08:{separator:true&&!e.browser.msie},increaseFontSize:{visible:true&&!e.browser.msie,tags:["big"]},decreaseFontSize:{visible:true&&!e.browser.msie,tags:["small"]},separator09:{separator:true},html:{visible:false,exec:function(){if(this.viewHTML){this.setContent(e(this.original).val());e(this.original).hide()}else{this.saveContent();e(this.original).show()}this.viewHTML=!this.viewHTML}},removeFormat:{visible:true,exec:function(){this.editorDoc.execCommand("removeFormat",false,[]);this.editorDoc.execCommand("unlink",false,[])}}}});e.extend(t.prototype,{original:null,options:{},element:null,editor:null,init:function(t,n){var r=this;this.editor=t;this.options=n||{};e.data(t,"wysiwyg",this);var i=t.width||t.clientWidth;var s=t.height||t.clientHeight;if(t.nodeName.toLowerCase()=="textarea"){this.original=t;if(i==0&&t.cols)i=t.cols*8+21;if(s==0&&t.rows)s=t.rows*16+16;var o=this.editor=e("<iframe></iframe>").css({minHeight:(s-6).toString()+"px",width:(i-8).toString()+"px"}).attr("id",e(t).attr("id")+"IFrame");if(e.browser.msie){this.editor.css("height",s.toString()+"px")}}var u=this.panel=e("<ul></ul>").addClass("panel");this.appendControls();this.element=e("<div></div>").css({width:i>0?i.toString()+"px":"100%"}).addClass("wysiwyg").append(u).append(e("<div><!-- --></div>").css({clear:"both"})).append(o);e(t).hide().before(this.element);this.viewHTML=false;this.initialHeight=s-8;this.initialContent=e(t).text();this.initFrame();if(this.initialContent.length==0)this.setContent("");if(this.options.autoSave)e("form").submit(function(){r.saveContent()})},initFrame:function(){var t=this;var n="";if(this.options.css&&this.options.css.constructor==String)n='<link rel="stylesheet" type="text/css" media="screen" href="'+this.options.css+'" />';this.editorDoc=e(this.editor).document();this.editorDoc.open();this.editorDoc.write(this.options.html.replace(/INITIAL_CONTENT/,this.initialContent).replace(/STYLE_SHEET/,n));this.editorDoc.close();this.editorDoc.contentEditable="true";this.editorDoc_designMode=false;try{this.editorDoc.designMode="on";this.editorDoc_designMode=true}catch(r){e(this.editorDoc).focus(function(){t.designMode()})}if(e.browser.msie){setTimeout(function(){e(t.editorDoc.body).css("border","none")},0)}e(this.editorDoc).click(function(e){t.checkTargets(e.target?e.target:e.srcElement)});e(this.original).focus(function(){e(t.editorDoc.body).focus()});if(this.options.autoSave){e(this.editorDoc).keydown(function(){t.saveContent()}).mousedown(function(){t.saveContent()})}if(this.options.css){setTimeout(function(){if(t.options.css.constructor==String){}else e(t.editorDoc).find("body").css(t.options.css)},0)}},designMode:function(){if(!this.editorDoc_designMode){try{this.editorDoc.designMode="on";this.editorDoc_designMode=true}catch(e){}}},getContent:function(){return e(e(this.editor).document()).find("body").html()},setContent:function(t){e(e(this.editor).document()).find("body").html(t)},saveContent:function(){if(this.original){var t=this.getContent();if(this.options.rmUnwantedBr)t=t.substr(-4)=="<br>"?t.substr(0,t.length-4):t;e(this.original).val(t)}},appendMenu:function(t,n,r,i){var s=this;var n=n||[];e("<li></li>").append(e("<a><!-- --></a>").addClass(r||t)).mousedown(function(){if(i)i.apply(s);else s.editorDoc.execCommand(t,false,n);if(s.options.autoSave)s.saveContent()}).appendTo(this.panel)},appendMenuSeparator:function(){e('<li class="separator"></li>').appendTo(this.panel)},appendControls:function(){for(var e in this.options.controls){var t=this.options.controls[e];if(t.separator){if(t.visible!==false)this.appendMenuSeparator()}else if(t.visible){this.appendMenu(t.command||e,t.arguments||[],t.className||t.command||e||"empty",t.exec)}}},checkTargets:function(t){for(var n in this.options.controls){var r=this.options.controls[n];var i=r.className||r.command||n||"empty";e("."+i,this.panel).removeClass("active");if(r.tags){var s=t;do{if(s.nodeType!=1)break;if(e.inArray(s.tagName.toLowerCase(),r.tags)!=-1)e("."+i,this.panel).addClass("active")}while(s=s.parentNode)}if(r.css){var s=e(t);do{if(s[0].nodeType!=1)break;for(var o in r.css)if(s.css(o).toString().toLowerCase()==r.css[o])e("."+i,this.panel).addClass("active")}while(s=s.parent())}}}})})(jQuery);
(function($){$.fn.editable=function(e,t){if("disable"==e){$(this).data("disabled.editable",true);return}if("enable"==e){$(this).data("disabled.editable",false);return}if("destroy"==e){$(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");return}var n=$.extend({},$.fn.editable.defaults,{target:e},t);var r=$.editable.types[n.type].plugin||function(){};var i=$.editable.types[n.type].submit||function(){};var s=$.editable.types[n.type].buttons||$.editable.types["defaults"].buttons;var o=$.editable.types[n.type].content||$.editable.types["defaults"].content;var u=$.editable.types[n.type].element||$.editable.types["defaults"].element;var a=$.editable.types[n.type].reset||$.editable.types["defaults"].reset;var f=n.callback||function(){};var l=n.onedit||function(){};var c=n.onsubmit||function(){};var h=n.onreset||function(){};var p=n.onerror||a;if(n.tooltip){$(this).attr("title",n.tooltip)}n.autowidth="auto"==n.width;n.autoheight="auto"==n.height;return this.each(function(){var e=this;var t=$(e).width();var d=$(e).height();$(this).data("event.editable",n.event);if(!$.trim($(this).html())){$(this).html(n.placeholder)}$(this).bind(n.event,function(h){if(true===$(this).data("disabled.editable")){return}if(e.editing){return}if(false===l.apply(this,[n,e])){return}h.preventDefault();h.stopPropagation();if(n.tooltip){$(e).removeAttr("title")}if(0==$(e).width()){n.width=t;n.height=d}else{if(n.width!="none"){n.width=n.autowidth?$(e).width():n.width}if(n.height!="none"){n.height=n.autoheight?$(e).height():n.height}}if($(this).html().toLowerCase().replace(/(;|")/g,"")==n.placeholder.toLowerCase().replace(/(;|")/g,"")){$(this).html("")}e.editing=true;e.revert=$(e).html();$(e).html("");var v=$("<form />");if(n.cssclass){if("inherit"==n.cssclass){v.attr("class",$(e).attr("class"))}else{v.attr("class",n.cssclass)}}if(n.style){if("inherit"==n.style){v.attr("style",$(e).attr("style"));v.css("display",$(e).css("display"))}else{v.attr("style",n.style)}}var m=u.apply(v,[n,e]);var g;if(n.loadurl){var y=setTimeout(function(){m.disabled=true;o.apply(v,[n.loadtext,n,e])},100);var b={};b[n.id]=e.id;if($.isFunction(n.loaddata)){$.extend(b,n.loaddata.apply(e,[e.revert,n]))}else{$.extend(b,n.loaddata)}$.ajax({type:n.loadtype,url:n.loadurl,data:b,async:false,success:function(e){window.clearTimeout(y);g=e;m.disabled=false}})}else if(n.data){g=n.data;if($.isFunction(n.data)){g=n.data.apply(e,[e.revert,n])}}else{g=e.revert}o.apply(v,[g,n,e]);m.attr("name",n.name);s.apply(v,[n,e]);$(e).append(v);r.apply(v,[n,e]);$(":input:visible:enabled:first",v).focus();if(n.select){m.select()}m.keydown(function(t){if(t.keyCode==27){t.preventDefault();a.apply(v,[n,e])}});var y;if("cancel"==n.onblur){m.blur(function(t){y=setTimeout(function(){a.apply(v,[n,e])},500)})}else if("submit"==n.onblur){m.blur(function(e){y=setTimeout(function(){v.submit()},200)})}else if($.isFunction(n.onblur)){m.blur(function(t){n.onblur.apply(e,[m.val(),n])})}else{m.blur(function(e){})}v.submit(function(t){if(y){clearTimeout(y)}t.preventDefault();if(false!==c.apply(v,[n,e])){if(false!==i.apply(v,[n,e])){if($.isFunction(n.target)){var r=n.target.apply(e,[m.val(),n]);$(e).html(r);e.editing=false;f.apply(e,[e.innerHTML,n]);if(!$.trim($(e).html())){$(e).html(n.placeholder)}}else{var s={};s[n.name]=m.val();s[n.id]=e.id;if($.isFunction(n.submitdata)){$.extend(s,n.submitdata.apply(e,[e.revert,n]))}else{$.extend(s,n.submitdata)}if("PUT"==n.method){s["_method"]="put"}$(e).html(n.indicator);var o={type:"POST",data:s,dataType:"html",url:n.target,success:function(t,r){if(o.dataType=="html"){$(e).html(t)}e.editing=false;f.apply(e,[t,n]);if(!$.trim($(e).html())){$(e).html(n.placeholder)}},error:function(t,r,i){p.apply(v,[n,e,t])}};$.extend(o,n.ajaxoptions);$.ajax(o)}}}$(e).attr("title",n.tooltip);return false})});this.reset=function(t){if(this.editing){if(false!==h.apply(t,[n,e])){$(e).html(e.revert);e.editing=false;if(!$.trim($(e).html())){$(e).html(n.placeholder)}if(n.tooltip){$(e).attr("title",n.tooltip)}}}}})};$.editable={types:{defaults:{element:function(e,t){var n=$('<input type="hidden"></input>');$(this).append(n);return n},content:function(e,t,n){$(":input:first",this).val(e)},reset:function(e,t){t.reset(this)},buttons:function(e,t){var n=this;if(e.submit){if(e.submit.match(/>$/)){var r=$(e.submit).click(function(){if(r.attr("type")!="submit"){n.submit()}})}else{var r=$('<button type="submit" />');r.html(e.submit)}$(this).append(r)}if(e.cancel){if(e.cancel.match(/>$/)){var i=$(e.cancel)}else{var i=$('<button type="cancel" />');i.html(e.cancel)}$(this).append(i);$(i).click(function(r){if($.isFunction($.editable.types[e.type].reset)){var i=$.editable.types[e.type].reset}else{var i=$.editable.types["defaults"].reset}i.apply(n,[e,t]);return false})}}},text:{element:function(e,t){var n=$("<input />");if(e.width!="none"){n.width(e.width)}if(e.height!="none"){n.height(e.height)}n.attr("autocomplete","off");$(this).append(n);return n}},textarea:{element:function(e,t){var n=$("<textarea />");if(e.rows){n.attr("rows",e.rows)}else if(e.height!="none"){n.height(e.height)}if(e.cols){n.attr("cols",e.cols)}else if(e.width!="none"){n.width(e.width)}$(this).append(n);return n}},select:{element:function(e,t){var n=$("<select />");$(this).append(n);return n},content:function(data,settings,original){if(String==data.constructor){eval("var json = "+data)}else{var json=data}for(var key in json){if(!json.hasOwnProperty(key)){continue}if("selected"==key){continue}var option=$("<option />").val(key).append(json[key]);$("select",this).append(option)}$("select",this).children().each(function(){if($(this).val()==json["selected"]||$(this).text()==$.trim(original.revert)){$(this).attr("selected","selected")}})}}},addInputType:function(e,t){$.editable.types[e]=t}};$.fn.editable.defaults={name:"value",id:"id",type:"text",width:"auto",height:"auto",event:"click.editable",onblur:"cancel",loadtype:"GET",loadtext:"Loading...",placeholder:"Click to edit",loaddata:{},submitdata:{},ajaxoptions:{}}})(jQuery);
$.editable.addInputType("wysiwyg",{element:function(e,t){var n=$("<textarea>").css("opacity","0");if(e.rows){n.attr("rows",e.rows)}else{n.height(e.height)}if(e.cols){n.attr("cols",e.cols)}else{n.width(e.width)}$(this).append(n);return n},content:function(e,t,n){$("textarea",this).text(e)},plugin:function(e,t){var n=this;e.wysiwyg=$.extend({autoSave:false},e.wysiwyg);if(e.wysiwyg){setTimeout(function(){$("textarea",n).wysiwyg(e.wysiwyg)},0)}else{setTimeout(function(){$("textarea",n).wysiwyg()},0)}},submit:function(e,t){var n=$("iframe",this).get(0);var r=typeof n.contentDocument=="undefined"?n.contentWindow.document.body:n.contentDocument.body;var i=$(r).html();$("textarea",this).val(i)}});
