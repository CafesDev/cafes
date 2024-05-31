const {verifyToken, generateToken} = require('../middleware/authentication')

const testingUsers = [
    {
        "matricula": 973129658,
        "clave_licenciatura": "ISI",
        "nombres": "Winona",
        "apellido_paterno": "Coppins",
        "apellido_materno": "La Wille",
        "correo_personal": "wlawille0@live.com",
        "telefono": "2427121655",
        "contrasena": "$2a$04$LQoVvnJQ9gFyDmp3u3uLcuPCZ4NS1LsJ8zoGFESmYffx9mdJZOjg6",
        "estado": "Inactivo"
      },
    {
        "matricula": 511033839,
        "clave_licenciatura": "FIN",
        "nombres": "Ximenes",
        "apellido_paterno": "Foye",
        "apellido_materno": "Franies",
        "correo_personal": "xfranies1@friendfeed.com",
        "telefono": "2096831180",
        "contrasena": "$2a$04$FMCVSBiItRqf8JkAQyuVn.6i7d73bJ1fx6ogN4eXm6K5gmpPvc2Uu",
        "estado": "Inactivo"
      },
    {
        "matricula": 257034000,
        "clave_licenciatura": "NI",
        "nombres": "Shandeigh",
        "apellido_paterno": "Foard",
        "apellido_materno": "Iskowitz",
        "correo_personal": "siskowitz2@apache.org",
        "telefono": "1765611768",
        "contrasena": "$2a$04$JTo82bG0w921wnKSp6CP1.PeoiOKxtu84xpJTTUfLanGRcIKYwPre",
        "estado": "Activo"
      },
    {
        "matricula": 173937528,
        "clave_licenciatura": "ISI",
        "nombres": "Thea",
        "apellido_paterno": "Vidyapin",
        "apellido_materno": "Hawsby",
        "correo_personal": "thawsby3@digg.com",
        "telefono": "2208661256",
        "contrasena": "$2a$04$PRbR9VVD.OAu3GKoIqK.k.V99cWXNmgBHOShPjEXvwhlJef4cVRDO",
        "estado": "Inactivo"
      },
    {
        "matricula": 514971620,
        "clave_licenciatura": "FIN",
        "nombres": "Selina",
        "apellido_paterno": "Suett",
        "apellido_materno": "Maundrell",
        "correo_personal": "smaundrell4@spotify.com",
        "telefono": "5147485140",
        "contrasena": "$2a$04$RiiHYsO1ljbzOHv.FQQ1UOPVjhHKj3HvMDbQbenQmy7TpIrSQW6DC",
        "estado": "Inactivo"
      },
    {
        "matricula": 546222418,
        "clave_licenciatura": "ISI",
        "nombres": "Isidora",
        "apellido_paterno": "Ralfe",
        "apellido_materno": "McIlwain",
        "correo_personal": "imcilwain5@bloglines.com",
        "telefono": "1033355767",
        "contrasena": "$2a$04$0dDwrHRDXDvv1ru4sOqQDuTvLT48QaFZRSihxSgKsE6HzaBzyFmk.",
        "estado": "Inactivo"
      }
  ]
process.env.TOKEN_SECRET = 'MyTestingTokenForAuthentication'
test('Creates the jsonwebtokens correctly', () => {
  console.log(process.env.TOKEN_SECRET)
    testingUsers.forEach((user) => {
        const payload = {sub: user.matricula}
        const token = generateToken(payload)
        const decodedToken = verifyToken(token)
        const {iat, exp, ...decodedPayload} = decodedToken.payload
        expect(decodedPayload).toEqual(payload)

    })
})