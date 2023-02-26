import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Resource } from "./Resource";

@Injectable({
	providedIn: "root",
})
export class ResourceService {
	private resourceUrl = "http://localhost:8000/resource";

	constructor(private http: HttpClient) {}

	getResources(): Observable<Resource[]> {
		return this.http.get<Resource[]>(this.resourceUrl);
	}

	getResource(id: number): Observable<Resource> {
		return this.http.get<Resource>(`${this.resourceUrl}/${id}`);
	}
}
