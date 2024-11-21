import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TopicSubscription } from '../interfaces/topic-subscription.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicSubscriptionService {

  private pathSubscription = 'api/subscriptions';

  constructor(private httpClient: HttpClient) { }

  subscribeTopic(id: Number): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.pathSubscription}`,{topicId:id});
  }

  getTopicSubscriptionsByUserId(id: Number): Observable<TopicSubscription[]> {
    return this.httpClient.get<TopicSubscription[]>(`${this.pathSubscription}/${id}`);
  }

}
