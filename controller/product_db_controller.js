var fs = require('fs');

    var file = fs.createWriteStream('results.txt');
    file.on('error', function(err) { /* error handling */ });
    results.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    file.end();