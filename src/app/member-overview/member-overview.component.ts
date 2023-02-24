import { Component, AfterViewInit } from "@angular/core";
import { Member } from "../member";
import { MemberService } from "../member.service";
import { SpinnerService } from "../spinner.service";

@Component({
	selector: "app-member-overview",
	templateUrl: "./member-overview.component.html",
	styleUrls: ["./member-overview.component.scss"],
})
export class MemberOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["prename", "name", "birthday"];
	data: Member[] = [];

	constructor(
		private memberService: MemberService,
		private spinnerService: SpinnerService
	) {
		spinnerService.spinnerOn();
	}

	ngAfterViewInit() {
		this.memberService.getMembers().subscribe((data) => {
			this.data = data;
			this.spinnerService.spinnerOff();
		});
	}
}
