import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { Member } from "../member";
import { MemberService } from "../member.service";
import { SpinnerService } from "../spinner.service";

export const DateFormats = {
	parse: {
		dateInput: "DD.MM.YYYY",
	},
	display: {
		dateInput: "DD.MM.YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "LL",
		monthYearA11yLabel: "MMMM YYYY",
	},
};

@Component({
	selector: "app-member-add",
	templateUrl: "./member-add.component.html",
	styleUrls: ["./member-add.component.scss"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DateFormats },
	],
})
export class MemberAddComponent implements OnInit {
	memberAddForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	constructor(
		private fb: FormBuilder,
		private memberService: MemberService,
		private spinnerService: SpinnerService
	) {
		const currentYear = new Date().getFullYear();
		this.minDate = new Date(currentYear - 150, 0, 1);
		this.maxDate = new Date();
	}

	ngOnInit() {
		this.memberAddForm = this.fb.group({
			prename: ["", [Validators.required, Validators.minLength(2)]],
			name: ["", [Validators.required, Validators.minLength(2)]],
			birthday: ["", [Validators.required]],
			street: ["", [Validators.minLength(5)]],
			postcode: ["", [Validators.minLength(4)]],
			city: ["", [Validators.minLength(2)]],
			email: ["", [Validators.email]],
		});
	}
	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			const member: Member = {
				prename: form.value.prename,
				name: form.value.name,
				birthday: form.value.birthday.format("YYYY-MM-DD"),
				street: form.value.street,
				postcode: form.value.postcode,
				city: form.value.city,
				email: form.value.email,
			};
			this.memberService.postMember(member).subscribe(() => {
				this.spinnerService.spinnerOff();
				console.log("created");
			});
		}
	}
}
