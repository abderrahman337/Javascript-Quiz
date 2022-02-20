// Azure Function: Node.js code to read data from Azure Synapse Analytics with query parameter and return results as JSON
// Author: Loïc TEMGOUA

// Import necessary libraries
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


// Entry point of the function
module.exports =  function(context, req, res) {

    context.log('!! STARTING retrieving Data !!');

    // Define variables to store connection details and credentials
    // Connection details and credentials are fetched from Environment Variables during function execution
    var config = {

            server: process.env["SYNAPSE_SERVER_NAME"], 
            authentication: {
                options: {
                    userName: process.env["SYNAPSE_USER"],
                    password: process.env["SYNAPSE_USER_PASSWORD"] 
                },
                type: 'default'
            },
            options: {
                encrypt: true,
                database: process.env["SYNAPSE_DATABASE"] 
                //port: 1433
            }
    };

    //get query parameter
    st_date = context.req.query.startdate
    end_date = context.req.query.enddate 
    table_name = context.req.query.tablename

    context.log(st_date)
    context.log(end_date)
    context.log(table_name)


    var data = [] ;
    var connection = new Connection(config); 
    
    //Attempt to connect and execute queries if connection works
    connection.on('connect', function(err) {  
        if(err) {
            context.log(err);
            
        } else {
            context.log("************Connected*****************");
            queryDatabase();
        }
    });  

    //Initialize the connection
    connection.connect();

    function queryDatabase() { 

        context.log("queryDatabase....started!"); 

        if(st_date.length == 4)
        {
            sqlquery = 'SELECT TOP(10000) * FROM '+ table_name +' where Date >= @startdate and Date <= @enddate order by Date DESC';
        }
        else{
            sqlquery = 'SELECT TOP(10000) * FROM '+ table_name+' where CONVERT(date,Date) >= @startdate and CONVERT(date,Date) <= @enddate order by Date DESC';
        }

        

        var request = new Request(sqlquery,function(err){

                if(err){
                    context.log(err);
                }    
            }
        );    

        // add input parameter in the query eia_co2EmissionsByFuels
        request.addParameter('startdate', TYPES.Date, st_date);
        request.addParameter('enddate', TYPES.Date, end_date);    
        //request.addParameter('tablename', TYPES.VarChar, table_name);

        request.on('row', function(columns) {
            var row = {};
            columns.forEach(function(column) {
                //context.log("%s\t%s", column.metadata.colName, column.value);
                row[column.metadata.colName] = column.value;
            });
            data.push(row);
        });
        
        request.on('requestCompleted', function () {
            //context.log(data);
            context.res={
                status:200,
                body:data,
                headers: {'content-Type': 'application/json'}
            };
            context.done();
            //return context.res.body;
        });
        connection.execSql(request);
    }

};