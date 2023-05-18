import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { History, User } from '../restaurant/dishes';
import { map } from 'rxjs/operators';
import { DishesService } from './dishes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn: boolean = false
  user?: User
  id: string = ''
  session: string = 'local'
  allUsers: User[] = []
  tutorialsRef?: AngularFireList<any>

  constructor(private afAuth: AngularFireAuth, private db: Database, private db2: AngularFireDatabase) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true
        if (user.email) {
          this.getUser(this.emailToId(user.email.toString()))
          this.id = this.emailToId(user.email.toString())
          this.getAllUsers()
        }
      }
      else {
        this.isLoggedIn = false
        this.user = undefined
        this.id = ''
        // this.allUsers = undefined
      }
    })
    const starCountRef = ref(db, 'session/');
    onValue(starCountRef, (snapshot) => {
      this.session = snapshot.val().session;
    });
  }

  login(login: string, password: string) {
    return this.afAuth.setPersistence(this.session).then(() => {
      return this.afAuth.signInWithEmailAndPassword(login, password)
        .then((result) => {
          // this.getUser(this.emailToId(login))
        })
    })
      .catch(error => {
        return { isValid: false, message: error.message }
      })
  }

  signup(login: string, password: string, userName: string) {
    return this.afAuth.setPersistence(this.session).then(() => {
      return this.afAuth.createUserWithEmailAndPassword(login, password)
        .then((result) => {
          this.createUser(userName, login)
        })
    })
      .catch(error => {
        return { isValid: false, message: error.message }
      })
  }

  logout() {
    this.afAuth.signOut()
  }

  getUser(id: string) {
    // const id = this.emailToId(email)
    const starCountRef = ref(this.db, 'uzytkownicy/' + id);
    onValue(starCountRef, (snapshot) => {
      const newUser: User = {
        ban: snapshot.val().ban,
        id: snapshot.val().id,
        name: snapshot.val().name,
        role: snapshot.val().role,
        history: snapshot.val().history
      }
      this.user = newUser
    });
  }

  changeSessionPersistance(type: string) {
    update(ref(this.db, 'session/'), {
      session: type
    });
  }

  createUser(login: string, email: string) {
    set(ref(this.db, 'uzytkownicy/' + this.emailToId(email)), {
      id: this.emailToId(email),
      name: login,
      role: 'user',
      history: [],
      ban: false
    });
  }

  banToggle(id: string, ban: boolean) {
    let current = this.user
    let currentId = this.id
    update(ref(this.db, '/uzytkownicy/' + id), {
      id: id,
      ban: !ban
    });
    this.user = current
    this.id = currentId
  }

  emailToId(email: string) {
    return email.replace(/[^a-zA-Z0-9]/g, "")
  }

  updateHistory(newHistory: History[]) {
    update(ref(this.db, 'uzytkownicy/' + this.id), {
      history: newHistory
    });
  }

  getAllUsers() {
    this.tutorialsRef = this.db2.list('/uzytkownicy')
    this.tutorialsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.allUsers = []
      data.forEach(element => {
        const user: User = {
          ban: element.ban,
          name: element.name,
          role: element.role,
          history: element.history,
          id: element.id
        }
        this.allUsers = [...this.allUsers, user]
      })
    });
  }

  changeRole(id: string, role: string) {
    let current = this.user
    let currentId = this.id
    update(ref(this.db, '/uzytkownicy/' + id), {
      id: id,
      role: role
    });
    this.user = current
    this.id = currentId
  }
}
