import { Directive, inject } from "@angular/core";
import { LogService } from "../log.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Directive()
export abstract class TypeMatcher {
    paramMap$ = inject(ActivatedRoute).paramMap.pipe(map(x => x.get('value')))
    logger = inject(LogService);
    ngOnInit() {
      this.logger.log('Dynamic Url Matcher Init');
    }
  
    ngOnDestroy() {
      this.logger.log('Dynamic Url Matcher Destroy');
    }
}