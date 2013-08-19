﻿Ext.define("my-mobile.controller.Notes", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            notesListContainer: "noteslistcontainer",
            noteEditor: "noteeditor"
        },
        control: {
            notesListContainer: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            noteEditor: {
                // The commands fired by the note editor.
                saveNoteCommand: "onSaveNoteCommand"
            }

        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {

        var noteEditor = this.getNoteEditor();
        noteEditor.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
    },
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
    },

    // Commands.
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("my-mobile.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        this.activateNoteEditor(newNote); 
     
    },
    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");

        this.activateNoteEditor(record);
    },
    onSaveNoteCommand: function () {

        console.log("onSaveNoteCommand");

        var noteEditor = this.getNoteEditor();

        var currentNote = noteEditor.getRecord();
        var newValues = noteEditor.getValues();

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore("Notes");

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        notesStore.sync();

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },  

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        Ext.getStore("Notes").load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});