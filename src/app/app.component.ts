import { Component, Input } from "@angular/core";
import { SpinnerService } from "./spinner.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "frontend";
	showFiller = false;
	SpinnerSpinning = false;

	constructor(private spinnerService: SpinnerService) {
		spinnerService.spinning.subscribe((val) => {
			this.SpinnerSpinning = val;
		});
	}
}
