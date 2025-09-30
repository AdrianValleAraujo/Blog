import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.headers.authorization
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.json({ success: false, message: 'Invalid token' })
  }
}

export default auth

//  const isCustomAuth = token.length < 500
//         let decodedData
//         if (token && isCustomAuth) {
//             decodedData = jwt.verify(token, process.env.JWT_SECRET)
//             req.userId = decodedData?.id
//         } else {
//             decodedData = jwt.decode(token)
//             req.userId = decodedData?.sub
//         }
