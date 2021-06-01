// first execute these command in mongo shell
// use dapp
// db.dropDatabase()
// use dapp
// then execute the script with 'mongo init.js'
var db = connect('localhost:27017/dapp');

print(db);

db.counters.insert({_id:"user_id", sequence_value: 0});
db.counters.insert({_id:"order_id", sequence_value: 0});


