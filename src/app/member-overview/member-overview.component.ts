import { Component, AfterViewInit } from "@angular/core";
import { MemberService } from "../member.service";
import { SpinnerService } from "../spinner.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MemberDeleteDialogComponent } from "../member-delete-dialog/member-delete-dialog.component";
import { Member } from "../Member";

@Component({
	selector: "app-member-overview",
	templateUrl: "./member-overview.component.html",
	styleUrls: ["./member-overview.component.scss"],
})
export class MemberOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["prename", "name", "birthday", "actions"];
	data: Member[] = [];

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
			this.data = data;
			this.spinnerService.spinnerOff();
		});
	}

	showMember(row: Member) {
		this.router.navigate(["/member-information", row._id]);
	}

	openDeleteDialog(row: Member) {
		const dialogRef = this.dialog.open(MemberDeleteDialogComponent, {
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
