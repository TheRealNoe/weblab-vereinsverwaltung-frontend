import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../DialogData";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private dialogRef: MatDialogRef<DialogComponent>
	) {}

	onConfirmClick(): void {
		this.dialogRef.close(true);
	}
}
