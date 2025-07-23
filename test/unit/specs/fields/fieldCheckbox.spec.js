import { mount, createLocalVue } from "@vue/test-utils";
import { checkAttribute2 } from "../util";

import FieldCheckbox from "src/fields/core/fieldCheckbox.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldCheckbox, {
		localVue,
		propsData: data,
		methods: methods
	});

	wrapper = _wrapper;

	return _wrapper;
}

describe("FieldCheckbox.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "checkbox",
			label: "Status",
			model: "status",
			fieldClasses: ["applied-class", "another-class"],
			autocomplete: "off",
			disabled: false,
			inputName: ""
		};
		let model = { status: true };
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("input");
		});

		it("should contain a checkbox element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("input")).to.be.true;
			expect(input.attributes().type).to.be.equal("checkbox");
		});

		it("should contain the value", () => {
			expect(input.element.checked).to.be.true;
		});

		it("input value should be the model value after changed", () => {
			model.status = false;
			wrapper.update();

			expect(input.element.checked).to.be.false;
		});

		it.skip("model value should be the input value if changed", () => {
			model.status = true;
			wrapper.trigger("click");
			wrapper.update();

			expect(model.status).to.be.false;
		});

		it("should have 2 classes", () => {
			expect(wrapper.classes()).to.include("applied-class");
			expect(wrapper.classes()).to.include("another-class");
		});

		describe("check optional attribute", () => {
			let attributes = ["autocomplete", "disabled", "inputName"];

			attributes.forEach(name => {
				it("should set " + name, () => {
					checkAttribute2(name, wrapper, schema);
				});
			});
		});
	});
});
