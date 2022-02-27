import generateToken from "./generateToken"
import jwtSign from "./jwtSign"
//expiredIn is second
export const generateJWTToken = async (userId, expiredIn = undefined) => {
  const subToken = generateToken()
  const token = await jwtSign({ id: userId, expiredIn }, { subToken })
  return {
    token,
    subToken,
  }
}

export const getBasicUserInfo = async (user) => {
  const token = await generateJWTToken(user.id);
  return {        
      "id": user.id,
      "username": user.username ?? "",
      "firstName": user.firstName ?? "",
      "lastName": user.lastName ?? "",
      "email": user.email ?? "",
      "type": user.type ?? "",
      "phoneNumber": user.phoneNumber ?? "",
      "emailVerified": user.emailVerified,
      "phoneVerified": user.phoneVerified,
      "website": user.website ?? "",
      "telegram": user.telegram ?? "",
      "facebook": user.facebook ?? "",
      "twitter": user.twitter ?? "",
      "instagram": user.instagram ?? "",
      "linkedin": user.linkedin ?? "",
      "whitepaper": user.whitepaper ?? "",
      "deactivated": user.deactivated ?? false,
      "verified": user.verified,
      "purchased": user.purchased ?? false,
      "purchaseDate": user.purchaseDate ?? "",
      "thumbUp": user.thumbUp ?? 0,
      "thumbDown": user.thumbDown ?? 0,
      "token": token.token
  }
}

export const getSourcePath = () => {
  return process.env.NODE_ENV == 'development' ? 'app' : 'dist'
}

export const getCurrency = (currency) => {
  const currencyList = {
    eur: '€',
    gbp: '£',
    usd: '$'
  }
  const _currency = currency ? currencyList[currency] : currencyList.usd
  return _currency || currencyList.usd
}

export const getDistance = (fromLocation, toLocation) => {
  if (!fromLocation || !toLocation) return 0
  const _from = fromLocation.split(',')
  const _to = toLocation.split(',')

  if (_from.length < 2 || _to.length < 2) return 0

  const [_fromLat, _fromLng] = _from
  const [_toLat, _toLng] = _to
  //Get spacing of 2 locations ==> Reuse from the old code
  //This function should improve to get distance from direction of google.
  let d = 100 * Math.sqrt(Math.pow(_fromLat - _toLat, 2) + Math.pow(_fromLng - _toLng, 2))
  return d > 1 ? d.toFixed(1) : d.toFixed(3);
}

export const getNextPage = (count, page, limitPerPage) => {
  let totalPage = count == 0 ? 1 : parseInt(count / limitPerPage)
  totalPage = count % limitPerPage == 0 ? totalPage : totalPage + 1
  totalPage.toFixed(1)
  const nextPage = parseInt(page) + 1
  return nextPage < totalPage ? nextPage : undefined
}