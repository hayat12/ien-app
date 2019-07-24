import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authService.hasValidToken()) {
      this.navCtrl.navigateBack('/login');
      return false;
    }
    return true;
  }
}
