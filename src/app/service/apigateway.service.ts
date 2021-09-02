import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  QUERY_PRODUCTS,
  QUERY_STORES,
  QUERY_PRODUCTBYSTORE,
} from '../querys/querys';
import { map, tap } from 'rxjs/operators';
import {
  MUTATION_AUTHENTICATION,
  MUTATION_VERIFY,
  QUERY_ACCOUNT,
} from '../querys/querys';
import { BehaviorSubject } from 'rxjs';
import { MUTATION_NEWORDER } from '../querys/querys';

@Injectable({
  providedIn: 'root',
})
export class ApigatewayService {
  currentUser;
  login = new BehaviorSubject({});
  products = [];

  constructor(private apollo: Apollo) {}

  getProducts(): void {
    this.apollo
      .watchQuery<any>({
        query: QUERY_PRODUCTS,
      })
      .valueChanges.pipe(map((e) => e.data.products))
      .subscribe(console.log);
  }

  getStores() {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_STORES,
      })
      .valueChanges.pipe(map((e) => e.data.stores));
  }

  getProductsByStore(id) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_PRODUCTBYSTORE,
        variables: {
          productsByStoreIdStoreId: id,
        },
      })
      .valueChanges.pipe(
        map((e) => e.data.productsByStoreId),
        tap(console.log)
      );
  }

  getAccountInfo(id) {
    id = `00${id}`;
    return this.apollo
      .watchQuery<any>({
        query: QUERY_ACCOUNT,
        variables: {
          accountByUserIdUserId: id,
        },
      })
      .valueChanges.pipe(map((e) => e.data.accountByUserId));
  }

  authentication({ username, password }) {
    console.log(username);
    console.log(password);

    return this.apollo
      .mutate({
        mutation: MUTATION_AUTHENTICATION,
        variables: {
          authenticateCredentials: {
            username,
            password,
          },
        },
      })
      .pipe(map((e: any) => e.data.authenticate));
  }

  verify(token) {
    console.log({ token });
    return this.apollo
      .mutate({
        mutation: MUTATION_VERIFY,
        variables: {
          verifyTokenToken: token,
        },
      })
      .pipe(map((e: any) => e.data.verifyToken));
  }

  newOrder(order) {
    return this.apollo
      .mutate({
        mutation: MUTATION_NEWORDER,
        variables: {
          createOrderOrder: order,
        },
      })
      .pipe(map((e: any) => e));
  }
}
