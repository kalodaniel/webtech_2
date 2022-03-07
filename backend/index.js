const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'infsys_assignment',
    port: '8889'
});


// check database connection
db.connect(err =>{
    if(err) {console.log(err, 'dberr');}
    console.log('database connected...');
})

//check server started
app.listen(3000,() =>{
    console.log("server running...");
});





// get all partner

app.get('/partner',(req,res)=>{
    
    let qr = 'select * from partners';
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            res.send({
                message:'All partner data',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});

//get single partner
app.get('/partner/:id',(req,res)=>{
    let gID = req.params.id;
 
    let qr = `select * from partners where id = ${gID}`;
 
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get single data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
 });

 // create partner

app.post('/partner',(req,res)=>{

    let name = req.body.name;
    let zipCode = req.body.zipCode;
    let city = req.body.city;
    let address = req.body.address;

    let qr = `insert into partners(name,zipCode,city,address) 
    values ('${name}',${zipCode},'${city}','${address}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message: 'Sikeres feltöltés!',  
        });
    });
});

//upadte single partner
app.put('/partner/:id',(req,res)=>{

    let gID = req.params.id;
    let name = req.body.name;
    let zipCode = req.body.zipCode;
    let city = req.body.city;
    let address = req.body.address;
    let machineName = req.body.machineName;

    let qr = `update partners set name = '${name}',zipCode='${zipCode}' ,city='${city}', address='${address}' where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Sikeres módosítás!'
        });
    });

});

//delete single partner
app.delete('/partner/:id',(req,res)=>{
    let qID = req.params.id;

    let qr = `delete from partners where id = ${qID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Sikeres törlés!'
        })
    });

});

//search partner by name
app.get('/searchPartnerByName/:name',(req,res)=>{
    let name = req.params.name;
    let qr = `select * from partners where name like '%${name}%'`;
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get searched data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
});

//search partner by id
app.get('/searchPartnerById/:id',(req,res)=>{
    let id = req.params.id;
    let qr = `select * from partners where id like '%${id}%'`;
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get searched data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
});

//login
app.post('/logging',(req,res)=>{
    
    let username = req.body.username;
    let password = req.body.password;

    let qr = `select count(*) numberOfUsers from users where username = '${username}' and password ='${password}'`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
            console.log('helo');
        }

        if(result.length>0){
            res.send({
                message:'Query success',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});


// get all machine

app.get('/machine',(req,res)=>{
    
    let qr = `select * from machines`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            res.send({
                message:'All machine data',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});

//get single machine
app.get('/machine/:id',(req,res)=>{
    let gID = req.params.id;
 
    let qr = `select * from machines where id = ${gID}`;
 
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get single data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
 });

 // create machine

app.post('/machine',(req,res)=>{

    let machineName = req.body.machineName;
    let acquisition = req.body.acquisition;
    let manufacturer = req.body.manufacturer;
    let state = req.body.state;
    let chassisNumber = req.body.chassisNumber;

    let qr = `insert into machines(machineName,acquisition,manufacturer,state,chassisNumber,partner_Id) 
    values ('${machineName}','${acquisition}','${manufacturer}','Szabad','${chassisNumber}',0)`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message: 'Sikeres feltöltés!',  
        });
    });
});

//upadte single machine
app.put('/machine/:id',(req,res)=>{

    let gID = req.params.id;
    let machineName = req.body.machineName;
    let acquisition = req.body.acquisition;
    let manufacturer = req.body.manufacturer;
    let state = req.body.state;
    let chassisNumber = req.body.chassisNumber;

    let qr = `update machines set machineName = '${machineName}',acquisition='${acquisition}' ,manufacturer='${manufacturer}', state='${state}',chassisNumber='${chassisNumber}' where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Sikeres módosítás!'
        });
    });

});

//delete single machine
app.delete('/machine/:id',(req,res)=>{
    let qID = req.params.id;

    let qr = `delete from machines where id = ${qID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Sikeres törlés!'
        })
    });

});

//search machine by name
app.get('/searchMachineByName/:name',(req,res)=>{
    let name = req.params.name;
    let qr = `select * from machines where machineName like '%${name}%'`;
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get searched data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
});

//search machine by id
app.get('/searchMachineById/:id',(req,res)=>{
    let id = req.params.id;
    let qr = `select * from machines where id like '%${id}%'`;
    db.query(qr,(err,result)=>{
 
        if(err){
            console.log(err);
         }
 
        if(result.length>0){
             res.send({
                 message:'Get searched data',
                 data:result
             });
        }
        else{
            res.send({
                message:'Data not found'
            });
        }
    });
});

//loan machine
app.post('/loanMachine',(req,res)=>{

    let partnerId = req.body.partnerId;
    let machineId = req.body.machineId;

    let qr = `update machines set partner_Id =${partnerId} where id = ${machineId}`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message: 'Sikeres kölcsönzés!',  
        });
    });
});

//get machine id and name
app.get('/getMachineIdAndName',(req,res)=>{
    
    let qr = `select id,machineName from machines where state = 'Szabad'`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            res.send({
                message:'Machine id and name',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});

//get partner id and name
app.get('/getPartnerIdAndName',(req,res)=>{
    
    let qr = `select id,name from partners`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            res.send({
                message:'Partner id and name',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});

//set state busy
app.put('/setStateBusy',(req,res)=>{

    let gID = req.body.id;

    let qr = `update machines set state='Foglalt' where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Sikeres módosítás!',

        });
    });

});

//set partnerId for machine
app.put('/setPartnerIdForMachine',(req,res)=>{

   let partnerId = req.body.partnerId;
   let machineId = req.body.machineId;

    let qr = `update machines set partner_Id=${partnerId} where id = ${machineId}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Sikeres módosítás!',

        });
    });

});

//get number of machines for a partner 
app.get('/numberOfMachines/:id',(req,res)=>{

    let id = req.params.id;    
    
    let qr = `select count(*) numberOfMachines from machines where partner_Id=${id}`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            res.send({
                message:'Number of machines for a partner',
                data:result
            });
        }else {
            res.send({
                message:'Error or no data in table'
            })
        }

    });
});

//setting partner ids to default in machines
app.put('/setPartnerIdToDefault',(req,res)=>{

    let partnerId = req.body.partnerId;

     let qr = `update machines set partner_Id=0, state='Szabad' where partner_Id = ${partnerId}`;
     db.query(qr,(err,result)=>{
         if(err){console.log(err);}
 
         res.send({
             message: 'Sikeres módosítás!',
 
         });
     });
 
 });