import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "../event.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import { Event } from "../Event";
import * as moment from "moment";
import {
	NgxMatDateFormats,
	NGX_MAT_DATE_FORMATS,
} from "@angular-material-components/datetime-picker";

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
	parse: {
		dateInput: "DD.MM.YYYY HH:mm",
	},
	display: {
		dateInput: "DD.MM.YYYY HH:mm",
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
		{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
	],
})
export class EventAddComponent implements OnInit {
	eventAddForm: FormGroup = new FormGroup({});
	minDate: Date;
	maxDate: Date;

	event: Event = {
		name: "",
		location: "",
		starttime: "",
		endtime: "",
		information: "",
	};

	@ViewChild("startpicker") startpicker: any;
	@ViewChild("endpicker") endpicker: any;

	constructor(
		private fb: FormBuilder,
		private eventService: EventService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {
		const currentYear = new Date().getFullYear();
		this.minDate = new Date(currentYear - 10, 0, 1);
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
			starttime: ["", [Validators.required]],
			endtime: ["", [Validators.required]],
			information: ["", [Validators.maxLength(150)]],
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			this.event.starttime = moment(this.event.starttime).format(
				"YYYY-MM-DDTHH:mm:ss"
			);
			this.event.endtime = moment(this.event.endtime).format(
				"YYYY-MM-DDTHH:mm:ss"
			);

			if (this.event.information === "") delete this.event.information;

			this.eventService.postEvent(this.event).subscribe(
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
