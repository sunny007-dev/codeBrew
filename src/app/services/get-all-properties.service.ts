import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetAllPropertiesService {

  public url;

  constructor(public http: HttpClient) {
    this.url = environment.url;
  }

/**
 * Api to Get all Properties Data
 */
  getAllData () {
    return this.http.get(this.url + '/admin/allProperties');
  }
}
