const moongose= require('mongoose');


const ConnectToDB= async ()=>{
    try {
        await moongose.connect(process.env.MONGO_URI);
        console.log('dataBase is connected sucessfully');
        
    } catch (error) {
        console.log('mongodb connection is fail');
        process.exit(1)
        
        
    }
}

module.exports = ConnectToDB;