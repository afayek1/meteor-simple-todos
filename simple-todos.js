if (Meteor.isClient) {
  /*
   * You can pass data into templates by defining helpers.
   * This code will only run on the client.
  */
  Template.body.helpers({
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });
}