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
import { SpinnerService } from "../spinner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../notification.service";
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
	selector: "app-member-modify",
	templateUrl: "./member-modify.component.html",
	styleUrls: ["./member-modify.component.scss"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DateFormats },
	],
})
export class MemberModifyComponent implements OnInit {
	memberModifyForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	member: Member = {
		_id: "",
		prename: "",
		name: "",
		birthday: "",
		street: "",
		postcode: "",
		city: "",
		email: "",
	};

	memberID: string = "";

	constructor(
		private fb: FormBuilder,
		private memberService: MemberService,
		private spinnerService: SpinnerService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
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
			this.memberService.getMember(params["id"]).subscribe(
				(response) => {
					this.member = response;
					this.spinnerService.spinnerOff();
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Laden des Mitglieds ist ein Fehler aufgetreten."
					);
				}
			);
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

			this.memberService.putMember(this.member).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Änderungen zum Mitglied wurden gespeichert."
					);
					this.router.navigate(["/members"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Speichern des Mitglieds ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
