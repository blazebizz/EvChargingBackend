const tokenModel = require("../../models/token_user/token.model")
const jwt = require('jsonwebtoken');
const {responseCode, verifyToken, responseDeliver} = require("../../services/static.service");

exports.generateToken = (req, res) => {
    let {user_id} = req.body
    tokenModel.fetchUser(user_id).then((userData) => {
        if (userData.data.length === 0) {
            console.log("Invalid user ID :", user_id)
            res.status(400).json({status: responseCode.FAIL, message: "Invalid User ID"})
        } else if (userData.data.length === 1) {
            const tokens = jwt.sign({user_id}, 'my-key', {expiresIn: '1h'});
            console.log(`TokenGenerated : ${user_id} ==> Token : ${tokens}`);
            let resp = {
                authorization: tokens,
                name: userData.data[0].name,
                mobile_no: userData.data[0].mobile_no,
                user_type: userData.data[0].user_type
            }
            console.log("response to send==> ", resp)
            res.status(200).json({status: responseCode.SUCCESS, data: resp})
        } else {
            console.log("Something went wrong ")
            res.status(400).json({status: responseCode.FAIL, message: "Something went wrong "})
        }
    })
}


exports.generateAdminToken = (req, res) => {
    let {user_id,password} = req.body

    if (password === "babaranchorddas"){

        const tokens = jwt.sign({user_id}, 'my-key', {expiresIn: '1h'});

        console.log(`TokenGenerated : ${user_id} ==> Token : ${tokens}`);
        let resp = {
            authorization: tokens,
        }
        console.log("response to send==> ", resp)
        res.status(200).json({status: responseCode.SUCCESS, data: resp})
    }else{
        res.status(401).json(responseDeliver(responseCode.FAIL,"wrong admin password"))
    }

}


exports.createUser = (req, res) => {
    let {user_id, mobile_no, name,email} = req.body
    console.log("req body ", req.body)

    tokenModel.createUser(user_id, mobile_no, name)
        .then(insertSuccessResp => {
            if (insertSuccessResp.status === 1) {
                const tokens = jwt.sign({user_id}, 'my-key', {expiresIn: '20m'});
                console.log(`TokenGenerated : ${user_id} ==> Token : ${tokens}`);
                let resp = {
                    authorization: tokens,
                    name: name,
                    mobile_no: mobile_no,
                    email:email
                }
                console.log("response to send==> ", resp)
                res.status(200).json({status: responseCode.SUCCESS, data: resp})

            } else {
                console.log("Error while Inserting data , UserID : ", user_id)
                res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"})
            }
        }).catch(() => {
        res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"})
    })


}


exports.allUser = (req, res) => {

    verifyToken(req).catch(error=>{
        res.status(401).json(responseDeliver(responseCode.FAIL,"Token verification failed","",error))
    }).then((tokenData)=>{
        if (tokenData !== undefined){
            let user_type = req.query.user_type;
            console.log("userType==>", user_type);

            if (user_type === undefined) {
                tokenModel.fetchAllUser({
                    user_type
                }).then(response => {
                    if (response.status === responseCode.SUCCESS) {
                        res.status(200).json(response);
                    } else {
                        res.status(400).json(response);
                    }
                }).catch(error => {
                    res.status(400).json(error);
                })
            } else {
                // res.status(400).json("error");
                tokenModel.fetchUserByType({
                    user_type
                }).then(response => {
                    if (response.status === responseCode.SUCCESS) {
                        res.status(200).json(response);
                    } else {
                        res.status(400).json(response);
                    }
                }).catch(error => {
                    res.status(400).json(error);
                })
            }

        }
    });

}

exports.checkToken = (req, res) => {
    verifyToken(req).then(data => {
        res.status(200).json({message: "yooo", data: data})
    }).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL,"Token verification failed",error,error))
    })
}



exports.changeUserAccess = (req, res) => {
    verifyToken(req).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL,"Token verification failed","",error))
    }).then(data => {
        if (data !== undefined && data.data[0]==="admin_token_bro"){
            let {user_id,is_allowed} = req.body;
            console.log("insert slot ", req.body);
            tokenModel.changeUserAccess({
                user_id,is_allowed
            }).then(response => {
                if (response.status === responseCode.SUCCESS) {
                    res.status(200).json(response);
                } else {
                    res.status(400).json(response);
                }
            }).catch(error => {
                res.status(400).json(error);
            })
        }})

}
/*

exports.changeUserAccess=(req,res)=>{
    verifyToken(req).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL,"Token verification failed","",error))
    }).then(data => {
        if (data !== undefined && data.data[0]==="admin_token_bro"){
            let {user_id,is_allowed}=req.body;
            try {
                tokenModel.changeUserAccess(user_id,is_allowed).then(response=>{
                    if (response.status === responseCode.SUCCESS) {
                        res.status(200).json(response);
                    } else {
                        res.status(400).json(response);
                    }
                })
            }catch (e) {
                res.status(400).json(responseDeliver(responseCode.FAIL,"Access Denied"))

            }

        }else{
            res.status(400).json(responseDeliver(responseCode.FAIL,"Access Denied"))
        }
    }).catch(error=>{
        res.status(400).json(error);
    })
}*/
