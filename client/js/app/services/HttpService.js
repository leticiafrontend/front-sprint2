class HttpService {
  get(url) {
    return fetch(url, { method: 'GET' })
      .then((resp) => resp.json())
      .catch((erro) => console.log(erro));
  }

  post(url, dado) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(dado),
    })
      .then((resp) => resp.json())
      .catch((erro) => console.log(erro));
  }
}
