/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//--insights of a particular page---//
//coca-cola{page-id}/insights/page_fans_country
module.exports = {

	
	signup: function(req, res){
  		
  			 	var username = req.body.userName;
       		    var password = req.body.password;
         		var hasher = require("password-hash");
                password = hasher.generate(password);

			User.create({userName:req.body.userName , email : req.body.email, encryptedPassword : password}).exec(function createCB(err, created){

						if(err)
						{
							console.log(err);
						}
						else
 						 console.log('Created user with name '+created.userName);
						});
			},


	login: function( req, res){

			console.log("in user controller"+req.body.userName +" "+req.body.email+" "+req.body.password);

  			 	var username = req.body.userName;
       		    var password = req.body.password;
       		    var hasher = require("password-hash");

     User.find({where: {userName: username}}).exec(function findCB(err, found){
  				
     			if(err){
     				console.log("error");
     				return err;
     			}
     			else if(found.length > 0){

     						var res = found.pop();
    						console.log('Found User with name '+res.userName);
    					if(hasher.verify(password,res.password))
    						{
    							console.log("succesfully logged in!!");
    							
    						}	


    					}		

			});	

	},

 
linkMapper: function(req,res)
{
  var tinyUrl = req.params.link.substring(1,req.params.link.length);
  console.log(req.baseUrl);
  var cloakedUrl = req.baseUrl+"/link"+req.params.link;
  console.log(cloakedUrl);
   linkmapper.findOne({cloakedlink: cloakedUrl}).exec(function (err, records){ 
    if(err)
      return;
    console.log(records);
    if(records!=undefined){
    var redirectUrl = records.originallink;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
    }
    else
      return; 
   // res.redirect("http://www.mb104.com/lnk.asp?o=9484&c=918273&a=168955");
  });
},

urlCreator: function(req,res)
{
     var link = req.body.link;
    linkmapper.find({}).exec(function (err, records){ 
     if(err)
          return;
      var  tinyUrl = Math.random().toString(36).substring(7);
     var cloakedLinks = []; 
      if(records.length  > 0){
           
      do
        { 
          cloakedLinks.push(records.pop().cloakedlink);

        }while(records.length > 0);   
      while(cloakedLinks.indexOf(tinyUrl) != -1)
          {
             tinyUrl = Math.random().toString(36).substring(7);
          }    

        
      }
      console.log(cloakedLinks);
      console.log(req.baseUrl);  
      var url = req.baseUrl+"/link:"+tinyUrl
        linkmapper.create({originallink: link,cloakedlink: url}).exec(function createCB(err, created){
        if(err)
          return;
           console.log(url); 
           res.send(url);
        }); 


     }); 
    
}

};



