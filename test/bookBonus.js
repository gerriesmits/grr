var Grr = artifacts.require("./Grr.sol");
var BookBonus = artifacts.require("./BookBonus.sol");

contract('BookBonus', (accounts) => {

	let token, bookBonus;
	let tokenOwner = accounts[1];
	let tokenReceiver = accounts[2];
	let amount = 100;

	describe('Grr coin setup', () => {

		it("deploys Grrcoin", (done) => {
			Grr.new({
				from: tokenOwner
			}).then(function(_grr) {
				assert.ok(_grr.address);
				token = _grr;
				done();
			});
		});


	});
	describe('BookBonus setup', () => {

		it("deploys BookBonus", (done) => {
			BookBonus.new({
				from: tokenOwner
			}).then(function(_bookbonus) {
				assert.ok(_bookbonus.address);
				bookBonus = _bookbonus;
				done();
			});
		});

		it("should mint Grr tokens to the BookBonus contract", (done) => {
			token.mint(bookBonus.address, 250 * 1e18, {
				from: tokenOwner
			}).then(function() {
				done();
			});
		});

		it("should read the correct balance on the BookBonus contract", (done) => {
			token.balanceOf(tokenReceiver).then(function(_balance) {
				assert.equal(_balance, amount);
				done();
			});
		});

	});
});
