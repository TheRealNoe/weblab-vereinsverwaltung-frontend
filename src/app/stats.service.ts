import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Statistic } from "./Statistic";

@Injectable({
	providedIn: "root",
})
export class StatsService {
	private statsAmountUrl = "http://localhost:8000/api/v1/statsAmounts";

	constructor(private http: HttpClient) {}

	getAmounts(): Observable<Statistic> {
		return this.http.get<Statistic>(this.statsAmountUrl);
	}
}
