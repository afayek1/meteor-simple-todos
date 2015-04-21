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
      return Tasks.find({});
    }
  });

  
  
}