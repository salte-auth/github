import { SalteAuth } from '@salte-auth/salte-auth';
import { Redirect } from '@salte-auth/redirect';
import { GitHub } from '../src/github';

const auth = new SalteAuth({
  providers: [
    new GitHub({
      clientID: 'b44780ca7678681180c9',
      responseType: 'code'
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

const button = document.createElement('button');
button.innerHTML = `Login`;
button.addEventListener('click', () => {
  auth.login({
    provider: 'github'
  });
});

document.body.appendChild(button);
