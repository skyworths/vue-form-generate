import { expect } from "chai";

import v from "src/utils/validators";

function check(validator, value, field, errorCount) {
	let res = validator(value, field);
	if (errorCount > 0 ||  res != undefined) {
		expect(res).to.be.instanceof(Array);
		expect(res).to.be.length(errorCount);
	}
	return res;
}

describe("Validators", () => {

	describe("test Validators.number", () => {

		let field = {
			min: 5,
			max: 10,
			required: true
		}

		it("should give error if value is null, but field is required", () => {
			check(v.number, null, field, 1);
		});

		it("should give error if value is smaller than min", () => {
			check(v.number, -1, field, 1);
			check(v.number, 0, field, 1);
			check(v.number, 3, field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.number, 15, field, 1);
		});
		
		it("should not give error", () => {
			check(v.number, 5, field, 0);
			check(v.number, 8, field, 0);
			check(v.number, 10, field, 0);
			check(v.number, 7.56, field, 0);
		});

		it("should give error if value is string", () => {
			check(v.number, "Abc", field, 1);
			check(v.number, "12 Abc", field, 1);
			check(v.number, "", field, 1);
			check(v.number, "    ", field, 1);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.number, null, field, 0);
		});

	});

	describe("test Validators.integer", () => {

		let field = {}

		it("should give error if value is not integer", () => {
			check(v.integer, 3.14, field, 1);
			check(v.integer, "3.14", field, 1);
		});

		it("should not give error if value is integer", () => {
			check(v.integer, -5, field, 0);
			check(v.integer, 0, field, 0);
			check(v.integer, 10, field, 0);
		});

	});

	describe("test Validators.double", () => {

		let field = {}

		it("should give error if value is not double", () => {
			check(v.double, "3,14", field, 1);
			check(v.double, false, field, 1);
		});

		it("should not give error if value is double", () => {
			check(v.double, 3.14, field, 0);
		});

	});

	describe("test Validators.string", () => {

		let field = {
			required: true,
			min: 3,
			max: 10
		}

		it("should give error if value is null, but field is required", () => {
			check(v.string, null, field, 1);
		});

		it("should give error if value is smaller than min", () => {
			check(v.string, "", field, 1);
			check(v.string, "A", field, 1);
			check(v.string, "ab", field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.string, "abcdefghijklmnop", field, 1);
		});

		it("should give error if value is not string", () => {
			check(v.string, 123, field, 1);
			check(v.string, true, field, 1);
			check(v.string, [], field, 1);
		});
		
		it("should not give error", () => {
			check(v.string, "Foo", field, 0);
			check(v.string, "Foobar", field, 0);
			check(v.string, "John Doe", field, 0);
			check(v.string, "Foobar7890", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.string, null, field, 0);
		});
	});

	describe("test Validators.date", () => {

		let field = {
			required: true,
			min: 1262799081231,
			max: 1562799081231
		}

		it("should give error if value is null, but field is required", () => {
			check(v.date, null, field, 1);
		});

		it("should not give error", () => {
			check(v.date, "2016-05-09", field, 0);
			check(v.date, 1462799081231, field, 0);
		});

		it("should give error if value is smaller than min", () => {
			check(v.date, 1220000000000, field, 1);
			check(v.date, "1900-04-05", field, 1);
		});
		
		it("should give error if value is greater than max", () => {
			check(v.date, 1600000000000, field, 1);
			check(v.date, "2100-04-05", field, 1);
		});

		it("should give error if value is not a date", () => {
			check(v.date, "Foo", field, 1);
			check(v.date, true, field, 1);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.date, null, field, 0);
		});

	});

	describe("test Validators.regexp", () => {

		let field = {
			required: true,
			pattern: /^[a-z0-9-]+$/g
		}

		it("should give error if value is null, but field is required", () => {
			check(v.regexp, null, field, 1);
		});

		it("should give error if value is not matched the pattern", () => {
			check(v.regexp, "ABCD", field, 1);
			check(v.regexp, "12 34", field, 1);
			check(v.regexp, "555+666", field, 1);
		});
		
		it("should not give error", () => {
			check(v.regexp, "foo-bar", field, 0);
			check(v.regexp, "john-doe-123", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.regexp, null, field, 0);
		});
	});

	describe("test Validators.email", () => {

		let field = { required: true };

		it("should give error if value is null, but field is required", () => {
			check(v.email, null, field, 1);
		});

		it("should give error if value is not matched the pattern", () => {
			check(v.email, "abcdefg", field, 1);
			check(v.email, "1234", field, 1);
			check(v.email, "abc@gmail", field, 1);
			check(v.email, "@gmail.com", field, 1);
		});
		
		it("should not give error", () => {
			check(v.email, "john.doe@company.net", field, 0);
			check(v.email, "james.123.45@mail.co.uk", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.email, null, field, 0);
		});
	});


	describe("test Validators.url", () => {

		let field = { required: true };

		it("should give error if value is null, but field is required", () => {
			check(v.url, null, field, 1);
		});

		it("should give error if value is not matched the pattern", () => {
			check(v.url, "abcdefg", field, 1);
			check(v.url, "1234.c", field, 1);
			check(v.url, "gmail.company1234", field, 1);
			check(v.url, "@gmail.com", field, 1);
		});
		
		it("should not give error", () => {
			check(v.url, "http://www.google.com", field, 0);
			check(v.url, "http://nasa.gov", field, 0);
			check(v.url, "http://github.com", field, 0);
			check(v.url, "http://github.com/icebob/vue-form-generator", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.url, null, field, 0);
		});
	});	

	describe("test Validators.creditCard", () => {

		let field = { required: true };

		it("should give error if value is null, but field is required", () => {
			check(v.creditCard, null, field, 1);
		});

		it("should give error if value is not matched the pattern", () => {
			check(v.creditCard, "12345679", field, 1);
			check(v.creditCard, "4556778266680579000", field, 1);
		});
		
		it("should not give error", () => {
			check(v.creditCard, "4556778266680579", field, 0); // Visa
			check(v.creditCard, "5491345312191350", field, 0); // Mastercard
			check(v.creditCard, "6011319767119926", field, 0); // Discover
			check(v.creditCard, "343811242956601", field, 0);  // American Express
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.creditCard, null, field, 0);
		});
	});	

	describe("test Validators.alpha", () => {

		let field = {
			required: true
		}

		it("should give error if value is null, but field is required", () => {
			check(v.alpha, null, field, 1);
		});

		it("should give error if value is not alpha", () => {
			check(v.alpha, "Abc5", field, 1);
			check(v.alpha, "$Abc", field, 1);
			check(v.alpha, "john.doe", field, 1);
			check(v.alpha, "john_doe", field, 1);
			check(v.alpha, 512, field, 1);
		});
		
		it("should not give error", () => {
			check(v.alpha, "F", field, 0);
			check(v.alpha, "Foo", field, 0);
			check(v.alpha, "Foobar", field, 0);
			check(v.alpha, "JohnDoe", field, 0);
			check(v.alpha, "FoobarWithoutNumber", field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.alpha, null, field, 0);
		});
	});

	describe("test Validators.alphaNumeric", () => {

		let field = {
			required: true
		}

		it("should give error if value is null, but field is required", () => {
			check(v.alphaNumeric, null, field, 1);
		});

		it("should give error if value is not alphaNumeric", () => {
			check(v.alphaNumeric, "Abc-5", field, 1);
			check(v.alphaNumeric, "$Abc", field, 1);
			check(v.alphaNumeric, "john.doe", field, 1);
			check(v.alphaNumeric, "john_doe", field, 1);
		});
		
		it("should not give error", () => {
			check(v.alphaNumeric, "F", field, 0);
			check(v.alphaNumeric, "Foo", field, 0);
			check(v.alphaNumeric, "Foobar", field, 0);
			check(v.alphaNumeric, "Foobar555", field, 0);
			check(v.alphaNumeric, "JohnDoe", field, 0);
			check(v.alphaNumeric, "FoobarWithoutNumber", field, 0);
			check(v.alphaNumeric, "100", field, 0);
			check(v.alphaNumeric, 512, field, 0);
		});

		it("should not give error if value is null and  field is not required", () => {
			field.required = false;
			check(v.alphaNumeric, null, field, 0);
		});
	});	
});