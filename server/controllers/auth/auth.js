const Seller=require("../models/seller");
const Client=require("../models/client");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");


//////seller

///// Let otp=math.floor(math.random()*10)+" "+math.floor(math.random()*10)+" "+math.floor(math.random()*10)+" "+math.floor(math.random()*10)+" "

exports.sellerSignup=async(req,res)=>{
    try {
      const sellerPresent= await Seller.findOne({
        email:req.body.sellerEmail,
      }); 

      if(sellerPresent==null){
       const {Password}=req.body;
       const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(Password,salt);
         const sellerToBeAdded=new Seller({
            ...req.body,
            Password:hashedPassword,
        });
            const seller=await sellerToBeAdded.save();
            const token=jwt.sign(
                {Seller: seller.sellerEmail, Password:seller.password},
                process.env.SECRET
            );
            await Seller.findByIdAndUpdate(seller._id,{
                token:token
            });
            const transporter=nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.email,
                    pass: process.env.password,
                },
            });

            await transporter.sendMail({
                from: process.env.email,
                to: seller.sellerEmail,
                subject:"Email Verification",
                // text:`your OTP for verification is ${otp}`,
                html: `
                <html>
                <body> 
                <a href="http://localhost:${process.env.PORT}/auth/seller/verify/?token=${token}&type=seller" target="_blank">
                click here to verify!
                </a>
                </body>
                </html>`,
            });
            res.send("Sign up Done! Please check your email for verification!!!");

      }else{
        res.status(403).send("User already exists");
      }

    } catch (error) {
        console.log(error);
        
    }
}

exports.sellerSignin=async(req,res)=>{
    try {
     const {email,password}=req.body;
     const sellerPresent=await Seller.findOne({
       email: req.body.email
     })   
        if(sellerPresent==null){
        res.status(404).send("Seller does not exist")
        }else{
            const verify=await bcrypt.compare(password,sellerPresent.password)
            if(verify){
                const token=jwt.sign(
                    {email, password:sellerPresent.password},
                    process.env.SECRET
                );
                res.send({token,userId: sellerPresent._id});
            }else{
                res.status(401).send("Invalid password")
            }
        }
    } catch (error) {
        console.log(error);
        
    }
}


//////customer

exports.customerSignup=async(req,res)=>{

try {
    const customerPresent= await client.findOne({
      email:req.body.email,
    }); 

    if(customerPresent==null){
     const {password}=req.body;
     const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt);
       const clientToBeAdded=new Client({
          ...req.body,
          password:hashedPassword,
      });
          const customer=await clientToBeAdded.save();
          const token=jwt.sign(
              {customer: customer.email, password:customer.password},
              process.env.SECRET
          );
          await Client.findByIdAndUpdate(customer._id,{
              token:token
          });
          const transporter=nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: process.env.email,
                  pass: process.env.password,
              },
          });

          await transporter.sendMail({
              from: process.env.email,
              to: customer.email,
              subject:"Email Verification",
              // text:`your OTP for verification is ${otp}`,
              html: `
              <html>
              <body> 
              <a href="http://localhost:${process.env.PORT}/auth/client/verify/?token=${token}&type=client" target="_blank">
              click here to verify!
              </a>
              </body>
              </html>`,
          });
          res.send("Sign up Done! Please check your email for verification!!!");

    }else{
      res.status(403).send("User already exists");
    }

  } catch (error) {
      console.log(error);
      
  }
}


exports.customerSignin=async(req,res)=>{
    try {
        
        
    } catch (error) {
        console.log(error);
        
    }
}



////admin

exports.adminSignup=async(req,res)=>{
    try {
        

    } catch (error) {
        console.log(error);
        
    }
}

exports.adminSignin=async(req,res)=>{
    try {
        
        
    } catch (error) {
        console.log(error);
        
    }
}

///////verify//////
exports.verify=async(req,res)=>{
    try {
        console.log(req.query);
        const {token,type}=req.query;
        if(type==="seller"){
            const seller=await Seller.findOne({
                token:token
            })

            await Seller.findByIdAndUpdate(seller._id,{
                Verified:true
            })
            res.send("Verified")
            
            }else{
               
            
            }
        
    } catch (error) {
        console.log(error);
        
    }
}