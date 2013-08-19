Ext.define("my-mobile.store.Notes", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "my-mobile.model.Note",
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
        sorters: [{ property: 'dateCreated', direction: 'DESC'}]
    }
});
