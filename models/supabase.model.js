const { collections } = require("../cred/env");
const supabase = require("../cred/supabase.connection");
const { responseDeliver } = require("../services/static.service");

exports.insertPartnerData = (onboardData, userId, updated_at, status) => {

    return new Promise(async (resolve, reject) => {

        const { data, error } = await supabase
            .from("partnerOnboard")
            .insert({ userId, onboardData, updated_at, status })
            .select()

        console.log("data==>", data);
        console.log("error==>", error);

        if (error) {
            return reject(responseDeliver(400, "error on insert partner data", error))
        }

        return resolve(responseDeliver(200, "Partner data saved successfully", "", data[0]))

    })

}

exports.fetchUserData = async () => {
    const { data, error } = await supabase
        .from(collections.partnerOnboard)
        .select('*');

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    console.log('Fetched data:', data);
}

exports.fetchUserDataDateStatusWise = async () => {
    const { data, error } = await supabase
        .from(collections.partnerOnboard)
        .select('*');

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    console.log('Fetched data:', data);
}






