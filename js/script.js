
const users = new DataStorage();

const add = () => {
  const newUser = {
    name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    old: Math.floor((Math.random() * 100) + 1)
  };
  users.insert(newUser);
}

const edit = () => {
  const randomUserId = Math.floor(Math.random() * users.select().length);
  if (typeof users.select()[randomUserId] !== 'undefined') {
    const newUserInfo = {
      name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      old: Math.floor((Math.random() * 100) + 1)
    };
    users.update(randomUserId, newUserInfo);
  }
}

const remove = () => {
  const randomUserId = Math.floor(Math.random() * users.select().length);
  if (typeof users.select()[randomUserId] !== 'undefined') users.delete(randomUserId);
}

const dq = (query) => document.querySelector(query);

const updateView = (users) => {
  let listHtml = '';
  if (users.length) users.forEach(user => listHtml += `<li>${JSON.stringify(user)}</li>`);
  dq('.data-list ul').innerHTML = listHtml;
}

users.subscribe('insert', (newUser, users) => {
  dq('.last-action').innerHTML = `Добавлен новый пользватель: <span>${JSON.stringify(newUser)}</span>`;
  updateView(users);
});

users.subscribe('update', (editedUser, users) => {
  dq('.last-action').innerHTML = ` Изменен пользватель: <span>${JSON.stringify(editedUser)}</span>`;
  updateView(users);
});

users.subscribe('delete', (deletedUser, users) => {
  dq('.last-action').innerHTML = `Удален пользватель: <span>${JSON.stringify(deletedUser)}</span>`;
  updateView(users);
});
