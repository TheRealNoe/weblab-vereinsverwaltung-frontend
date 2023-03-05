import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { Resource } from "../../interfaces/Resource";
import { ResourceService } from "../../services/resource.service";
import { SpinnerService } from "../../services/spinner.service";

@Component({
	selector: "app-resource-add",
	templateUrl: "./resource-add.component.html",
	styleUrls: ["./resource-add.component.scss"],
})
export class ResourceAddComponent implements OnInit {
	resourceAddForm: FormGroup = new FormGroup({});

	resource: Resource = {
		name: "",
		amount: 0,
		location: "",
		information: "",
	};

	constructor(
		private fb: FormBuilder,
		private resourceService: ResourceService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {}

	ngOnInit() {
		this.resourceAddForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(30),
				],
			],
			amount: [
				"",
				[
					Validators.required,
					Validators.min(0),
					Validators.max(10000000),
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
			information: ["", [Validators.maxLength(150)]],
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();

			if (this.resource.information === "")
				delete this.resource.information;

			this.resourceService.postResource(this.resource).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Eine neue Ressource wurde erstellt."
					);
					this.router.navigate(["/resources"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Erstellen der neuen Ressource ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
