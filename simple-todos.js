/*
 * Collections store persistent data.
 * Can be accessed from server and client.
 * On client, creates cache connected to server collection.
*/
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      };
    },

    hideCompleted: function() {
      return Session.get("hideCompleted");
    },

    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    /*
     * Listen to submit event on any element that matches the
     * cs selector '.new-task'. In this case, when a new task
     * is submitted. The event handler gets anargument called
     * event that has information about the triggered event.
    */
    "submit .new-task": function (event) {
      console.log(event);
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },

    "change .hide-completed input": function (event) {
      /*
       * Session is a convenient place to store temp. UI state.
       * Can be used in helpers like a collection. 
      */
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      Tasks.update(this._id, {$set: {checked: !this.checked}});
    },

    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
}

