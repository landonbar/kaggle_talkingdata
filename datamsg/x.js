
//--max-old-space-size=8192

var fs = require('fs');

var stream = fs.createReadStream('../data/events.csv', 'UTF-8');
var data = '';

var left='';

var db = {};

stream.once('data', function () {
    console.log('\n');
    console.log('Started Reading The Trex File');
});


stream.on('data', function (chunk) {
    process.stdout.write(`chunk: ${chunk.length} \n`);
    data += chunk;
});

stream.on('end', function () {
    console.log(`Finished Reading The Trex File ${data.length}`);
    console.log('\n');
    handleFile();
    
});



function handleFile() {
    var lines=data.split('\n');
    console.log(lines.length);
    for (var i=0; i<lines.length; i++){
        //console.log(lines[i]);
        var line = lines[i];
        var fields=line.split(',');
        db[''+fields[0]]={device:''+fields[1], apps:[]}
    }
    fs.writeFile('./events.json',JSON.stringify(db,null,2));
}
 




















