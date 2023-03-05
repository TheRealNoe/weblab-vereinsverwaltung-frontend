import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { Member } from "../Member";
import { MemberService } from "../member.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import { Router } from "@angular/router";
import * as moment from "moment";

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

	member: Member = {
		prename: "",
		name: "",
		birthday: "",
		street: "",
		postcode: "",
		city: "",
		email: "",
		phone: "",
	};

	constructor(
		private fb: FormBuilder,
		private memberService: MemberService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {
		const currentYear = new Date().getFullYear();
		this.minDate = new Date(currentYear - 150, 0, 1);
		this.maxDate = new Date();
	}

	ngOnInit() {
		this.memberAddForm = this.fb.group({
			prename: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(20),
				],
			],
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(30),
				],
			],
			birthday: ["", [Validators.required]],
			street: ["", [Validators.minLength(5), Validators.maxLength(40)]],
			postcode: ["", [Validators.minLength(4), Validators.maxLength(12)]],
			city: ["", [Validators.minLength(2), Validators.maxLength(30)]],
			email: ["", [Validators.email, Validators.maxLength(40)]],
			phone: ["", [Validators.minLength(6), Validators.maxLength(15)]],
		});
	}
	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();

			this.member.birthday = moment(this.member.birthday).format(
				"YYYY-MM-DD"
			);

			if (this.member.street === "") delete this.member.street;
			if (this.member.postcode === "") delete this.member.postcode;
			if (this.member.city === "") delete this.member.city;
			if (this.member.email === "") delete this.member.email;
			if (this.member.phone === "") delete this.member.phone;

			this.memberService.postMember(this.member).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Ein neues Mitglied wurde erstellt."
					);
					this.router.navigate(["/members"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Erstellen des neuen Mitglieds ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
