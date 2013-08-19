Ext.define('my-mobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            { 
                xtype: 'note_page'
	    },
            {
                title: '首页',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: '个人内部管理系统'
                },

                html: [
                    "Welcome here",
                    "It is a butiful tool"
                ].join("")
            },
            {
                xtype: 'events_panel'
            },
            {
                title: '统计分析',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '统计分析'
                    },
                    {
                        xtype: 'video',
                        url: 'http://www.sunzhimeng.com/system/Songs/4.mp3',
                        posterUrl: 'http://www.sunzhimeng.com/system/Singers/1.jpg'
                    }
                ]
            }
        ]
    }
});
