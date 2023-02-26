import { AfterViewInit, Component } from "@angular/core";
import { Resource } from "../Resource";
import { ResourceService } from "../resource.service";
import { SpinnerService } from "../spinner.service";

@Component({
	selector: "app-resource-overview",
	templateUrl: "./resource-overview.component.html",
	styleUrls: ["./resource-overview.component.scss"],
})
export class ResourceOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["name", "amount", "location"];
	data: Resource[] = [];

	isLoadingResults = true;

	constructor(
		private memberService: ResourceService,
		private spinnerService: SpinnerService
	) {
		spinnerService.spinnerOn();
	}

	ngAfterViewInit() {
		this.memberService.getResources().subscribe((data) => {
			this.data = data;
			this.spinnerService.spinnerOff();
		});
	}
}
