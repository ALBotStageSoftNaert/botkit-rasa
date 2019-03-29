const debug = require('debug')('botkit:rasa')
const axios = require('axios');
module.exports = config => {
  if (!config) {
    config = {}
  }

  if (!config.rasa_uri) {
    config.rasa_uri = 'http://localhost:5000'
  }



  var middleware = {
    receive: (bot, message, next) => {
      if (!message.text || message.is_echo) {
        next()
        return
      }

      debug('Sending message to Rasa', message.text)
      var request={
        method: 'get',
        url: `${config.rasa_uri}/parse`,
        params: {
          q: message.text
        }
      };
      if (config.project) {
        request.params.project=config.project;
      };
      if (config.model) {
        request.params.model=config.model;
      };
      axios(request).then(function (response) {
          debug('Rasa response', response);
          message.intent = response.data.intent;
          message.entities = response.data.entities;
          next();
        }).catch(function (err) {
          debug("Couldn't retrieve response from rasa. Check if your url, project and model are set correctly.",err);
        })
    },

    hears: (patterns, message) => {
      return patterns.some(pattern => {
        if (message.intent.name === pattern) {
          debug('Rasa intent matched hear pattern', message.intent, pattern)
          return true
        }
      })
    }

  }
  return middleware
}
