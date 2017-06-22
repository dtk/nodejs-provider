// both dynamicAttributes and status are optional
// will default to empty dynamic attributes and a successful status
// function Dtk() {
//     return {
//         response: function () { console.log("hi") }
//     };
// }
function response(dynamicAtributes, status) {
  var dynamicAtributes = typeof dynamicAtributes  !== 'undefined' ?  dynamicAtributes  : {};
  var status = typeof status  !== 'undefined' ?  status  : 'ok';

  this.status = statusHash(status);
  this.dynamic_attributes = dynamicAtributes;
  return this;
}

function statusHash(status) {
	var statusResponse = {};
	switch(status) {
		case 'ok':
	    statusResponse = { success: 'true' }
	    break;
		case 'notok': 
	    statusResponse = { success: 'false', error: 'true' }
	    break;
		default:
	    const err = new Error(`Unexpected status '${status}'`);
			console.error(err.message);
	}
	return statusResponse;
};

// export the function
module.exports = response;