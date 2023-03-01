import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Resource } from "./Resource";

@Injectable({
	providedIn: "root",
})
export class ResourceService {
	private resourceUrl = "http://localhost:8000/api/v1/resource";

	constructor(private http: HttpClient) {}

	getResources(): Observable<Resource[]> {
		return this.http.get<Resource[]>(this.resourceUrl);
	}

	getResource(id: number): Observable<Resource> {
		return this.http.get<Resource>(`${this.resourceUrl}/${id}`);
	}

	postResource(resource: Resource): Observable<Resource> {
		return this.http.post<Resource>(this.resourceUrl, resource);
	}

	putResource(resource: Resource): Observable<Resource> {
		let resourceID = resource._id;
		delete resource._id;
		return this.http.put<Resource>(
			`${this.resourceUrl}/${resourceID}`,
			resource
		);
	}

	deleteResource(resource: Resource): Observable<Resource> {
		return this.http.delete<Resource>(
			`${this.resourceUrl}/${resource._id}`
		);
	}
}
