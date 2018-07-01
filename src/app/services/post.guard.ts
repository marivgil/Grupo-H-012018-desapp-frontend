import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PostsService } from './posts.service';

@Injectable()
export class PostGuard implements CanActivate {

  constructor(private _postService: PostsService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._postService.postCar) {
      return true;
    } else {
      console.log("Bloqueado por el guard");
      this.router.navigate(['/tusAutos']);
    }
  }
}
