import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SwapiService} from '../shared/services/swapi.service';
import {ResultDTO} from './dtos/result.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'Star Wars Character Search';

  public form: FormGroup;
  public results: ResultDTO[];

  constructor(public swapiService: SwapiService) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.loadSwagies();
  }

  loadSwagies(): void {
    this.swapiService.initPeoples();
  }

  loadMore(): void {
    this.swapiService.loadMore();
    this.resetSortControl();
  }

  search(): void {
    this.swapiService.getSearchedPeoples(this.form.get('searchTerm').value);
    this.resetSortControl();
  }

  buildFormGroup() {
    this.form = new FormGroup({
      searchTerm: new FormControl(''),
      sortBy: new FormControl(null)
    });
  }

  private resetSortControl(): void {
    this.form.get('sortBy').reset();
  }

  onChange(value: any): void {
    switch (value) {
      case 'asc':
        this.swapiService.filterByAsc();
        break;
      case 'desc':
        this.swapiService.filterByDesc();
        break;
      case 'male':
        this.swapiService.filterByGender('male');
        break;
      case 'female':
        this.swapiService.filterByGender('female');
        break;
      default:
        this.swapiService.filterByAsc();
        break;
    }
  }
}
