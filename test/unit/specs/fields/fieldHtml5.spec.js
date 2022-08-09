import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import fieldHtml5 from "src/fields/fieldHtml5.vue";

Vue.component("fieldHtml5", fieldHtml5);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[el, vm, field] = createVueField(test, "fieldHtml5", schema, model, disabled, options);
}

describe("fieldHtml5.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "html5",
			inputType: "text",
			label: "Name",
			model: "name",
			autocomplete: "off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
		});

		it("should contain the value", (done) => {
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("John Doe");
				done();
			});
		});

		let inputTypes = new Map([
			["text", ["autocomplete", "disabled", "placeholder", "readonly"]],
			["password", ["autocomplete", "disabled", "placeholder", "readonly"]],
			["checkbox", ["autocomplete", "disabled"]],
			// ["radio", [] ],
			// ["button", [] ],
			// ["submit", [] ],
			// ["reset", [] ],
			// ["file", [] ],
			// ["hidden", [] ],
			// ["image", [] ],
			// ["datetime",  ],
			// ["datetime", ],
			// ["date", ],
			// ["month", ],
			// ["time", ],
			// ["week", ],
			["number", ["autocomplete", "disabled", "placeholder", "readonly"]],
			// ["range", ["autocomplete"]],
			["email", ["autocomplete", "disabled", "placeholder", "readonly"]],
			["url", ["autocomplete", "disabled", "placeholder", "readonly"]],
			// ["search", ],
			["tel", ["autocomplete", "disabled", "placeholder", "readonly"]],
			["color", ["autocomplete"]]
		]);
		for (let [inputType, attributes] of inputTypes) {
			
			describe("change type of input", () => {
				
				it("should become a " + inputType, function(done) {
					field.schema.inputType = inputType;
					vm.$nextTick(() => {
						expect(input.type).to.be.equal(inputType);
						done();
					});

				});
				
				describe("check optional attribute", () => {
				
					attributes.forEach(function(name) {
						it("should set " + name, function(done) {
							checkAttribute(name, vm, input, field, schema, done);
						});
				
					});
				
				});

			});
		}

		it("input value should be the model value after changed", (done) => {
			model.name = "Jane Doe";
			vm.$nextTick(() => {
				expect(input.value).to.be.equal("Jane Doe");
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			input.value = "John Smith";
			trigger(input, "input");

			vm.$nextTick(() => {
				expect(model.name).to.be.equal("John Smith");
				done();
			});

		});

	});

});
