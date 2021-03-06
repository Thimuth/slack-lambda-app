AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east1:e97090d0-9618-4288-b608-4f4f67ff54767',
});
var lambda = new AWS.Lambda();
function returnGreetings() {
  document.getElementById('submitButton').disabled = true;
  var name = document.getElementById('name');
  var input;
  if (name.value == null || name.value == '') {
    input = {};
  } else {
    input = {
      name: name.value
    };
  }
  lambda.invoke({
    FunctionName: 'greetingsOnDemand',
    Payload: JSON.stringify(input)
  }, function(err, data) {
    var result = document.getElementById('result');
    if (err) {
      console.log(err, err.stack);
      result.innerHTML = err;
    } else {
      var output = JSON.parse(data.Payload);
      result.innerHTML = output;
    }
    document.getElementById('submitButton').disabled = false;
  });
}
var form = document.getElementById('greetingsForm');
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  returnGreetings();
});
