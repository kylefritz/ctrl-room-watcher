var _ = require('underscore')
var watchTree = require('fl-watch-tree')

var paths=[
["watcher","/Users/administrator/Desktop/ctrl-room-watcher"],
["imgs","/Users/administrator/Desktop/empty-words-img"]
];
_.each(paths,function(tuple){
	var projectName=tuple[0];
	var path=tuple[1];
	
	var watcher = watchTree.watchTree(path, {'sample-rate': 1});
	//watcher.on('fileDeleted', function(path) {
	//    console.log("fileDeleted" + path + "!");
	//});
	watcher.on('filePreexisted', function(path) {
	    console.log("filePreexisted " + projectName + " " + path + "!");
	});
	//watcher.on('fileCreated', function(path) {
	//    console.log("fileCreated " + projectName + " " + path + "!");
	//});
	watcher.on('fileModified', function(path) {
	    console.log("fileModified " + projectName + " " + path + "!");
	})

});