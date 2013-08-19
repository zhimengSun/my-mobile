Ext.define('my-mobile.view.Event',{
    extend: 'Ext.Panel',
    xtype: 'events_panel', 
    config: {
        title: '日记',
        xtype: 'nestedlist',
        iconCls: 'star',
        displayField: 'tiny_title',

        store: {
            type: 'tree',

            fields: [
                'start', 'title', 'tiny_title',
                {name: 'leaf', defaultValue: true}
            ],

            root: {
                leaf: false
            },

            proxy: {
                type: 'jsonp',
                url: 'http://0.0.0.0:3001/events' + TokenStr,
                reader: {
                    type: 'json',
                    rootProperty: ''
                }
            }
        },

        detailCard: {
            xtype: 'panel',
            scrollable: true,
            styleHtmlContent: true
        },

        listeners: {
            itemtap: function(nestedList, list, index, element, post) {
                console.info(post)
                this.getDetailCard().setHtml(post.get('title'));
            }
        }

    }
});
