
function decide() {

	var rand =  Math.floor((Math.random() * 100) + 1);
	if(rand < 50) {
		return 1;
	} else {
		return 0;
	}
}

