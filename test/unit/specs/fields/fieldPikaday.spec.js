import { expect } from "chai";
import { createVueField } from "../util";
import moment from "moment";

import Vue from "vue";
import FieldPikaday from "src/fields/fieldPikaday.vue";

Vue.component("FieldPikaday", FieldPikaday);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[ el, vm, field ] = createVueField(test, "fieldPikaday", schema, model, disabled, options);
}

describe("fieldPikaday.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "dateTime",
			label: "Event",
			model: "event"
		};
		let model = { event: 1462799081231 };
		let input;

		before( () => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
			expect(input.disabled).to.be.false;	
		});

		it("should contain the value", (done) => {
			vm.$nextTick( () => {
				expect(input.value).to.be.equal( moment(1462799081231).format("YYYY-MM-DD") );	
				done();
			});
		});

		it("should set disabled", (done) => {
			field.disabled = true;
			vm.$nextTick( () => {
				expect(input.disabled).to.be.true;	
				field.disabled = false;
				done();
			});
		});

		it("input value should be the model value after changed", (done) => {
			model.event = 1234567890123;
			vm.$nextTick( () => {
				expect(input.value).to.be.equal( moment(1234567890123).format("YYYY-MM-DD") );	
				done();
			});

		});

		it("model value should be the input value if changed", (done) => {
			let day = moment(1420070400000).format("YYYY-MM-DD");
			field.picker.setDate(day);

			vm.$nextTick( () => {
				expect(input.value).to.be.equal(day);	
				expect(moment(model.event).format("YYYY-MM-DD")).to.be.equal(day);	
				done();
			});

		});

	});

});
