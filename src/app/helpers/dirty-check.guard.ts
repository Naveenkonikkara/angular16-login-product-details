import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
} from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

export interface DirtyComponent {
  isDirty$: Observable<boolean>;
}

@Injectable()
export class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {
  constructor(private modalService: NzModalService) {}
  canDeactivate(component: DirtyComponent) {
    return component.isDirty$.pipe(
      switchMap((dirty) => {
        if (dirty === false) {
          return of(true);
        }

        let navigate: boolean;
        return this.modalService
          .confirm({
            nzTitle: 'Confirm',
            nzContent:
              'You have unsaved changes. Are you sure you want to leave?',
            nzOkText: 'Stay',
            nzCancelText: 'Leave',
            nzOnOk() {
              navigate = false;
            },
            nzOnCancel() {
              navigate = true;
            },
          })
          .afterClose.pipe(
            map((data) => {
              return navigate;
            })
          );
      }),
      take(1)
    );
  }
}
