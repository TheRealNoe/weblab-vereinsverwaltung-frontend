import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../account.service";

@Component({
	selector: "app-sidenav",
	templateUrl: "./sidenav.component.html",
	styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent {
	constructor(
		private accountService: AccountService,
		private router: Router
	) {}

	logout() {
		this.accountService.logout();
		this.router.navigate(["/login"]);
	}
}
