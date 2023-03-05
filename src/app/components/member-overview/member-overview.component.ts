import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MemberService } from "../../services/member.service";
import { SpinnerService } from "../../services/spinner.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { Member } from "../../interfaces/Member";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { NotificationService } from "../../services/notification.service";
import * as moment from "moment";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
	selector: "app-member-overview",
	templateUrl: "./member-overview.component.html",
	styleUrls: ["./member-overview.component.scss"],
})
export class MemberOverviewComponent implements OnInit {
	displayedColumns: string[] = [
		"prename",
		"name",
		"birthday",
		"city",
		"actions",
	];
	dataSource: MatTableDataSource<Member> = new MatTableDataSource<Member>();

	@ViewChild("paginator") paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private memberService: MemberService,
		private spinnerService: SpinnerService,
		private router: Router,
		public dialog: MatDialog,
		private notificationService: NotificationService,
		private breakpointObserver: BreakpointObserver
	) {
		spinnerService.spinnerOn();
	}

	ngOnInit() {
		this.getMembers();
		this.breakpointObserver
			.observe("(min-width: 1000px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(min-width: 1000px)")) {
					this.displayedColumns = [
						"prename",
						"name",
						"birthday",
						"city",
						"actions",
					];
				}
			});
		this.breakpointObserver
			.observe("(max-width: 1000px) and (min-width: 800px)")
			.subscribe((result) => {
				if (
					this.breakpointObserver.isMatched(
						"(max-width: 1000px) and (min-width: 800px)"
					)
				) {
					this.displayedColumns = [
						"prename",
						"name",
						"birthday",
						"actions",
					];
				}
			});
		this.breakpointObserver
			.observe("(max-width: 800px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(max-width: 800px)")) {
					this.displayedColumns = ["prename", "name", "actions"];
				}
			});
	}

	getMembers() {
		this.memberService.getMembers().subscribe(
			(response) => {
				for (const elm of response) {
					elm.birthday = moment(elm.birthday).format("DD.MM.YYYY");
				}
				this.dataSource = new MatTableDataSource(response);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.spinnerService.spinnerOff();
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Auflisten der Mitglieder ist ein Fehler aufgetreten."
				);
			}
		);
	}

	showMember(row: Member) {
		this.router.navigate(["/member-modify", row._id]);
	}

	openDeleteDialog(row: Member) {
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				title: "Mitglied löschen",
				content:
					"Sind Sie sich sicher, dass Sie das Mitglied löschen wollen?",
			},
		});

		dialogRef.afterClosed().subscribe(
			(response) => {
				if (response) {
					this.spinnerService.spinnerOn();
					this.memberService
						.deleteMember(row)
						.subscribe(async (data) => {
							this.getMembers();
							this.notificationService.success(
								"Das Mitglied wurde erfolgreich gelöscht."
							);
						});
				}
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Löschen des Mitglieds ist ein Fehler aufgetreten."
				);
			}
		);
	}
}
