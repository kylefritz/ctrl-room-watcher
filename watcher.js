var _ = require('underscore')
var watchTree = require('fl-watch-tree')
var scopedClient = require('scoped-http-client')


var paths=[
  ["watcher","/Users/administrator/Desktop/ctrl-room-watcher"],
  ["imgs","/Users/administrator/Desktop/empty-words-img"]
  ["conditions","/Users/administrator/Dropbox/Classes/Prolab/conditions"]
];
var user="humanopoly@gmail.com"
//var server="ctrlroom.heroku.com"
var server="localhost:9393"


var client = scopedClient.create('http://'+server+'/message/'+user)
var enc=encodeURIComponent
// {project_name:"",project_path:"",file_path:"" }


_.each(paths,function(tuple){
	var projectName=tuple[0];
	var projectPath=tuple[1];
	
	var sendMessage=function(file_path){
		var data="project_name="+enc(projectName)+"&project_path="+enc(projectPath)+"&file_path="+enc(file_path)
		client.post(data)
	}
	
	var watcher = watchTree.watchTree(projectPath, {'sample-rate': 1});
	//watcher.on('fileDeleted', function(path) {
	//    console.log("fileDeleted" + path + ".");
	//});
	watcher.on('filePreexisted', function(path) {
	    console.log("filePreexisted " + projectName + " " + path + ".");
	}); 
	//watcher.on('fileCreated', function(path) {
	//    console.log("fileCreated " + projectName + " " + path + ".");
	//});
	watcher.on('fileModified', function(path) {
		sendMessage(path)
	    console.log("fileModified " + projectName + " " + path + ".");
	})

});