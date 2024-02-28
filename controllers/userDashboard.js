const moment = require("moment-timezone");
const pgUserModel = require("../models/pg.user.model");
const pgPartnerModel = require("../models/partner/partner.model");
const { responseDeliver } = require("../services/static.service");
const jwt = require("jsonwebtoken");
const { use } = require("../routes");

exports.userDashboard = (req, res) => {
  let { latitude, longitude, authorization } = req.body;
  pgUserModel
    .fetchDataUserDashboard()
    .then((userData) => {
      // console.log("userData", userData);
      if (userData) {
        res
          .status(200)
          .json({
            status: 0,
            message: "Dashboard Data Fetched ",
            data: userData.data,
          });
      } else {
        res.status(400).json({ status: 1, message: "Something Went Wrong" });
      }
      // res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: { email: userRecord.email, displayName: userRecord.displayName } })
    })
    .catch((error) => {
      res
        .status(400)
        .json({
          status: 1,
          message: "Error While Accessing Dashboard Data ",
          Error: error,
        });
    });
};

exports.bookStation = (req, res) => {
  // let { stationId,bookedFor,slotsDetails,} = req.body
  // pgUserModel.stationDetails(stationId).then((stationdata) => {

  //     if (stationdata.data.length >0 ) {
  //         res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: userData.data })
  //         let bookingId = '';
  //         for (let i = 0; i < 10; i++) {
  //             bookingId += Math.floor(Math.random() * 10);
  //         }

  //     }else
  //     {

  //         res.status(400).json({ status: 1, message: "Something Went Wrong",data:stationdata })
  //     }

  // }).catch((error) => {
  //     res.status(400).json({ status: 1, message: "Error While Accessing Dashboard Data ", Error: error })
  // })
  let { stationId, bookedFor, slotsDetails, userId } = req.body;
  pgUserModel
    .stationDetails(stationId)
    .then((stationdata) => {
      if (stationdata.data.length > 0) {
        // res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: userData.data })
        // let bookingId = '';
        // for (let i = 0; i < 10; i++) {
        //     bookingId += Math.floor(Math.random() * 10);

        pgUserModel
          .updateSlots(stationdata.data[0], bookedFor)
          .then((updated) => {
            console.log("updated ==========================================",updated);
            // if (updated) {
              let bookingId = "";
              for (let i = 0; i < 10; i++) {
                bookingId += Math.floor(Math.random() * 10);
              }
            // }
            let status = "BOOKED";

            pgUserModel
              .InsertBooking(
                bookingId,
                userId,
                stationdata.data[0].stationId,
                status,
                slotsDetails
              )
              .then(() => {
                console.log("slots booked successfully ");
                res
                  .status(200)
                  .json({
                    status: 0,
                    message: "Slots booked successfully ",
                    // data: .data,
                  });
              })
              .catch((error) => {
                res
                  .status(400)
                  .json({
                    status: 1,
                    message: "Some thing went wrong",
                    Error: error
                  });
              });
          })
          .catch((error) => {
            res
              .status(400)
              .json({
                status: 1,
                message: "Error While Updating slots details ",
                Error: error,
              });
          });
      } else {
        res
          .status(400)
          .json({
            status: 1,
            message: "Something Went Wrong",
            data: stationdata,
          });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({
          status: 1,
          message: "Error While Accessing Dashboard Data ",
          Error: error,
        });
    });
};

// exports.bookStation = (req, res) => {
//     // let { stationId,bookedFor,slotsDetails,userId} = req.body
//     // pgUserModel.stationDetails(stationId).then((stationdata) => {
//     //     if (stationdata.data.length > 0 ) {
//     //         // res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: userData.data })
//     //         // let bookingId = '';
//     //         // for (let i = 0; i < 10; i++) {
//     //         //     bookingId += Math.floor(Math.random() * 10);

//     //         pgUserModel.updateSlots(stationdata.data[0],bookedFor).then((updated) => {
//     //             if (updated) {

//     //                     let bookingId = '';
//     //         for (let i = 0; i < 10; i++) {
//     //             bookingId += Math.floor(Math.random() * 10);}

//     //             }
//     //             let status ="BOOKED"

//     //         pgUserModel.InsertBooking(bookingId,userId,stationdata.data[0].stationId,status,slotsDetails).then((updated) => {
//     //             res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: userData.data })

//     //         }).catch(()=>{res.status(400).json({ status: 1, message: "Some thing went wrong", Error: error })

//     //         })

//     //         }).catch((error)=>{
//     //             res.status(400).json({ status: 1, message: "Error While Updating slots details ", Error: error })

//     //         })

//     //     }else
//     //     {

//     //         res.status(400).json({ status: 1, message: "Something Went Wrong",data:stationdata })
//     //     }

//     // }).catch((error) => {
//     //     res.status(400).json({ status: 1, message: "Error While Accessing Dashboard Data ", Error: error })
//     // })

// }
