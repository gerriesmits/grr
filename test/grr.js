var Grr = artifacts.require("./Grr.sol");

contract('Grr', (accounts) => {

	let token;
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

		it("mints Grrcoin", (done) => {
			token.mint(tokenReceiver, amount, {
				from: tokenOwner
			}).then(function() {
				done();
			});
		});

		it("checks balance after minting", (done) => {
			token.balanceOf(tokenReceiver).then(function(_balance) {
				assert.equal(_balance, amount);
				done();
			});
		});

		it("should be impossible for others to mint tokens", (done) => {
			token.mint(tokenReceiver, amount, {
				from: tokenOwner
			}).then(function() {
				assert.fail('this function should throw');
				done();
			}).catch((e) => {
				done();
			});
		});

		it("should finish minting", (done) => {
			token.finishMinting({
				from: tokenOwner
			}).then(function() {
				done();
			});
		});

		it("should be impossible to mint after minting was switched off", (done) => {
			token.mint(tokenReceiver, amount, {
				from: tokenOwner
			}).then(function() {
				assert.fail('this function should throw');
				done();
			}).catch((e) => {
				done();
			});;
		});


	})
});
