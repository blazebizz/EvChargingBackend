const { pgTables } = require("../cred/env");
const { pgclient } = require("../cred/pg.connection");
const { responseDeliver } = require("../services/static.service");
const moment = require("moment-timezone");

exports.insertUserData = (userId, mobileno, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("table name :", pgTables.createUser);
      console.log("data", userId, name, mobileno);
      console.log("type of userId", typeof userId);
      console.log("type of name", typeof name);
      console.log("type of mobileno", typeof mobileno);

      let created_at = moment()
        .tz("Asia/Kolkata")
        .format("yyyy-MM-DD hh:mm:sZ");
      await pgclient("userData").insert({
        userId: userId,
        name: name,
        mobileno: mobileno,
      });

      console.log("inserted successfully");

      return resolve({ status: 1, message: "Data Inserted " });
    } catch (error) {
      console.log("Error While Inserting data in  db ");
      return reject({ status: 0, message: "Error while inserting data" });
    }
  });
};

exports.fetchUserData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataList = await pgclient(pgTables.createUser).where({ userId });

      return resolve(
        responseDeliver(200, "Partner data fetched successfully", "", dataList)
      );
    } catch (error) {
      return reject(responseDeliver(400, "error on fetch partner data", error));
    }
  });
};

exports.fetchDataUserDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataList = await pgclient
        .from("chargingStationDetails")
        .select(
          "stationId",
          "stationName",
          "rating",
          "ratingCount",
          "latitude",
          "longitude",
          "desc"
        );
      return resolve(
        responseDeliver(
          200,
          "Dashboard Data Fetched successfully ",
          "",
          dataList
        )
      );
    } catch (error) {
      return reject(
        responseDeliver(400, "error While Fetching Dashboard data", error)
      );
    }
  });
};

exports.stationDetails = (stationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataList = await pgclient
        .from("chargingStationDetails")
        // .select('stationId', 'stationName', 'rating', 'ratingCount', 'latitude', 'longitude', 'desc');
        .where({ stationId });
      // console.log("dataList ::==> ", dataList);
      return resolve(
        responseDeliver(
          200,
          "Dashboard Data Fetched successfully ",
          "",
          dataList
        )
      );
    } catch (error) {
      return reject(
        responseDeliver(400, "error While Statioon details  ", error)
      );
    }
  });
};

exports.updateSlots = (stationData, bookedFor) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        avlSlotsBike,
        avlSlotsCar,
        totalSlotsBike,
        totalSlotsCar,
        stationId,
        stationName,
      } = stationData;

      if (bookedFor == "bike") {
        if (avlSlotsBike > 0) {
          avlSlotsBike = avlSlotsBike - 1;
        } else {
          console.log("Slots not available");
        }
      } else if (bookedFor == "car") {
        if (avlSlotsCar > 0) {
          avlSlotsCar = avlSlotsCar - 1;
        } else {
          console.log("Slots not available");
          return res
            .status(200)
            .json({
              status: 1,
              message: `Currently All slots for car  are booked of charging station ${stationName}`,
            });
        }
      } else {
        return res
          .status(200)
          .json({
            status: 1,
            message: "Currently we are serving for only bike and car",
          });
      }
      console.log(
        "==================================================available slots ",
        avlSlotsBike,
        avlSlotsCar
      );
      let update = await pgclient
        .from("chargingStationDetails")
        .where({ stationId })
        .update({ avlSlotsBike, avlSlotsCar });
      return resolve(
        responseDeliver(200, "slots updated  successfully ", "", update)
      );
    } catch (error) {
      return reject(
        responseDeliver(400, "error While  updating slots ", error)
      );
    }
  });
};

exports.InsertBooking = (
  bookingid,
  userId,
  stationId,
  status,
  slotsDetails
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let created_at = moment()
      //   .tz("Asia/Kolkata")
      //   .format("yyyy-MM-DD hh:mm:sZ");
      await pgclient("bookingdetails").insert({
        bookingid,
        userId,
        stationId,
        status,
        slotsDetails,
      });

      return resolve({ status: 1, message: "Data Inserted " });
    } catch (error) {
      console.log("Error While Inserting data in  db ", error);
      return reject({ status: 0, message: "Error while inserting data" });
    }
  });
};
