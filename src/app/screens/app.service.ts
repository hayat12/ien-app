import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})

export class AppService {
    baseUrl = `${environment.baseUrl}`;

    private headers: HttpHeaders;
    constructor(private http: HttpClient) {
        // this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }

    /**
     * @see ****************************USER**********************
     */

    // logOut(): boolean {
    //     const token = localStorage.getItem('ien_token');
    //     localStorage.removeItem('ien_token');
    //     return true;
    // }
    get_testImg(fileData) {
        const uploadData = new FormData();
        uploadData.append('myFile', fileData, fileData.name)
        return this.http.post(`${this.baseUrl}/upload-event-picture`, uploadData);
    }
    /** @see Token */
    // getUserToken() {
    //     return new Promise((resolve, reject) => {
    //         (resolve => {
    //             return localStorage.getItem('ien_token');
    //         })
    //     })
    // }

    /** @param data @see Login */
    queryLogin(data): Observable<object> {
        const dt = { 'email': data.username, 'password': data.password }
        return this.http.post(`${this.baseUrl}/login`, dt);
    }

    loginWithGmail(data){ // with gmail
        return this.http.post(`${this.baseUrl}/login-gmail`, data);
    }
    post_loginWithGmail(userDate) {
        return this.http.post(`${this.baseUrl}/api/account/login-gmail`, userDate);
    }
    /** @param data @see Register */
    querySignUp(data): Observable<object> {
        const httpParams = new HttpParams();
        const o = {
            name: data.email,
            email: data.email,
            password: data.password,
            password_confirmation: data.password
        };
        console.log(o);
        return this.http.post(`${this.baseUrl}/register`, o, { params: httpParams, observe: 'response' });
    }

    /** @param token  @see get User details */
    getUserDetails(): Observable<object> {
        return this.http.get(`${this.baseUrl}/user`);
    }

    get_listUsers(): Observable<object> {
        return this.http.get(`${this.baseUrl}/users`);
    }

    get_currentUser(id): Observable<object> {
        console.log(id);
        return this.http.get(`${this.baseUrl}/api/account/user/${id}`);
    }

    /** @param data @see Update User details */
    queryUpdateProfile(data): Observable<object> {
        return this.http.put(`${this.baseUrl}/update-profile`, data);
    }
    /** @param userEmail @see Upload UserProfile Image */

    //  upload(data): Observable<object> {
    //     return this.http.post(`${this.ProfileUrl}/event-upload-image`, data);
    // }

    /**
     * @param userEmail
     * @see User can get his/her details
     * check reuse function
     */
    queryGetProfile(userEmail): Observable<object> {
        return this.http.get(`${this.baseUrl}/${userEmail}/profile`);
    }

    /**
     * @param userEmail
     * check reuse funtion
     */
    queryGetProfile1(userEmail): Observable<object> {
        return this.http.get(`${this.baseUrl}/profile?email=${userEmail}`);
    }

    /**
     * @see ****************************Company**********************
     */

    /**
     * @see User Register his/her company
     */

    registerCompany(data): Observable<object> {
        return this.http.post(this.baseUrl, data);
    }
    /**
     * once user register his/her comapny coresponding user can update his/her company
     */
    queryUpdateCompany(data): Observable<object> {
        return this.http.post(`${this.baseUrl}`, data);
    }
    /**
     * @param userEmail
     * @param company_id
     * coresponding user can get his/her company details by passing company id and user email
     */
    queryGetCompanyDetails(email: string): Observable<object> {
        return this.http.get(`${this.baseUrl}/${email}`);
    }

    /** @see *********************HOME_SCREEN_LISING********************** */
 
    /**
     * @param page
     * @param email
     */
    // queryUpComingEvent(page: number, email: string): Observable<object> {
    //     return this.http.get(`${this.ProfileUrl}/up-coming-event?email=${email}&page=${page}`)
    // }
    queryMarketPlace(page: number, email: string): Observable<object> {
        return this.http.get(`${this.baseUrl}/market-place?email=${email}&page=${page}`);
    }
    get_newsList(page: number, email: string): Observable<object> {
        return this.http.get(`${this.baseUrl}/market-place?email=${email}&page=${page}`);
    }
    /** @see *********************EVENTS********************** */

    /**
     * @param data
     * @see User can Create new Event
     */
    get_searchEvent(term, isEditable) {
        if (isEditable) {
            return this.http.get(`${this.baseUrl}/search-event?term=${term}`);
        } else {
            return this.http.get(`${this.baseUrl}/search-event-g?term=${term}`);
        }
    }
    get_globalEvent() {
        return this.http.get(`${this.baseUrl}/events-g`);
    }
    get_listEvent() {
        return this.http.get(`${this.baseUrl}/events`);
    }
    get_event(id) {
        return this.http.get(`${this.baseUrl}/event/${id}`);
    }
    delete_event(id) {
        return this.http.delete(`${this.baseUrl}/event/${id}`);
    }
    queryCreateEvent(data) {
        return this.http.post(`${this.baseUrl}/event`, data);
    }
    put_queryCreateEvent(data) {
        return this.http.put(`${this.baseUrl}/event`, data);
    }
    put_updateEvent(data, id) {
        return this.http.put(`${this.baseUrl}/event/${id}`, data);
    }
    queryListEvent(): Observable<object> {
        return this.http.get(`${this.baseUrl}/event`);
    }

    /**
     * @see eventDetails
     */
    queryEventDetails(id): Observable<object> {
        return this.http.get(`${this.baseUrl}/event-details/${id}`);
    }

    uploadImage(data, id) {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('picture', data);
        return this.http.post(`${this.baseUrl}/api/upload-image/${id}`, formData.toString());
    }

   queryUploadImage(img): Observable<object> {
        const formData: FormData = new FormData();
        formData.append('picture', img);
        return this.http.post(`${this.baseUrl}/api/upload-image`, formData);
    }


    /**
     * Search
     */
    querySearch(term): Observable<object> {
        return this.http.get(`${this.baseUrl}/search?term=${term}`);
    }

    get_getTicket(id) {
        return this.http.get(`${this.baseUrl}/join-events/${id}`);
    }
    get_listAttending(){
        return this.http.get(`${this.baseUrl}/list-attending`);
    }
    post_adgenda(data) {
        return this.http.post(`${this.baseUrl}/agenda`, data);
    }

    put_adgenda(data, id) {
        return this.http.put(`${this.baseUrl}/agenda/${id}`, data);
    }

    get_adgendaList() {
        return this.http.get(`${this.baseUrl}/agendas`);
    }

    // temp API
    get_sortAdgendaList(prm) {
        const httpParams = new HttpParams().set('prm', prm + 1);
        return this.http.get(`${this.baseUrl}/filter-agenda`,  { params: httpParams, observe: 'response' });
    }

    get_adgenda(id) {
        return this.http.get(`${this.baseUrl}/agenda/${id}`);
    }
    delete_adgenda(id) {
        return this.http.delete(`${this.baseUrl}/agenda/${id}`);
    }
    get_connections() {
        return this.http.get(`${this.baseUrl}/users`);
    }
    joinAgenda(id){
        return this.http.get(`${this.baseUrl}/join-agenda/${id}`);
    }
    get_joinedAgenda(id) {
        return this.http.get(`${this.baseUrl}/list-joined/${id}`);
    }

    put_profile_image(image: FormData, user_id) {
        return this.http.put(`${this.baseUrl}/account/upload-profile/${user_id}`, image);
    }

    post_AddmarketPlace(data) {
        return this.http.post(`${this.baseUrl}/market-place`, data);
    }

    post_marketPlaceUploadPicture(image, id) {
        return this.http.post(`${this.baseUrl}/market-place-pictures/${id}`, image);
    }
    put_UpdateMarketPlace(data, id) {
        return this.http.put(`${this.baseUrl}/market-place/${id}`, data);
    }

    get_ListmarketPlace(isEditable) {
        if (isEditable) {
            return this.http.get(`${this.baseUrl}/market-places`);
        } else {
            return this.http.get(`${this.baseUrl}/market-places-g`);
        }
    }

    get_AttendingEvent(id) {
        return this.http.get(`${this.baseUrl}/attend-to-event/${id}`);
    }

    get_marketPlace(id) {
        return this.http.get(`${this.baseUrl}/market-place/${id}`);
    }
    delete_marketPlace(id){
        return this.http.delete(`${this.baseUrl}/market-place/${id}`);
    }
    get_search_marketPlace(term, isEditable) {
        if (isEditable) {
            return this.http.get(`${this.baseUrl}/search-market-place?term=${term}`);
        } else {
            return this.http.get(`${this.baseUrl}/search-market-place-g?term=${term}`);
        }
        
    }
    post_connection(usersInvites) {
        return this.http.post(`${this.baseUrl}/invite-connections`, usersInvites);
    }
    get_records(id) {
       return this.http.get(`${this.baseUrl}/count-records`);
    }
}

