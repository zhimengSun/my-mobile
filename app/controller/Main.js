Ext.define('my-mobile.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            nav: '#mainNav',

            infoPanel: {
                selector: 'tabpanel panel[name=fish] infopanel',
                xtype: 'infopanel',
                autoCreate: true
            }
        }
    }
});
