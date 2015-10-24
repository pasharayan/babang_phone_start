Template.project.events({
  'submit .new-project': function(e){
    e.preventDefault();

    var data = {
      name: $(e.target).find('[name=name]').val(),
      thumbnailUrl: $(e.target).find('[name=thumbnailUrl]').val(),
      tagline: $(e.target).find('[name=tagline]').val(),
      story: $(e.target).find('[name=story]').val(),
      latitude: Number($(e.target).find('[name=latitude]').val()),
      longitude: Number($(e.target).find('[name=longitude]').val()),
      goal: $(e.target).find('[name=goal]').val(),
    };


    var projectId = Projects.insert(data);
    Router.go('homepage');

  }
});
