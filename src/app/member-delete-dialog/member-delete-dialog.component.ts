import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../DialogData";

@Component({
	selector: "app-member-delete-dialog",
	templateUrl: "./member-delete-dialog.component.html",
	styleUrls: ["./member-delete-dialog.component.scss"],
})
export class MemberDeleteDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private dialogRef: MatDialogRef<MemberDeleteDialogComponent>
	) {}

	onConfirmClick(): void {
		this.dialogRef.close(true);
	}
}
