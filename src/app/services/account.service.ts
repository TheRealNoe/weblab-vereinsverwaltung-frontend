import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/User";
import { Credential } from "../interfaces/Credential";

@Injectable({
	providedIn: "root",
})
export class AccountService {
	private loginUrl = "http://localhost:8000/api/v1/login";
	private empytUser: User = {
		username: "",
		token: "",
	};

	constructor(private http: HttpClient) {}

	login(credential: Credential): Observable<User> {
		return this.http.post<User>(this.loginUrl, credential);
	}

	logout() {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	}

	getUser(): User {
		let user = this.empytUser;

		if (localStorage.getItem("user") && localStorage.getItem("token")) {
			user = {
				username: localStorage.getItem("user") || "",
				token: localStorage.getItem("token") || "",
			};
		}

		return user;
	}

	setUser(user: User) {
		localStorage.setItem("user", user.username);
		localStorage.setItem("token", user.token);
	}
}
