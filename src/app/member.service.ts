import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Member } from "./member";
import { MatSort, SortDirection } from "@angular/material/sort";

@Injectable({
	providedIn: "root",
})
export class MemberService {
	private membersUrl = "http://localhost:8000/member";

	constructor(private http: HttpClient) {}

	getMembers(): Observable<Member[]> {
		return this.http.get<Member[]>(this.membersUrl);
	}

	getMember(id: number): Observable<Member> {
		return this.http.get<Member>(`${this.membersUrl}/${id}`);
	}
}
