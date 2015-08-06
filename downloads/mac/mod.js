/* define variables as shown here . . .
 * exports.value = 1;
 * exports.string = "hello world";
 */

/* exports.value = 1;
exports.update = function() {
	console.log('hi');
}
exports.display = function() {
	// graphics here
} */

var speedy = false;

function check_speedy() {
	if (speedy) {
		player.speed = 500;
		dampening = 0.95;
	}	else {
		dampening = 0.875;
	}
}
setInterval(check_speedy, 0);
