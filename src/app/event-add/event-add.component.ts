import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { Router } from "@angular/router";
import { EventService } from "../event.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import { Event } from "../Event";

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
	selector: "app-event-add",
	templateUrl: "./event-add.component.html",
	styleUrls: ["./event-add.component.scss"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DateFormats },
	],
})
export class EventAddComponent implements OnInit {
	eventAddForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	constructor(
		private fb: FormBuilder,
		private eventService: EventService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {
		const currentYear = new Date().getFullYear();
		this.minDate = new Date();
		this.maxDate = new Date(currentYear + 10, 0, 1);
	}

	ngOnInit() {
		this.eventAddForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(30),
				],
			],
			location: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(30),
				],
			],
			time: ["", [Validators.required]],
			duration: ["", [Validators.maxLength(15)]],
			information: ["", [Validators.maxLength(150)]],
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			const event: Event = {
				name: form.value.name,
				location: form.value.location,
				time: form.value.time.format("YYYY-MM-DD"),
				duration: form.value.duration,
				information: form.value.information,
			};
			this.eventService.postEvent(event).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Ein neues Event wurde erstellt."
					);
					this.router.navigate(["/events"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Erstellen des neuen Events ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
