(function ($) {
	
// Backbone.sync = function(method, model) {
  // alert(method + ": " + JSON.stringify(model));
// };

/*	var books = [
		{ website: "google.com", tags: "search"},
		{ website: "jquery.com", tags: "programming"}
	];
*/	
	var Book = Backbone.Model.extend({
		urlRoot: "api/bookmark",
		
		
		validate: function(attr){
			if(attr.website == "" || attr.tag =="")
				return("website or tag cannont be empty");
		}
	});
	
	var Bookmarks = Backbone.Collection.extend({
		model: Book,
	    initialize: function(models, options) {
			// alert("Models : "+JSON.stringify(models));
			// alert("Options : "+JSON.stringify(options));
			if(options) {
				if(options.tag)
				this.url = 'api/bookmark/' + options.tag;
				
			} else {
				this.url = 'api/bookmark';
			}
		  },
	
	});
	
	var BookView = Backbone.View.extend({
		tagName: "div",
		className: "span3 well",
		template: $("#bookTemplate").html(),
		
		render: function(){
			var tmpl = _.template(this.template);
			$(this.el).html(tmpl(this.model.toJSON()));
			return this;
		}
	});
	
	var BookmarkView = Backbone.View.extend({
		el: $("#books"),

        initialize: function () {
//			this.collection = new Bookmarks();
			this.collection.bind("reset", this.render, this); 
			this.collection.fetch();
			//this.render();
		},

		events: {
			"click button.add" : "addBookmark",
			"click button.search" : "searchBookmark"
		},
		
        render: function () {
			
			//alert("Rendering : : "+JSON.stringify(this.collection));
            _.each(this.collection.models, function(item) {
            $(this.el).append(new BookView({model: item}).render().el);
			}, this);
        },

     	addBookmark: function () {
			var booknew = new Book({
				website: $("#website").val(),
				tag: $("#tag").val()
			});	
			booknew.on("error", function(model, error){
				console.log(error);
			});
			if(booknew.isValid()){
				booknew.save();
				this.collection.push(booknew);
			}
			$(this.el).append(booknew.render().el);
			
		},
		
		searchBookmark: function(){
			this.collection.remove();
			this.collection.unbind();
			
			var query = $("#search").val();
			var options = {
				"tag" : query
			};
			
			this.collection = new Bookmarks([], {tag : query});
			this.collection.bind("reset", this.render, this); 
			$("#books").empty();
			this.tryagain(this.collection);
			
			$("#books").append("<p><a href=\"index.html\">Go back</a></p><h3>Search Results</h3>");
		},
		
		tryagain: function(col) {
			col.fetch({
			success: function(collection,response){
					//alert("sAfter fetch : "+JSON.stringify(collection));
					//alert("sResponse "+JSON.stringify(response));
				},
			error: function(collection,response){
					//alert("eAfter fetch : "+JSON.stringify(collection));
					//if(response.statusText == "error"){
						alert("eResponse "+JSON.stringify(response));
						alert("Sorry, no entries found for the given tag");
						$("#books").append("<h3>Sorry, no entries found for the given tag</h3>");
					//}
				}
			});
		}
		
	});
	
	var bookmark = new BookmarkView( {collection : new Bookmarks() } );
} (jQuery));