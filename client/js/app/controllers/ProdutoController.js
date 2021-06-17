class ProdutoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._listaProdutos = new Bind(
      new ListaProdutos(),
      new ProdutosView($('#products')),
      'adiciona',
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto',
    );

    this.carregaProdutos();
  }

  carregaProdutos() {
    let service = new ProdutoService();
    service
      .obterProdutos()
      .then((produtos) => {
        produtos.forEach((produto) => {
          this._listaProdutos.adiciona(
            this._adicionaProduto(
              produto.imagem,
              produto.descricao,
              produto.valor,
            ),
          );
        });
      })
      .catch((erro) => (this._mensagem.texto = erro));
  }

  _adicionaProduto(imagem, descricao, valor) {
    return new Produto(imagem, descricao, valor);
  }

  busca(event) {
    let input = event.target.value;
    const lista = this._listaProdutos;
    let $ = document.querySelector.bind(document);

    this._listaProdutos = new Bind(
      new ListaProdutos(),
      new ProdutosView($('#products')),
      'adiciona',
    );

    if (input === '') return this.carregaProdutos();

    this._filtroLista(lista, input);
  }

  _upperCase(texto) {
    return texto.toUpperCase();
  }

  _include(descricao, texto) {
    return this._upperCase(descricao).includes(this._upperCase(texto));
  }

  _filtroLista(lista, input) {
    lista.produtos.forEach((produto) => {
      this._include(produto.descricao, input) &&
        this._listaProdutos.adiciona(produto);
    });
  }
}
