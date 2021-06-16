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
}
