//
// sincerity.js
//
// Author David Miller <david at deadpansincerity.com>
//
// Deadpan Sincerity Website application
//
//
// Naming conventions in this file:
//
// Objects:                /[A-Z][a-z]+([A-Z][a-z]+)?/
// Instantiated objects:   /[a-z][a-z]+([A-Z][a-z]+)?/
// Namespaces:             /[a-z]+/
// Constructors:           /initialize/
// Application:            /[A-Z][A-Z]+/
// Top level constants:    /[A-Z][A-Z]+/
//
// Reserved Names:
//
// Dead _ $
//


// Code:
(function(context){
    //
    // Firstly we provide the esoteric application object.
    //
    // This has containers that we will fill with our Backbone objects,
    // as well as an initialize() function that starts the app.
    //
    var Dead = {
        models: {},
        collections: {},
        routers: {},
        views: {},
        db: {},

        initialize: function(){
            Dead.db.tasty = new Dead.collections.Tasty;
            Dead.db.tweets = new Dead.collections.Tweets;
            Dead.db.gits = new Dead.collections.Gits;
            Dead.app =  new Dead.routers.App;
        }
    }


    //
    // Models
    //
    // Here we extend the application object's namespacing with individual models
    //

    Dead.models.Link = Backbone.Model.extend({});
    Dead.models.Tweet = Backbone.Model.extend({});
    Dead.models.Git = Backbone.Model.extend({});

    //
    // Collections
    //
    // Provide collections for such models as require them
    //
    Dead.collections.Tasty = Backbone.Collection.extend({
        model: Dead.models.Link,
        fetch: function(options){
            $.getJSON(
                "http://feeds.delicious.com/v2/json/thatdavidmiller?count=15&callback=?",
                function(data){
                    Dead.db.tasty.reset(data);
                })
            return true;
        }
    })

    Dead.collections.Tweets = Backbone.Collection.extend({
        model: Dead.models.Tweet,
        fetch: function(){
            $.getJSON(
                "http://search.twitter.com/search.json?callback=?&q=thatdavidmiller&rpp=15&include_entities=true&result_type=mixed",
                function(data){
                    Dead.db.tweets.reset(data.results);
                })
            return true;
        }
    })

    Dead.collections.Gits = Backbone.Collection.extend({
        model: Dead.models.Git,
        fetch: function(){
            $.getJSON(
                "https://api.github.com/users/davidmiller/events",
                function(data){
                    Dead.db.gits.reset(_.first(data, 12));
                })
            return true;
        }
    })

    //
    // Views
    //

    Dead.views.Fascinating = Backbone.View.extend({

        el: "#tasty",
        template: $("#tmpl_morsel"),

        initialize: function(){
            _.bindAll(this, "render")
            Dead.db.tasty.bind("reset", this.render)
        },

        render: function(options){
            $(this.el).append(this.template.tmpl(Dead.db.tasty.toJSON()));
            return this;
        }
    })


    Dead.views.Twittering = Backbone.View.extend({

        el: "#twittering",
        template: $("#tmpl_tweet"),

        initialize: function(){
            _.bindAll(this, "render")
            Dead.db.tweets.bind("reset", this.render)
        },

        render: function(options){
            $(this.el).append(this.template.tmpl(Dead.db.tweets.toJSON()));
            $(this.el).linkify();
            return this;
        }
    })

    Dead.views.Coding = Backbone.View.extend({

        el: "#coding",
        template: $("#tmpl_code"),

        initialize: function(){
            _.bindAll(this, "render")
            Dead.db.gits.bind("reset", this.render)
        },

        render: function(options){
            $(this.el).append(this.template.tmpl(Dead.db.gits.toJSON()));
            return this;
        }
    })

    //
    // Application
    //
    Dead.routers.App = Backbone.Router.extend({
        initialize: function(){
            Dead.fascinating = new Dead.views.Fascinating;
            Dead.twittering = new Dead.views.Twittering;
            Dead.coding = new Dead.views.Coding;
            Dead.db.tasty.fetch();
            Dead.db.tweets.fetch();
            Dead.db.gits.fetch();
        },

    });

    window.Dead = Dead;
})(window)