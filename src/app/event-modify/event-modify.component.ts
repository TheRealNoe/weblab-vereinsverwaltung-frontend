import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from "../Event";
import { EventService } from "../event.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
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
	selector: "app-event-modify",
	templateUrl: "./event-modify.component.html",
	styleUrls: ["./event-modify.component.scss"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DateFormats },
	],
})
export class EventModifyComponent implements OnInit {
	eventModifyForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	event: Event = {
		_id: "",
		name: "",
		location: "",
		time: "",
		duration: "",
		information: "",
	};

	eventID: string = "";

	constructor(
		private fb: FormBuilder,
		private eventService: EventService,
		private spinnerService: SpinnerService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
	) {
		this.spinnerService.spinnerOn();
		const currentYear = new Date().getFullYear();
		this.minDate = new Date();
		this.maxDate = new Date(currentYear + 10, 0, 1);
	}

	ngOnInit() {
		this.eventModifyForm = this.fb.group({
			name: ["", [Validators.required, Validators.minLength(2)]],
			location: ["", [Validators.required, Validators.minLength(2)]],
			time: ["", [Validators.required]],
			duration: ["", []],
			information: ["", []],
		});

		this.route.params.subscribe((params) => {
			this.eventID = params["id"];
			this.eventService.getEvent(params["id"]).subscribe(
				(response) => {
					this.event = response;
					this.spinnerService.spinnerOff();
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Laden des Events ist ein Fehler aufgetreten."
					);
				}
			);
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			this.event.time = moment(this.event.time).format("YYYY-MM-DD");
			this.eventService.putEvent(this.event).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Änderungen zum Event wurden gespeichert."
					);
					this.router.navigate(["/events"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Speichern des Events ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
