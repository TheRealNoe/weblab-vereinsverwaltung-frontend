import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./services/spinner.service";
import {
	BreakpointObserver,
	Breakpoints,
	BreakpointState,
} from "@angular/cdk/layout";
import { MatDrawerMode } from "@angular/material/sidenav";
import { NavigationEnd, Router, Event, NavigationStart } from "@angular/router";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	currentRoute: string = "";
	spinnerSpinning: boolean = false;

	loginPage: boolean = false;

	navMode: MatDrawerMode = "side";
	opened: boolean = true;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private spinnerService: SpinnerService,
		private router: Router
	) {
		spinnerService.spinning.subscribe((val) => {
			this.spinnerSpinning = val;
		});

		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationStart) {
				this.spinnerSpinning = false;
			}
			if (event instanceof NavigationEnd) {
				this.loginPage = false;
				this.opened = true;
				this.navMode = "side";
				if (this.breakpointObserver.isMatched("(max-width: 600px)")) {
					this.opened = false;
					this.navMode = "over";
				}
				if (event.urlAfterRedirects === "/login") {
					this.loginPage = true;
					this.opened = false;
					this.navMode = "over";
				}
			}
		});
	}
	ngOnInit() {
		this.breakpointObserver
			.observe(Breakpoints.HandsetPortrait)
			.subscribe((result) => {
				this.opened = true;
				this.navMode = "side";

				if (this.loginPage) {
					this.opened = false;
					this.navMode = "over";
				}

				if (result.matches) {
					this.opened = false;
					this.navMode = "over";
				}
			});
	}
}
