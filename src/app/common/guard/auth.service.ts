import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    const loggedin = localStorage.getItem("loggedIn");
    if (loggedin === "true") {
      return true;
    } else if (this._router.routerState.snapshot.url === "/login") {
      return false;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
