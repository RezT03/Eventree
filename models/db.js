const mysql = require('mysql')
const conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'event'
}) 

conn.connect((error)=>{
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('Connected');
	}
});

module.exports = conn