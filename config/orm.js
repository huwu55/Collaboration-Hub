var connection = require("./connection.js");

var ORM = {
    selectAll : function(tableInput, cb){
        //console.log("tableInput: " + tableInput);
        connection.query(`SELECT * FROM ${tableInput}`, function(error, results, fields){
            if (error) return console.log(error);

            cb(results);
        });
    },

    selectCertain : function(tableInput, fieldname, value, cb){
        connection.query(`SELECT * FROM ${tableInput} WHERE ${fieldname} = ?`, [value], function(error, results, fields){
            if (error) return console.log(error);

            cb(results);
        });
    },

    insert : function(tableInput, fieldnames, values, cb){
        var str = "(";
        for (var i = 0; i < values.length; i++){
            str += "?";
            if (i+1 < values.length) str+=",";
        }
        str+=")";
        //console.log(str);
        connection.query(`INSERT INTO ${tableInput} ${fieldnames} VALUES ${str}`, values, (error, results, fields)=>{
            //console.log(error);
            if(error)   return cb(error, results);
            connection.query("SELECT LAST_INSERT_ID()", (error, results, fields)=>{
                if (error) {
                    console.log(error);
                    return cb(error, null)
                };
                cb(false, results);
            });
        });
    },

    update : function(tableInput, fieldname, fieldname1, values, cb){
        connection.query(`UPDATE ${tableInput} SET ${fieldname} = ? WHERE ${fieldname1} = ?`, values, (error, results, fields)=>{
            if (error) return console.log(error);
            cb();
        });
    }, 

    updateAnd : function(tableInput, fieldname, fieldname1, fieldname2, values, cb){
        connection.query(`UPDATE ${tableInput} SET ${fieldname} = ? WHERE ${fieldname1} = ? AND ${fieldname2} = ?`, values, (error, results, fields)=>{
            if (error) return console.log(error);
            cb();
        });
    }, 

    delete : function(tableInput, fieldname, value, cb){
        connection.query(`DELETE FROM ${tableInput} WHERE ${fieldname} = ?`, [value], (error, results, fields)=>{
            if (error) return console.log(error);
            cb();
        });
    },

    deleteAnd : function(tableInput, fieldname1, fieldname2, values, cb){
        connection.query(`DELETE FROM ${tableInput} WHERE ${fieldname1} = ? AND ${fieldname2} = ?`, values, (error, results, fields)=>{
            if (error) return console.log(error);
            cb();
        });
    }
};

module.exports = ORM;