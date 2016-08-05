
//--max-old-space-size=8192

var fs = require('fs');

var stream = fs.createReadStream('../data/app_events.csv', 'UTF-8');
var data = '';

var left='';

var chunkNum=0;

var db = require('./events.json');

stream.once('data', function () {
    console.log('\n');
    console.log('Started Reading The Trex File');
});


stream.on('data', function (chunk) {
    process.stdout.write(`chunk ${chunkNum++}: ${chunk.length} \n`);

    var lines = (left + chunk).split('\n');
    //console.log(lines.length);
    for (var i=0; i<lines.length-1; i++){
        //console.log(lines[i]);
        var line = lines[i];
        var fields=line.split(',');
        if(db[''+fields[0]]) db[''+fields[0]].apps.push(''+fields[1]);
    } 
    left = lines[lines.length-1];
    
});

stream.on('end', function () {
    console.log(`Finished Reading The Trex File ${data.length}`);
    console.log('\n');
    console.log('left');


    var f = fs.createWriteStream('./app_events.json');
    f.write('[\n');
    for (var k in db){
        var l=db[k];
        f.write(JSON.stringify(l)+'\n');
    }
    f.write(']\n');
    //f.close();
    //fs.writeFile('./app_events.json',JSON.stringify(db,null,2));
});



function handleFile() {
    var lines=data.split('\n');
    console.log(lines.length);
    for (var i=0; i<10; i++){
        //console.log(lines[i]);
        var line = lines[i];
        var fields=line.split(',');
        //db[''+fields[0]]={device:''+fields[1]}
    }
    //fs.writeFile('./app_events.json',JSON.stringify(db,null,2));
}
 




















