# Botkit / rasa NLU plugin

This plugin provides Botkit developers a way to use the [rasa NLU](https://rasa.ai/) open source, self hosted natural language API.



## Setup

Add botkit-rasa as a dependency to your Botkit-bot.
`npm install botkit-rasa`

Enable the middleware:

```javascript 
    var rasa = require('botkit-rasa')({
        rasa_uri: "my_rasa_url",//if no url was provided http://localhost:5000 will be used.
        project: "my_project",//project to use, if no project was provided project won't be used in the request.
        model: "my_model"//model to use, if no model was provided model won't be used in the request.
        });

    //if you chose to not include the project or the model you should adapt your rasa_uri to include these
    //mind the 'parse' route in this case.
   var rasa = require('botkit-rasa')({
       rasa_uri: "localhost:5000/parse?&model=<model>&project=<project>"
       });

    controller.middleware.receive.use(rasa.receive);

    //Eventually set rasa hears as the standard hears method.
    controller.changeEars(rasa.hears);
```
Setup a controller to use the hears middleware.
```javascript
controller.hears(['my_intent'],'message_received', rasa.hears, function(bot, message) {
    console.log('Intent:', message.intent);
    console.log('Entities:', message.entities);    
});
```



