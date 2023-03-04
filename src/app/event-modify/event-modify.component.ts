import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from "../Event";
import { EventService } from "../event.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
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
	selector: "app-event-modify",
	templateUrl: "./event-modify.component.html",
	styleUrls: ["./event-modify.component.scss"],
	providers: [
		{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
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
		starttime: "",
		endtime: "",
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
		this.minDate = new Date(currentYear - 10, 0, 1);
		this.maxDate = new Date(currentYear + 10, 0, 1);
	}

	ngOnInit() {
		this.eventModifyForm = this.fb.group({
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
			this.event.starttime = moment(this.event.starttime).format(
				"YYYY-MM-DDTHH:mm:ss"
			);
			this.event.endtime = moment(this.event.endtime).format(
				"YYYY-MM-DDTHH:mm:ss"
			);
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
