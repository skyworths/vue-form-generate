import { expect } from "chai";
import { createVueField, trigger } from "../util";

import Vue from "vue";
import FieldSelectEx from "src/fields/fieldSelectEx.vue";

Vue.component("FieldSelectEx", FieldSelectEx);

let el, vm, field;

function createField(schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField("fieldSelectEx", schema, model, disabled, options);
}

describe("fieldSelectEx.vue", () => {

	describe("check template", () => {
		let schema = {
			type: "selectEx",
			label: "Cities",
			model: "city",
			multiSelect: false,
			required: false,
			values: [
				"London",
				"Paris",
				"Rome",
				"Berlin"
			]
		};
		let model = { city: "Paris" };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain a select element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.classList.contains("selectpicker")).to.be.true;
			expect(input.disabled).to.be.false;	
			expect(input.multiple).to.be.false;	
		});

		it("should contain option elements", () => {
			let options = input.querySelectorAll("option");
			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>

			expect(options[2].value).to.be.equal("Paris");
			expect(options[2].textContent).to.be.equal("Paris");
			expect(options[2].selected).to.be.true;
		});

		it("should contain a <non selected> element", () => {
			let options = input.querySelectorAll("option");
			expect(options[0].disabled).to.be.false;
			expect(options[0].textContent).to.be.equal("<Not selected>");
		});		

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Paris");	
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = "Rome";
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("Rome");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "London";
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.city).to.be.equal("London");	
				done();
			});

		});

		it("should contain a disabled <non selected> element if required", (done) => {
			schema.required = true;
			vm.$nextTick( () => {
				let options = input.querySelectorAll("option");
				//expect(options[0].disabled).to.be.true;
				expect(options[0].textContent).to.be.equal("<Not selected>");
				done();
			});
		});

		it("should not be multiple", (done) => {
			schema.multiSelect = true;
			vm.$nextTick( () => {
				expect(input.multiple).to.be.true;	
				let options = input.querySelectorAll("option");
				expect(options.length).to.be.equal(4); // no <non selected>

				done();
			});
		});

	});

	describe("check static values with { id, name } objects", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			values: [
				{ id: 1, name: "London" },
				{ id: 2, name: "Paris" },
				{ id: 3, name: "Rome" },
				{ id: 4, name: "Berlin" }
			]
		};
		let model = { city: 2 };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain option elements", () => {
			let options = input.querySelectorAll("option");
			expect(options.length).to.be.equal(4 + 1); // +1 for <non selected>

			expect(options[2].value).to.be.equal("2");
			expect(options[2].textContent).to.be.equal("Paris");
			expect(options[2].selected).to.be.true;
			expect(options[1].selected).to.be.false;
		});		

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("2");	
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = 3;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("3");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "4";
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.city).to.be.equal(4);	
				done();
			});

		});

	});

	describe("check function values", () => {
		let schema = {
			type: "select",
			label: "Cities",
			model: "city",
			values() {
				return [
					{ id: 1, name: "London" },
					{ id: 2, name: "Paris" },
					{ id: 3, name: "Rome" },
					{ id: 4, name: "Berlin" }
				]
			}
		};
		let model = { city: 2 };
		let input;

		before( () => {
			createField(schema, model, false);
			input = el.getElementsByTagName("select")[0];
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("2");	
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.city = 3;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal("3");	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "4";
			trigger(input, "change");

			vm.$nextTick( () => {
				expect(model.city).to.be.equal(4);	
				done();
			});

		});

	});	

});