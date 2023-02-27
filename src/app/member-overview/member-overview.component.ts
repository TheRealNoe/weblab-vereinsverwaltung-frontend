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
		public dialog: MatDialog
	) {
		spinnerService.spinnerOn();
	}

	ngAfterViewInit() {
		this.memberService.getMembers().subscribe((data) => {
			for (const elm of data) {
				elm.birthday = new Date(elm.birthday).toLocaleDateString(
					"de-ch"
				);
			}
			this.dataSource = new MatTableDataSource(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.spinnerService.spinnerOff();
		});
	}

	showMember(row: Member) {
		this.router.navigate(["/member-information", row._id]);
	}

	openDeleteDialog(row: Member) {
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				title: "Mitglied löschen",
				content:
					"Sind Sie sich sicher, dass Sie das Mitglied löschen wollen?",
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.spinnerService.spinnerOn();
				this.memberService.deleteMember(row).subscribe((data) => {
					this.spinnerService.spinnerOff();
				});
			}
		});
	}
}
