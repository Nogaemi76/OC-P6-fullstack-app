import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

constructor(private httpClient : HttpClient) { }

  private pathTopics = 'api/topics';

  getAllTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.pathTopics);
  }
}
