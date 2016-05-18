// -- REQUIREMENT
var mongodb = require('mongodb');
var _ = require('lodash');

// -- UTILS
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
String.prototype.indexesOf = function (searchStr, caseSensitive) {
  var str = this;
  var startIndex = 0, searchStrLen = searchStr.length;
  var index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}

// -- MONGO CONNECTION
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/your_model';//←-- TODO

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
    return 0;
  }
  console.log('connected');

  var collection = db.collection('your_collection');//←-- TODO

  collection.find({}).toArray(function (err, result) {
    if (err) {
      console.log(err.message);
      db.close();
    } else if (result.length) {
      console.log('Found:', result.length);

      _.forEach(result, function(obj){
        var target = 'word to replace';//←-- TODO
        var objStr = JSON.stringify(obj);

        if(objStr.indexOf(target)>=0){
          var indexes = objStr.indexesOf(target, false);

          // CONTEXT PROMPT
          // first let’s see the target keyword in context
          console.log('===========');
          console.log('id : ' + obj.number);
          console.log('context : (' + indexes.length + ' match)');
          _.forEach(indexes, function(i){
            console.log('...' + objStr.substring(i-10, i+20) + '...');
          });

          // TREATMENT : SHOULD BE COMMENTED ON FIRST LAUNCH
          // Use the context prompted before to prepare your replacements requests.

          // TODO : Uncomment following block when you’re ready to modify your data

          // var updatedObjStr = objStr;
          // updatedObjStr = updatedObjStr.replaceAll('target1', 'replacement1');//←-- TODO
          // updatedObjStr = updatedObjStr.replaceAll('target2', 'replacement2');//←-- TODO
          //
          // updatedObj = JSON.parse(updatedObjStr);
          // delete updatedObj._id;
          //
          // collection.update(obj,updatedObj, function(err){
          //   if(err){
          //     console.log(err.message);
          //   }
          // });

          // END TREATMENT
        }
      });

    } else {
      console.log('No document(s) found with defined "find" criteria!');
      db.close();
    }
  });
});
