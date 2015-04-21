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
      return Tasks.find({}, {sort: {createdAt: -1}});
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

