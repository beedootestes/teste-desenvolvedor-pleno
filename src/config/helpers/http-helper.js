export const badRequest =  (res, message) => {
  res.status(400).json({ message})
}

export const serverError = (res, error) => {
  res.status(500).json({ message: ` ${error}`})
}
  
export const ok = (res, message, data = '') => {
  res.status(200).json({ message, data:{ data }})
}
export const createdResource = (res, message,  data = '') => {
  res.status(201).json({ message, data:{ data }})
}