import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationService } from "../notification.service";
import { Resource } from "../Resource";
import { ResourceService } from "../resource.service";
import { SpinnerService } from "../spinner.service";

@Component({
	selector: "app-resource-add",
	templateUrl: "./resource-add.component.html",
	styleUrls: ["./resource-add.component.scss"],
})
export class ResourceAddComponent implements OnInit {
	resourceAddForm: FormGroup = new FormGroup({});

	constructor(
		private fb: FormBuilder,
		private resourceService: ResourceService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {}

	ngOnInit() {
		this.resourceAddForm = this.fb.group({
			name: ["", [Validators.required, Validators.minLength(2)]],
			amount: [
				"",
				[
					Validators.required,
					Validators.min(0),
					Validators.max(10000000),
				],
			],
			location: ["", [Validators.required, Validators.minLength(2)]],
			information: ["", []],
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			const resource: Resource = {
				name: form.value.name,
				amount: form.value.amount,
				location: form.value.location,
				information: form.value.information,
			};
			this.resourceService.postResource(resource).subscribe(
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
