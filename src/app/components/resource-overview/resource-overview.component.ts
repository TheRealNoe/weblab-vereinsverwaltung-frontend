import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DialogComponent } from "../dialog/dialog.component";
import { NotificationService } from "../../services/notification.service";
import { Resource } from "../../interfaces/Resource";
import { ResourceService } from "../../services/resource.service";
import { SpinnerService } from "../../services/spinner.service";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
	selector: "app-resource-overview",
	templateUrl: "./resource-overview.component.html",
	styleUrls: ["./resource-overview.component.scss"],
})
export class ResourceOverviewComponent implements OnInit {
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
		private notificationService: NotificationService,
		private breakpointObserver: BreakpointObserver
	) {
		spinnerService.spinnerOn();
	}

	ngOnInit() {
		this.getResources();
		this.breakpointObserver
			.observe("(min-width: 800px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(min-width: 800px)")) {
					this.displayedColumns = [
						"name",
						"amount",
						"location",
						"actions",
					];
				}
			});
		this.breakpointObserver
			.observe("(max-width: 800px) and (min-width: 450px)")
			.subscribe((result) => {
				if (
					this.breakpointObserver.isMatched(
						"(max-width: 800px) and (min-width: 450px)"
					)
				) {
					this.displayedColumns = ["name", "amount", "actions"];
				}
			});

		this.breakpointObserver
			.observe("(max-width: 450px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(max-width: 450px)")) {
					this.displayedColumns = ["name", "actions"];
				}
			});
	}

	getResources() {
		this.resourceService.getResources().subscribe(
			(response) => {
				this.dataSource = new MatTableDataSource(response);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.spinnerService.spinnerOff();
			},
			(error) => {
				this.spinnerService.spinnerOff();
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
							this.getResources();
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
