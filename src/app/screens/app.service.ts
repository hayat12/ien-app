import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
    providedIn: 'root'
})

export class AppService {
    baseUrl = `${environment.baseUrl}`;

    /**
     * @see User
     */
    registerUrl = `${this.baseUrl}/api/users/register/`;
    loginwithGmailUrl = `${this.baseUrl}/gmail-account`;
    updateProfileUrl = `${this.baseUrl}/api/account/user`;
    ProfileUrl = `${this.baseUrl}`; // api/ien/user-email/profile
    /**
     * @see Company
     */
    crateCompanyUrl = `${this.baseUrl}/craete-company`;
    updateCompanyUrl = `${this.baseUrl}/update-company`;
    companyDetails = `${this.baseUrl}/company-details`;


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
    get_testImg() {
        return this.http.get(`${this.baseUrl}/api/test-img`);
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
        return this.http.post(`${this.baseUrl}/api-token-auth/`, data);
    }

    post_loginWithGmail(userDate) {
        return this.http.post(`${this.baseUrl}/api/account/login-gmail`, userDate);
    }
    /** @param data @see Register */
    querySignUp(data): Observable<object> {
        const httpParams = new HttpParams();
        const o = {
            username: data.username,
            email: data.username,
            password: data.password
        };
        console.log(o);
        return this.http.post(`${this.registerUrl}`, o, { params: httpParams, observe: 'response' });
    }

    /** @param token  @see get User details */
    getUserDetails(): Observable<object> {
        return this.http.get(`${this.baseUrl}/api/user-details`);
    }

    get_listUsers(): Observable<object> {
        return this.http.get(`${this.baseUrl}/api/account/users`);
    }

    get_currentUser(id): Observable<object> {
        console.log(id);
        return this.http.get(`${this.baseUrl}/api/account/user/${id}`);
    }

    /** @param data @see Update User details */
    queryUpdateProfile(data): Observable<object> {
        return this.http.put(this.updateProfileUrl, data);
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
        return this.http.get(`${this.ProfileUrl}/${userEmail}/profile`);
    }

    /**
     * @param userEmail
     * check reuse funtion
     */
    queryGetProfile1(userEmail): Observable<object> {
        return this.http.get(`${this.ProfileUrl}/profile?email=${userEmail}`);
    }

    /**
     * @see ****************************Company**********************
     */

    /**
     * @see User Register his/her company
     */

    registerCompany(data): Observable<object> {
        return this.http.post(this.crateCompanyUrl, data);
    }
    /**
     * once user register his/her comapny coresponding user can update his/her company
     */
    queryUpdateCompany(data): Observable<object> {
        return this.http.post(`${this.updateCompanyUrl}`, data);
    }
    /**
     * @param userEmail
     * @param company_id
     * coresponding user can get his/her company details by passing company id and user email
     */
    queryGetCompanyDetails(email: string): Observable<object> {
        return this.http.get(`${this.companyDetails}/${email}`);
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
        return this.http.get(`${this.ProfileUrl}/market-place?email=${email}&page=${page}`);
    }
    get_newsList(page: number, email: string): Observable<object> {
        return this.http.get(`${this.ProfileUrl}/market-place?email=${email}&page=${page}`);
    }
    /** @see *********************EVENTS********************** */

    /**
     * @param data
     * @see User can Create new Event
     */
    get_searchEvent(term) {
        return this.http.get(`${this.ProfileUrl}/api/search-event?term=${term}`);
    }
    get_globalEvent() {
        return this.http.get(`${this.ProfileUrl}/api/events-g`);
    }
    get_listEvent() {
        return this.http.get(`${this.ProfileUrl}/api/events`);
    }
    get_event(id) {
        return this.http.get(`${this.ProfileUrl}/api/event/${id}`);
    }
    delete_event(id) {
        return this.http.delete(`${this.ProfileUrl}/api/event/${id}`);
    }
    queryCreateEvent(data) {
        return this.http.post(`${this.ProfileUrl}/api/event`, data);
    }
    put_queryCreateEvent(data) {
        return this.http.put(`${this.ProfileUrl}/api/event`, data);
    }
    put_updateEvent(data, id) {
        return this.http.put(`${this.ProfileUrl}/api/event/${id}`, data);
    }
    queryListEvent(): Observable<object> {
        return this.http.get(`${this.ProfileUrl}/api/event`);
    }

    /**
     * @see eventDetails
     */
    queryEventDetails(id): Observable<object> {
        return this.http.get(`${this.ProfileUrl}/event-details/${id}`);
    }

    uploadImage(data, id) {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('picture', data);
        return this.http.post(`${this.ProfileUrl}/api/upload-image/${id}`, formData.toString());
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
        return this.http.get(`${this.baseUrl}/api/search?term=${term}`);
    }

    get_getTicket(id) {
        return this.http.get(`${this.baseUrl}/api/get-ticket/${id}`);
    }

    post_adgenda(data) {
        return this.http.post(`${this.baseUrl}/api/adgenda`, data);
    }

    put_adgenda(data, id) {
        return this.http.put(`${this.baseUrl}/api/adgenda/${id}`, data);
    }

    get_adgendaList() {
        return this.http.get(`${this.baseUrl}/api/adgenda`);
    }

    // temp API
    get_sortAdgendaList(prm) {
        const httpParams = new HttpParams().set('prm', prm + 1);
        return this.http.get(`${this.baseUrl}/api/sort-adgenda`,  { params: httpParams, observe: 'response' });
    }

    get_adgenda(id) {
        return this.http.get(`${this.baseUrl}/api/adgenda/${id}`);
    }
    delete_adgenda(id) {
        return this.http.delete(`${this.baseUrl}/api/adgenda/${id}`);
    }
    get_connections() {
        return this.http.get(`${this.baseUrl}/api/suggest-adj-invite`);
    }

    get_connection(id) {
        return this.http.get(`${this.baseUrl}/api/invite-connections/${id}`);
    }

    put_profile_image(image: FormData, user_id) {
        return this.http.put(`${this.baseUrl}/api/account/upload-profile/${user_id}`, image);
    }

    post_AddmarketPlace(data) {
        return this.http.post(`${this.baseUrl}/api/add-market-place`, data);
    }

    post_marketPlaceUploadPicture(image, id) {
        return this.http.post(`${this.baseUrl}/api/market-place-pictures/${id}`, image);
    }
    put_UpdateMarketPlace(data, id) {
        return this.http.put(`${this.baseUrl}/api/market-place/${id}`, data);
    }

    get_ListmarketPlace() {
        return this.http.get(`${this.baseUrl}/api/market-places-g`);
    }
    get_marketPlace(id) {
        return this.http.get(`${this.baseUrl}/api/market-place/${id}`);
    }

    get_search_marketPlace(term) {
        return this.http.get(`${this.baseUrl}/api/search-market-palce?term=${term}`);
    }
    post_connection(usersInvites) {
        return this.http.post(`${this.baseUrl}/api/invite-connections`, usersInvites);
    }
    get_records(id) {
       return this.http.get(`${this.baseUrl}/api/count-records`);
    }
}

