(function ($) {
	
	var Book = Backbone.Model.extend();
	
	var Bookmarks = Backbone.Collection.extend({
		model: Book,
		url: 'api/bookmark'
	});
	
	var collect = new Bookmarks;
	
	var Booksview = Backbone.View.extend({
		
		className: "span4",
		
		template: _.template($('#bookTemplate').html()),
		
		initialize: function() {
			this.model.bind('all', this.render, this);
		},
		render: function() {
			//alert(this.model.toJSON());
		  this.$el.html(this.template(this.model.toJSON()));
		  return this;
		}
	});
	
	var Collectionview = Backbone.View.extend({
		el: $("books"),
		
		initialize: function(){
			collect.bind('all', this.render,this);
				
			collect.fetch();
			this.render();
		},
		
		render: function(){
			_.each(collect.models,function(item){
				$(this.el).append(new Booksview({model: item}).render().el);
			}, this);
			return this;
		}
	});
	
	var bookmarks_app = new Collectionview;
} (jQuery));