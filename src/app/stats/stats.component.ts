import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import { StatsService } from "../stats.service";
import { ChartComponent } from "ng-apexcharts";
import {
	ApexNonAxisChartSeries,
	ApexResponsive,
	ApexChart,
} from "ng-apexcharts";
import { Statistic } from "../Statistic";
import { MatTableDataSource } from "@angular/material/table";

export type ChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	responsive: ApexResponsive[];
	labels: any;
};

export interface TableData {
	name: string;
	value: number;
}

@Component({
	selector: "app-stats",
	templateUrl: "./stats.component.html",
	styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
	displayedColumns: string[] = ["name", "value"];
	dataSource: MatTableDataSource<TableData> =
		new MatTableDataSource<TableData>();

	@ViewChild("chart") chart: ChartComponent | any;
	public chartOptions: Partial<ChartOptions> | any;

	constructor(
		private statsService: StatsService,
		private notificationService: NotificationService,
		private spinnerService: SpinnerService
	) {
		this.spinnerService.spinnerOn();
		this.chartOptions = {
			series: [],
			chart: {
				width: 600,
				type: "pie",
			},
			labels: [],
			responsive: [
				{
					breakpoint: 1350,
					options: {
						chart: {
							width: 500,
						},
						legend: {
							position: "bottom",
						},
					},
				},
				{
					breakpoint: 1100,
					options: {
						chart: {
							width: "100%",
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		};
	}

	ngOnInit() {
		this.statsService.getAmounts().subscribe(
			(response) => {
				this.chartOptions.series = [
					response.amountMembers,
					response.amountEvents,
					response.amountResources,
				];
				this.chartOptions.labels = [
					"Mitglieder",
					"Events",
					"Ressourcen-Positionen",
				];

				let tableData: TableData[] = [
					{
						name: "Mitglieder",
						value: response.amountMembers,
					},
					{
						name: "Events",
						value: response.amountEvents,
					},
					{
						name: "Ressourcen-Positionen",
						value: response.amountResources,
					},
				];

				this.dataSource = new MatTableDataSource(tableData);

				this.spinnerService.spinnerOff();
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Laden der Statistik ist ein Fehler aufgetreten."
				);
			}
		);
	}
}
