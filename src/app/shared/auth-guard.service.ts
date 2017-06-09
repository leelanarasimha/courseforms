import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
/**
 * Created by leelanarasimha on 28/05/17.
 */
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authservice: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean>
        | Promise<boolean>
        | boolean {
        return this.authservice.isAuthenticated();
    }

}