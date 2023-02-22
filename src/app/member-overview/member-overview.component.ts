import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Member } from "../member";
import { MemberService } from "../member.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, SortDirection } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

@Component({
	selector: "app-member-overview",
	templateUrl: "./member-overview.component.html",
	styleUrls: ["./member-overview.component.scss"],
})
export class MemberOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["prename", "name", "birthday"];
	data: Member[] = [];

	isLoadingResults = true;

	constructor(private memberService: MemberService) {}

	ngAfterViewInit() {
		this.isLoadingResults = true;
		this.memberService.getMembers().subscribe((data) => (this.data = data));
	}
}
