var speedy = false;

function check_speedy() {
	if (speedy) {
		player.speed = 500;
		dampening = 0.99;
	}	else {
		dampening = 0.875;
	}
}
setInterval(check_speedy, 0);
