
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});



QUnit.test( "hello calc", function( assert ) {
	var x = decide();
	var x1 = decide();
	var x2 = decide();
	var x3 = decide();
	var x4 = decide();
	var x5 = decide();
	var x6 = decide();
	console.log(x);
	console.log(x1);
	console.log(x2);
	console.log(x3);
	console.log(x4);
	console.log(x5);
	console.log(x6);

	assert.ok( ((x == 1) || (x == 0)), "Passed!" );
});
