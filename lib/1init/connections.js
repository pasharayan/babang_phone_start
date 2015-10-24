var edunasi = DDP.connect('http://testedunasi.meteor.com/');

Projects = new Meteor.Collection('projects', {
  connection: edunasi,
  transform: function(doc) {
    return new Project(doc);
  }
});

Students = new Meteor.Collection('students', {
  connection: edunasi,
  transform: function(doc) {
    return new Student(doc);
  }
});
