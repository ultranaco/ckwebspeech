var wsDialogHtml = function()
{
    this.updateCulturesSelect = function(elmtCulture, options)
    {
        var select_dialect = document.getElementById(elmtCulture._.inputId);
        
        for (var i = select_dialect.options.length - 1; i >= 0; i--) {
            select_dialect.remove(i);
        }
        
        for (var i = 0; i < options.length; i++) {
            select_dialect.options.add(new Option(options[i], options[i]));
        }
          
    }
}


CKEDITOR.dialog.add( 'webspeechDialog', function ( editor ) {
    var wsDialogDom = new wsDialogHtml();
    var selectCulture = editor.ckWebSpeech._currentCulture.val;

    return {
        title: 'WebSpeech Settings',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'select',
                        id: 'wslanguages',
                        label: 'Languages',
                        items: editor.ckWebSpeech.getLanguages(),
					    'default': editor.ckWebSpeech._currentCulture.langVal,
					    onChange: function( api ) {


                            var dialog = CKEDITOR.dialog.getCurrent();
                            var selCultures = dialog.getContentElement('tab-basic', 'wscultures');
                            
                            var options = editor.ckWebSpeech.getCultures(api.data.value);

                            selCultures.setup({selCultures : selCultures, options : options});
                            selCultures.fire('change', {value : options[0][0]}, editor);

					    },
                        onShow: function(data)
                        {
                            var dialog = CKEDITOR.dialog.getCurrent();
                            var selLanguages = dialog.getContentElement('tab-basic', 'wslanguages');
                            document.getElementById(selLanguages._.inputId).value = 
                                editor.ckWebSpeech._currentCulture.langVal;
                        }
                    },
                    {
                        type: 'select',
                        id: 'wscultures',
                        label: 'Culture',
                        items: editor.ckWebSpeech.getCultures(),
					    'default': editor.ckWebSpeech._currentCulture.val,
					    onChange: function( api ) {
                            selectCulture = api.data.value;                            
					    },
                        setup: function(data)
                        {
                            wsDialogDom.updateCulturesSelect(data.selCultures, data.options);
                        },
                        onShow: function(data)
                        {
                            var dialog = CKEDITOR.dialog.getCurrent();
                            var selCultures = dialog.getContentElement('tab-basic', 'wscultures');
                            //console.log(selCultures);
                            document.getElementById(selCultures._.inputId).value = 
                                editor.ckWebSpeech._currentCulture.val;
                        }
                    }
                ]
            },
            {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [

                ]
            }
        ],
        onOk: function() {
            editor.ckWebSpeech.setDialectByCulture(selectCulture);
        }
    };
});