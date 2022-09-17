import {ResultDTO} from './result.dto';

export class PeopleDTO {
  public count: number;
  public results: ResultDTO[];
  public next: string;
}
