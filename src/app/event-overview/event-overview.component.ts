import { AfterViewInit, Component } from "@angular/core";
import { Event } from "../event";
import { EventService } from "../event.service";
import { SpinnerService } from "../spinner.service";

@Component({
	selector: "app-event-overview",
	templateUrl: "./event-overview.component.html",
	styleUrls: ["./event-overview.component.scss"],
})
export class EventOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["name", "location", "time"];
	data: Event[] = [];

	isLoadingResults = true;

	constructor(
		private memberService: EventService,
		private spinnerService: SpinnerService
	) {
		spinnerService.spinnerOn();
	}

	ngAfterViewInit() {
		this.memberService.getEvents().subscribe((data) => {
			this.data = data;
			this.spinnerService.spinnerOff();
		});
	}
}
