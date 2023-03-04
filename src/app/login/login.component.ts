import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../account.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import { Credential } from "../Credential";
import { User } from "../User";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	loginForm: FormGroup = new FormGroup({});

	constructor(
		private fb: FormBuilder,
		private accountService: AccountService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private router: Router
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ["", [Validators.required, Validators.minLength(3)]],
			password: ["", [Validators.required, Validators.minLength(3)]],
		});
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.spinnerService.spinnerOn();
			const credential: Credential = {
				username: form.value.username,
				password: form.value.password,
			};
			this.accountService.login(credential).subscribe(
				(response) => {
					if (response) {
						this.accountService.setUser(response);
					}
					this.spinnerService.spinnerOff();
					this.notificationService.success("Login erfolgreich.");
					this.router.navigate(["/stats"]);
				},
				(error) => {
					this.spinnerService.spinnerOff();
					this.notificationService.error("Login fehlgeschlagen.");
				}
			);
		}
	}
}
