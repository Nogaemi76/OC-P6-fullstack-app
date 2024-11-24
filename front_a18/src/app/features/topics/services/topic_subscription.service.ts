import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicSubscriptionService {

  private pathSubscription = 'api/subscriptions';

  constructor(private httpClient: HttpClient) { }

  subscribeTopic(id: Number): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.pathSubscription}`,{topicId:id});
  }

  getTopicSubscriptionsByUserId(id: Number): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathSubscription}/${id}`);
  }

  deleteSubscriptionByTopicId(topicId: Number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.pathSubscription}/${topicId}`);
  }

}
