import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { todoufuken } from '../model/todoufuken';
import { population } from '../model/population';


const endpoint = "https://opendata.resas-portal.go.jp";
const apiKey = "UXu74RgQTP6MYC4w9zhlstRayC213woIIUu1OIdJ";

const header = new HttpHeaders({
  "Content-Type": "application/json;charset=UTF-8",
  "X-API-KEY": apiKey
});

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  /**
   * 都道府県一覧JSONデータを手に入れる
   */
  public getTodoufukenJSON() {
    const url = `${endpoint}/api/v1/prefectures`;
    return this.http.get<todoufuken>(url, { headers: header });
  }

  /**
   * 都道府県コードから人工データを手に入れる
   */
  public getPopulationJSON(prefCode: number) {
    const url = `${endpoint}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`;
    return this.http.get<population>(url, { headers: header });
  }
}
