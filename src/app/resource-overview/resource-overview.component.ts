import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DialogComponent } from "../dialog/dialog.component";
import { NotificationService } from "../notification.service";
import { Resource } from "../Resource";
import { ResourceService } from "../resource.service";
import { SpinnerService } from "../spinner.service";

@Component({
	selector: "app-resource-overview",
	templateUrl: "./resource-overview.component.html",
	styleUrls: ["./resource-overview.component.scss"],
})
export class ResourceOverviewComponent implements AfterViewInit {
	displayedColumns: string[] = ["name", "amount", "location", "actions"];
	dataSource: MatTableDataSource<Resource> =
		new MatTableDataSource<Resource>();

	@ViewChild("paginator") paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private resourceService: ResourceService,
		private spinnerService: SpinnerService,
		private router: Router,
		public dialog: MatDialog,
		private notificationService: NotificationService
	) {
		spinnerService.spinnerOn();
	}

	async ngAfterViewInit() {
		await this.getResources();
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.spinnerService.spinnerOff();
	}

	async getResources() {
		this.resourceService.getResources().subscribe(
			(response) => {
				this.dataSource = new MatTableDataSource(response);
			},
			(error) => {
				this.notificationService.error(
					"Beim Auflisten der Ressourcen ist ein Fehler aufgetreten."
				);
			}
		);
	}

	showResource(row: Resource) {
		this.router.navigate(["/resource-modify", row._id]);
	}

	openDeleteDialog(row: Resource) {
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				title: "Ressource löschen",
				content:
					"Sind Sie sich sicher, dass Sie die Ressource löschen wollen?",
			},
		});

		dialogRef.afterClosed().subscribe(
			(response) => {
				if (response) {
					this.spinnerService.spinnerOn();
					this.resourceService
						.deleteResource(row)
						.subscribe(async (data) => {
							await this.getResources();
							this.spinnerService.spinnerOff();
							this.notificationService.success(
								"Die Ressource wurde erfolgreich gelöscht."
							);
						});
				}
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Löschen der Ressource ist ein Fehler aufgetreten."
				);
			}
		);
	}
}
