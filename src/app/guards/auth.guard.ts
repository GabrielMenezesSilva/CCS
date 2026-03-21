import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private supabase: SupabaseService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    async canActivate(): Promise<boolean | UrlTree> {
        if (!isPlatformBrowser(this.platformId)) {
            // on SSR, we'll try to let it pass or evaluate based on cookies if setup.
            // For simplicity without cookie-based SSR auth, just allow or redirect to login.
            return true;
        }

        // Attempt to get the session dynamically
        const { data } = await this.supabase['supabase'].auth.getSession();
        const session = data.session;

        if (session) {
            return true;
        }
        // Redirect to login page
        return this.router.parseUrl('/login');
    }
}
