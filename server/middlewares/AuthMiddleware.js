const { compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) =>{
    const accessToken = req.header("accessToken");

    if(accessToken == "null") return res.json({error: "Benutzer Authentifizierung fehlgeschlagen"});
    

    try {
        const validToken = verify(accessToken, "secret");
        req.user = validToken;
        if(validToken){
            return next();
        }
    } catch (err) {
        return res.json({error: "Benutzer Authentifizierung fehlgeschlagen"});
    }
}

module.exports = {validateToken};