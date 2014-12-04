var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('fortune cookie tests', function () {
	test('getFortune() should return a fortune', function () {
		expect(typeof fortune.getFortune() === 'string');
	});



	test('getFortune() should be random', function () {
		var randomMinThreshold = 3,
			randomMaxThreshold = 25,
			randomRuns = 50,
			randomElem = fortune.getFortune,
			randomElemsArray = fortune.fCookies,
			randomTest = {
				getArray: function (arr) {
					var arr = arr || [], i;

					for (i = 0; i < randomRuns; i++) {
						arr.push(randomElem());
					};

					return arr;
				},
				build: function () {
					var fortuneArr = this.getArray(),
						randomElems = randomElemsArray,
						randomChk,
						filteredArrays = [];

						randomElems.forEach(function (val, idx, arr) {

							randomChk = function (v, i, a) {
								return v === randomElems[idx];
							};

							filteredArrays.push(fortuneArr.filter(randomChk));
						});

					return filteredArrays;
				},
				init: function () {
					var data = this.build();

					data.forEach(function (val, idx, arr) {
						//console.log('\n', data[idx][0], '\n>>> COUNT:', data[idx].length, 'out of 50 || should be above:', randomMinThreshold, 'and below:', randomMaxThreshold, 'out of 50.');
						expect(data[idx].length).to.be.above(randomMinThreshold);
						expect(data[idx].length).to.be.below(randomMaxThreshold);
					});

				}
			};

		randomTest.init();

	});



});