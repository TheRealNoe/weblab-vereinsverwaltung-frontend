import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { Resource } from "../../interfaces/Resource";
import { ResourceService } from "../../services/resource.service";
import { SpinnerService } from "../../services/spinner.service";

@Component({
	selector: "app-resource-modify",
	templateUrl: "./resource-modify.component.html",
	styleUrls: ["./resource-modify.component.scss"],
})
export class ResourceModifyComponent implements OnInit {
	resourceModifyForm: FormGroup = new FormGroup({});

	resource: Resource = {
		_id: "",
		name: "",
		amount: 0,
		location: "",
		information: "",
	};

	resourceID: string = "";

	constructor(
		private fb: FormBuilder,
		private resourceService: ResourceService,
		private spinnerService: SpinnerService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
	) {
		this.spinnerService.spinnerOn();
	}

	ngOnInit() {
		this.resourceModifyForm = this.fb.group({
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

		this.route.params.subscribe((params) => {
			this.resourceID = params["id"];
			this.resourceService.getResource(params["id"]).subscribe(
				(response) => {
					this.resource = response;
					this.spinnerService.spinnerOff();
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Laden der Ressource ist ein Fehler aufgetreten."
					);
					this.router.navigate(["/resources"]);
				}
			);
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();

			if (this.resource.information === "")
				delete this.resource.information;

			this.resourceService.putResource(this.resource).subscribe(
				(response) => {
					this.spinnerService.spinnerOff();
					this.notificationService.success(
						"Änderungen zur Ressource wurden gespeichert."
					);
					this.router.navigate(["/resources"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error(
						"Beim Speichern der Ressource ist ein Fehler aufgetreten."
					);
				}
			);
		}
	}
}
