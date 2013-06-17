/*
Tagger - Converts any text input box into an easy-to-edit multiple-tag interface.
*/

(function($){
    var trim = function(str)
    {
        return str.replace(/^\s+|\s+$/g, '');
    };
    
    var emptyFunction = function(){};
    
    var Tagger = function(element, options)
    {
        var obj = this;
        var element = $(element);
        var container = $('<div></div>');
        var input = $('<input type="text"/>');
        
        var defaults = {
            'class':        'tagger',
            inputAutosize:  true,
            beforeAdd:      emptyFunction,
            afterAdd:       emptyFunction,
            beforeEdit:     emptyFunction,
            afterEdit:      emptyFunction,
            beforeDelete:   emptyFunction,
            afterDelete:    emptyFunction
        };
        
        var config = $.extend(defaults, options || {});
        
        this.getContainer = function()
        {
            return container;
        };
        
        this.getConfig = function()
        {
            return config;
        };
        
        this.addTag = function(tag)
        {
            if (false === config.beforeAdd(tag, obj)) return obj;
            
            if (tag.getContainer !== undefined) {
                input.before(tag.getContainer());
            }
            
            obj.updateRealInput();
            config.afterAdd(tag, obj);
            
            return obj;
        };
        
        if (config['class']) container.addClass(config['class']);
        element.hide(0);
        element.after(container);
        container.append(input);
        
        container.click(function()
        {
            input.focus();
        });
        
        this.insertCurrentInput = function()
        {
            var val = input.val();
            
            if (val) {
                var tag = new Tag(obj);
                tag.setTag(val);
                obj.addTag(tag);
            }
            
            input.val('');
        };
        
        input.keydown(function(event)
        {
            switch (event.keyCode) {
                // comma, enter
                case 188:
                case 13:
                    obj.insertCurrentInput();
                    event.preventDefault();
                    break;
            }
        });
        
        input.keypress(function(event)
        {
            // Detect backspace
            if (event.keyCode != 8) return;
            
            if (!input.val()) {
                // "click" last item
                container.find('span.tag:last').click();
                event.preventDefault();
            }
        });
        
        input.blur(obj.insertCurrentInput);
        
        
        this.autogrow = function()
        {
            if (true != config.inputAutosize) return;
            var size = input.val().length + 1;
            input.attr('size', size);
        };
        
        this.getInput = function()
        {
            return input;
        };
        
        this.createTag = function(tagName)
        {
            var tag = new Tag(obj);
            tag.setTag(tagName);
            obj.addTag(tag);
        };
        
        this.updateRealInput = function()
        {
            var allTags = [];
            container.find('span.tag').each(function()
            {
                allTags.push($(this).text());
            });
            var tags = allTags.join(', ');
            element.val(tags);
        };
        
        input.change(this.autogrow);
        input.keyup(this.autogrow);
        
        // Handle current value
        var tagString = element.val();
        if (tagString) {
            var tags = tagString.split(',');
            $.each(tags, function(index, tagName)
            {
                obj.createTag(tagName);
            });
        }
    };
    
    var Tag = function(tagger)
    {
        var obj = this;
        var tagger = tagger;
        var container = $('<span></span>');
        container.addClass('tag');
        
        this.getContainer = function()
        {
            return container;
        };
        
        this.remove = function()
        {
            return container.remove();
        };
        
        this.setTag = function(newTag)
        {
            tag = trim(newTag);
            if (!tag) {
                if (false === tagger.getConfig().beforeDelete(obj, tagger)) return;
                
                var previous = container.prev('span.tag');
                if (previous.length > 0) {
                    previous.click();
                } else {
                    tagger.getInput().show(0).focus();
                }
                container.remove();
                tagger.getConfig().afterDelete(obj, tagger);
                
                return;
            }
            tagger.getInput().show(0).focus();
            container.text(tag);
            
            tagger.updateRealInput();
        };
        
        this.edit = function(event)
        {
            if (false === tagger.getConfig().beforeEdit(obj, tagger)) return;
            
            tagger.getInput().hide(0);
            var input = $('<input type="text"/>');
            
            var doneEditing = function()
            {
                obj.setTag(input.val());
                input.remove();
                container.removeClass('editing');
            };
            
            input.css({width: container.outerWidth() + 'px'});
            input.val(container.text());
            input.blur(doneEditing);
            input.keydown(function(event)
            {
                switch (event.keyCode) {
                    // comma, enter
                    case 188:
                    case 13:
                        doneEditing();
                        event.preventDefault();
                        break;
                }
            });
            
            input.keypress(function(event)
            {
                // Backspace
                if (event.keyCode != 8) return;
                
                if (!input.val()) {
                    doneEditing();
                    event.preventDefault();
                }
            });
            
            input.click(function(event)
            {
                event.stopPropagation();
            });
            
            container.html(input);
            container.addClass('editing');
            input.focus();
            
            event.stopPropagation();
            
            tagger.getConfig().afterEdit(obj, tagger);
        };
        
        container.click(this.edit);
    };
    
    $.fn.extend({
        tagger:         function(options)
        {
            return this.each(function()
            {
                if ($(this).data('tagger')) return;
                
                var tagger = new Tagger(this, options);
                $(this).data('tagger', tagger);
            });
        }
    });
})(jQuery);