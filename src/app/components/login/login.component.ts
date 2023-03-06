import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { NotificationService } from "../../services/notification.service";
import { SpinnerService } from "../../services/spinner.service";
import { Credential } from "../../interfaces/Credential";
import { User } from "../../interfaces/User";

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
			username: ["", [Validators.required, Validators.minLength(5)]],
			password: ["", [Validators.required, Validators.minLength(5)]],
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
					if ([401, 403].includes(error.status)) {
						this.notificationService.error(
							"Login fehlgeschlagen: Falsche Anmeldedaten."
						);
					} else {
						this.notificationService.error(
							"Login fehlgeschlagen - versuchen Sie es nochmals."
						);
					}
				}
			);
		}
	}
}
