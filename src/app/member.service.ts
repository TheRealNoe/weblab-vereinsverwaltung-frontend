import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Member } from "./member";

@Injectable({
	providedIn: "root",
})
export class MemberService {
	private memberUrl = "http://localhost:8000/member";

	constructor(private http: HttpClient) {}

	getMembers(): Observable<Member[]> {
		return this.http.get<Member[]>(this.memberUrl);
	}

	getMember(id: number): Observable<Member> {
		return this.http.get<Member>(`${this.memberUrl}/${id}`);
	}
}
