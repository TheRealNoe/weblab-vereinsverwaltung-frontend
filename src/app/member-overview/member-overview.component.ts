import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MemberService } from "../member.service";
import { SpinnerService } from "../spinner.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { Member } from "../Member";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { NotificationService } from "../notification.service";
import * as moment from "moment";

@Component({
	selector: "app-member-overview",
	templateUrl: "./member-overview.component.html",
	styleUrls: ["./member-overview.component.scss"],
})
export class MemberOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["prename", "name", "birthday", "actions"];
	dataSource: MatTableDataSource<Member> = new MatTableDataSource<Member>();

	@ViewChild("paginator") paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private memberService: MemberService,
		private spinnerService: SpinnerService,
		private router: Router,
		public dialog: MatDialog,
		private notificationService: NotificationService
	) {
		spinnerService.spinnerOn();
	}

	async ngAfterViewInit() {
		await this.getMembers();
		this.spinnerService.spinnerOff();
	}

	async getMembers() {
		this.memberService.getMembers().subscribe(
			(response) => {
				for (const elm of response) {
					elm.birthday = moment(elm.birthday).format("DD.MM.YYYY");
				}
				this.dataSource = new MatTableDataSource(response);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(error) => {
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
							await this.getMembers();
							this.spinnerService.spinnerOff();
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
