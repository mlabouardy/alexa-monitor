var MetricsDB = require('./metricsdb')

const db = new MetricsDB()

exports.handler = (event, context, callback) => {

  try {

    if (event.session.new) {
      console.log("NEW SESSION")
    }

    switch (event.request.type) {
      case "LaunchRequest":
        console.log(`LAUNCH REQUEST`)
        break;
      case "IntentRequest":
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name){
          case "GetSystemUsage":
            var city = event.request.intent.slots.City.value
            var metric = event.request.intent.slots.Metric.value
            switch(metric.toLowerCase()) {
              case "cpu":
                db.getCPU(city, function(data){
                  context.succeed(buildResponse(data))
                })
                break;
              case "memory":
                db.getMemory(city, function(data){
                  context.succeed(buildResponse(data))
                })
                break;
              case "disk":
                db.getDisk(city, function(data){
                  context.succeed(buildResponse(data))
                })
                break;
              default:
                context.succeed(buildResponse("Metric type unknown"))
            }
            break;
          default:
          context.succeed(buildResponse("Sorry I couldn't understand"))
        }
        break;
      case "SessionEndedRequest":
        console.log(`SESSION ENDED REQUEST`)
        break;
      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
    }

  } catch(error) { context.fail(`Exception: ${error}`) }
}

buildResponse = (outputText) => {
  return {
    version: "1.0",
    sessionAttributes: {
      outputSpeech: {
        type: "PlainText",
        text: outputText
      },
      shouldEndSession: true
    },
    response: {}
  }
}
