import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false; 
      }
    })
  );
};
