import jwtDecode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { UserInfoType } from "src/app/types";

export class UserService {
  private subject = new BehaviorSubject<UserInfoType | null>(null);

  get userSubject$() {
    return this.subject.asObservable();
  }

  get userInfo(){
    return this.subject.getValue();
  }

  login(token: string) {
    const { userInfo, exp } = jwtDecode<{ exp: number, userInfo: UserInfoType }>(token);
    const date = new Date(0);
    date.setSeconds(exp);
    userInfo.tokenExpiration = date;
    userInfo.token = token;
    this.subject.next(userInfo);
  }

  logout() {
    this.subject.next(null);
  }
}
