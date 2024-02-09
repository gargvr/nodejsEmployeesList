const request = require('request');
const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    let url = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees';
    console.log("Requesting: " + url);
    request({ url: url, json: true }, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
            var data = '<table border="1">\n' +
                '\t<tr><th>ID</th><th>Name</th><th>Created At</th></tr>';
            for (var i = 0; i < body.length; i++) {
                data += "\t<tr>\n" +
                    "\t\t<td>" + body[i].id + "</td>\n" +
                    "\t\t<td>" + body[i].name + "</td>\n" +
                    "\t\t<td>" + body[i].createdAt + "</td>\n" +
                    "\t</tr>";
            }
            data += '\n</table>';
            res.send(data);
        } else {
            console.error(`Error: ${resp.statusCode} - ${resp.statusMessage}`);
            res.send(`Error: ${resp.statusCode} - ${resp.statusMessage}`);
        }
    });
});

app.listen(port, () => console.log(`Server running on ${port}`));