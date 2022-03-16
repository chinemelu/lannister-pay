import fcsParser from "../helper/fcsParser.js"

export const postFeesController = (req, res) => {
  const fcs = req.body.FeeConfigurationSpec
  if (!fcs) {
    res.status(400).json({
      message: 'No Fee Configuration Spec',
      statusCode: 400,
    })
    return
  }
  const parsedFcs = fcsParser(fcs)
  res.status(200).json({
    statusCode: 200,
    status: "ok",
    parsedFcs
  })
}