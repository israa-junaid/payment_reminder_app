//const { schema } = require("../models/Office");
const User = require("../models/newUser");
const Payment = require("../models/payment")
const ErrorResponse = require("../utils/errorResponse");
const sendNotificationToClient = require("../utils/notify")
var moment = require("moment");

function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
}
Array.prototype.skip = skip;

function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}
Array.prototype.limit = limit;

const advanceResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query }; //copy
  console.log("reqQuery", reqQuery);

  //field to exclude
  const removeFields = ["select", "sort", "limit", "page"];

  //loop and delete from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery); //query string
  console.log("queryStr", queryStr);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //console.log(JSON.parse(queryStr));
  let strQuery = JSON.parse(queryStr);
  if (model === Payment){
    strQuery.userId = req.user._id;
    } 
  query = model.find(strQuery);
  console.log("model is ", model);
  //select field
  if (req.query.select) {
    console.log("select call");

    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
    console.log("select call");
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  //paginatiion
  const page = parseInt(req.query.page, 10) || 1; //10 base  // page 1 default
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (populate) {
    query = query.populate(populate);
  }
  var results = await query;

  if(model === Payment){
    let payment = await Payment.find({
      userId:req.user._id,
      status:"Unpaid"
    })
    console.log("payment",payment)
    if(payment.length){
      console.log("payment is due !!!! 🥽 ")
      console.log("req.user.fcmToek",req.user.fcmTokens)
      if(req.user.fcmTokens.length >0){
        const notificationData = {
          title:"Unpaid Payments",
          body: `Hey ${req.user.username} ! Some of your payments are unpaid. Kindly pay the amount before due date.`
        }
      
        
        sendNotificationToClient(req.user.fcmTokens,notificationData)

      }
    }
   
    // results.forEach(element =>{
    //   if(element.status === "Unpaid"){
    //     console.log("Unpaid Paymenttttt !!!!!")
    //     console.log("req.user",req.user)
    //     const notificationData = {
    //       title:"Unpaid Payments",
    //       body: "Some of your payments are unpaid. Kindly pay the amount before due date."
    //     }
      
        
    //     sendNotificationToClient(req.user.fcmTokens,notificationData)
    //   }
    // })
  }
  const total = await results.length;
  const totalPages = Math.ceil(total / limit);

  console.log("total", total);
  console.log("total", totalPages);

  results = results.skip(startIndex).limit(limit);
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //searching
  // ? searching --username (ATTENDANCE)


  //office searching
  // ?searching --office_name
  else if (model === Payment) {
    console.log("search payment");
    if (req.query.title) {
      console.log("search (IFF) office");

      query = await Payment.find({
        $or: [{ title: { $regex: req.query.title, $options: "i" } }],
        userId:req.user._id
      }).populate({
        path: "userId",
        select: "username email",
      });;
      results = query;
    }
  }
  res.advanceResults = {
    success: true,
    count: results.length,
    pagination,
    total,
    totalPages,
    data: results,
  };
  next();
};

module.exports = advanceResults;
