import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResultDTO} from '../../app/dtos/result.dto';
import {PeopleDTO} from '../../app/dtos/people.dto';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private count: number;
  private next: string;
  private allResults: ResultDTO[];
  private actualResults: ResultDTO[];

  constructor(private http: HttpClient) {
  }

  getCount(): number {
    return this.count;
  }

  getActualResults(): ResultDTO[] {
    return this.actualResults;
  }

  getSearchedPeoples(searchTerm: string): void {
    this.http.get<any>('https://swapi.dev/api/people/', {
      params: {
        search: searchTerm
      }
    }).subscribe(sw => {
      this.setBaseData(sw);
      this.setResults(sw.results, sw.results);
    });
  }

  initPeoples(): void {
    this.fetchPeoples('https://swapi.dev/api/people').subscribe(sw => {
      this.setBaseData(sw);
      this.setResults(sw.results, sw.results);
    });
  }

  loadMore(): void {
    if (this.next) {
      this.fetchPeoples(this.next).subscribe(sw => {
        this.setBaseData(sw);
        this.appendResults(sw.results);
      });
    }
  }

  filterByAsc(): void {
    this.setActualResults(this.getResults().sort((a, b) => a.name.localeCompare(b.name)));
  }

  filterByDesc(): void {
    this.setActualResults(this.getResults().sort((a, b) => b.name.localeCompare(a.name)));

  }

  filterByGender(gender: string): void {
    this.setActualResults(this.getResults().filter(result => {
      return result.gender === gender;
    }));
  }

  private fetchPeoples(url: string): Observable<PeopleDTO> {
    return this.http.get<PeopleDTO>(url);
  }

  private setBaseData(swagies: any): void {
    this.count = swagies.count;
    this.next = swagies.next;
  }

  private appendResults(results: any) {
    let appendResults = [...this.allResults];
    appendResults = [...appendResults, ...results];
    this.setResults(appendResults, appendResults);

  }

  private setActualResults(results: ResultDTO[]): void {
    this.actualResults = results;
  }

  private setAllResults(results: ResultDTO[]): void {
    this.allResults = results;
  }

  private setResults(allResults: ResultDTO[], actualResults: ResultDTO[]) {
    this.setAllResults(allResults);
    this.setActualResults(actualResults);
  }

  private getResults(): any {
    return this.allResults;
  }
}
