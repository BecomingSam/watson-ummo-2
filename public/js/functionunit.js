var WebSocket = require('ws');

var token = "DH%2BaqQgcBZNmSnVg2UjqPRmCXL0kjm7YjKuvwJugZ4r82Gafnz2bhYEP1PXmogBVS7%2F0oKfkPhQdkVYfXA1X3YRT7I8R7SmeiRIjuiONyMFl%2FiFy8Me5gtUtQ0Wq6CUV%2FgiAr2H5jgf2%2BBi4JScul9kQPCu7Bpi%2BVl2Eft5u6EvO77AiLSNVtlmsh%2FHHwAoO00whT7iZdjd2z4cnYdVhuqhl0gYXRdYWwANYhzUyjejQ0dH6v3DANaN6ZiHNhyoKO1joI1r4ySQHgsmZ4j0z8OpkOeEqiL0fpgkHTsJ55YDBbEynvV2aj1pjZxiool3tMRcUk8sYoJjFZA8T6pULeuuhNGbAbjOeUK2Uij1fvi8vn0bIU5kg4aXPZ8%2F9OvLtfjRp0iPXqf8UY1qGYB4saXIiQtiwePlL%2BCtXbncrXJIs2YHGrdOgHfqsjU7f8EKs3%2BiZhCMcWbHcvzxoWaPpgj%2Bjt26j6uv2zf7JKVnTaV9owieGngo2%2BLrdqq9XuAKXyMLC9wupxQd6mzo%2FrXnsVlgGh1mPpUb0zqX0w07idy%2BSvnfHwk8mCBfnuCywuXNt11zPV0Je2XMGiY5ts%2FamrDAVd4B5nYcxzn7SMcruvOS94hacezlfTq6V2v126zAUbOa2sQE2meszbxJQgfutRf2mF4i1fSYS%2BNbhBfe9SwEAzXT9dNM9gEdD8FxJtKdLNjmdijtJTZe6XGFXhSMFYiFzAP1vXlWhKqU%2BfStjLEN2ptqMcsZB%2BhySWY3MhiXwzCUThbNc7SuhIQiDuXu5bWA%2Bboz2NywH29cIu26ow4jtunWdKU92w54HmfFk2WckpZuzWZ6cWL%2BC%2FEni5oKBjHPj6gdDASoY04jKoeD5xHJCCFy9VJG1CiPZutVKlDrD";
var wsURI = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=" + token
  + "&model=es-ES_BroadbandModel";
var websocket = new WebSocket(wsURI);
console.log(websocket.readyState );
websocket.on('open', function open()  { 

	var message = "{\"action\": \"start\", \"content-type\": \"audio/l16;rate=22050\"}";
console.log(JSON.stringify(message));
websocket.send(JSON.stringify(message));


});
websocket.on('close', function(evt) { onClose(evt) });
websocket.on('message', function(evt) { onMessage(evt) });
websocket.on('error', function(evt) { onError(evt) });


function onMessage(msg) {
    console.log("message" + msg.data);
  }


function onOpen(msg) {
    console.log(msg.toString());
  }


function onError(msg) {
    console.log(msg.toString());
  }


function onClose(msg) {
    console.log(msg.toString());
  }
