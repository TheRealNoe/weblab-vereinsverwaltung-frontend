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
import { ActivatedRoute } from "@angular/router";

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
	selector: "app-member-information",
	templateUrl: "./member-information.component.html",
	styleUrls: ["./member-information.component.scss"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DateFormats },
	],
})
export class MemberInformationComponent implements OnInit {
	memberModifyForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	member: Member = {
		_id: "",
		prename: "",
		name: "",
		birthday: "",
		street: "",
		postcode: 0,
		city: "",
		email: "",
	};

	memberID: string = "";

	constructor(
		private fb: FormBuilder,
		private memberService: MemberService,
		private spinnerService: SpinnerService,
		private route: ActivatedRoute
	) {
		this.spinnerService.spinnerOn();
		const currentYear = new Date().getFullYear();
		this.minDate = new Date(currentYear - 150, 0, 1);
		this.maxDate = new Date();
	}

	ngOnInit() {
		this.memberModifyForm = this.fb.group({
			prename: ["", [Validators.required, Validators.minLength(2)]],
			name: ["", [Validators.required, Validators.minLength(2)]],
			birthday: ["", [Validators.required]],
			street: ["", [Validators.minLength(5)]],
			postcode: ["", [Validators.minLength(4)]],
			city: ["", [Validators.minLength(2)]],
			email: ["", [Validators.email]],
		});

		this.route.params.subscribe((params) => {
			this.memberID = params["id"];
			this.memberService.getMember(params["id"]).subscribe((member) => {
				this.member = member;
				this.spinnerService.spinnerOff();
			});
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			this.memberService.putMember(this.member).subscribe(() => {
				this.spinnerService.spinnerOff();
				console.log("updated");
			});
		}
	}
}
