import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabase: SupabaseClient;
    private _session: AuthSession | null = null;
    private currentUser = new BehaviorSubject<User | null>(null);

    // Expose an observable for components to listen to user changes
    currentUser$ = this.currentUser.asObservable();
    isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

        // Only access local storage/session storage on the browser to avoid SSR errors
        if (this.isBrowser) {
            this.supabase.auth.getSession().then(({ data }) => {
                this._session = data.session;
                this.currentUser.next(this._session?.user ?? null);
            });

            this.supabase.auth.onAuthStateChange(
                (_event: AuthChangeEvent, session: Session | null) => {
                    this._session = session;
                    this.currentUser.next(session?.user ?? null);
                }
            );
        }
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session;
        });
        return this._session;
    }

    signIn(email: string) {
        return this.supabase.auth.signInWithOtp({ email, options: { data: {} } });
    }

    signInWithPassword(email: string, password: string) {
        return this.supabase.auth.signInWithPassword({ email, password });
    }

    signOut() {
        return this.supabase.auth.signOut();
    }

    // --- Database helpers ---

    async getImportantAnnouncements() {
        return this.supabase
            .from('announcements')
            .select('*')
            .eq('is_important', true)
            .order('created_at', { ascending: false })
            .limit(3);
    }

    async getAnnouncements() {
        return this.supabase
            .from('announcements')
            .select('*')
            .order('created_at', { ascending: false });
    }

    async getCirculars() {
        return this.supabase
            .from('circulars')
            .select('*')
            .order('date', { ascending: false });
    }

    async getOfferings() {
        return this.supabase
            .from('offerings')
            .select('*')
            .order('created_at', { ascending: false });
    }

    async getEvents() {
        return this.supabase
            .from('events')
            .select('*')
            .order('event_date', { ascending: true });
    }

    // --- Admin Database helpers (CRUD) ---
    async createAnnouncement(data: any) {
        return this.supabase.from('announcements').insert(data);
    }
    async updateAnnouncement(id: string, data: any) {
        return this.supabase.from('announcements').update(data).eq('id', id);
    }
    async deleteAnnouncement(id: string) {
        return this.supabase.from('announcements').delete().eq('id', id);
    }

    async createCircular(data: any) {
        return this.supabase.from('circulars').insert(data);
    }
    async updateCircular(id: string, data: any) {
        return this.supabase.from('circulars').update(data).eq('id', id);
    }
    async deleteCircular(id: string) {
        return this.supabase.from('circulars').delete().eq('id', id);
    }

    async createOffering(data: any) {
        return this.supabase.from('offerings').insert(data);
    }
    async updateOffering(id: string, data: any) {
        return this.supabase.from('offerings').update(data).eq('id', id);
    }
    async deleteOffering(id: string) {
        return this.supabase.from('offerings').delete().eq('id', id);
    }

    async createEvent(data: any) {
        return this.supabase.from('events').insert(data);
    }
    async updateEvent(id: string, data: any) {
        return this.supabase.from('events').update(data).eq('id', id);
    }
    async deleteEvent(id: string) {
        return this.supabase.from('events').delete().eq('id', id);
    }
}
