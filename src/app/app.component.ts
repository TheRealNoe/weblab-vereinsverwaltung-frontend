import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDrawerMode } from "@angular/material/sidenav";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	navMode: MatDrawerMode = "side";
	opened: boolean = true;
	spinnerSpinning: boolean = false;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private spinnerService: SpinnerService
	) {
		spinnerService.spinning.subscribe((val) => {
			this.spinnerSpinning = val;
		});
	}

	ngOnInit() {
		this.breakpointObserver
			.observe(Breakpoints.HandsetPortrait)
			.subscribe((result) => {
				this.navMode = "side";
				this.opened = true;
				if (result.matches) {
					this.navMode = "over";
					this.opened = false;
				}
			});
	}
}
