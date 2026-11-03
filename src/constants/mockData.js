// Dados de exemplo — depois virão da API
export const MOCK_COMPANY = {
    nome: "Mercadinho Exemplo",
    cnpj: "12.345.678/0001-90",
    logradouro: "Rua das Flores",
    numero: "100",
    bairro: "Centro",
    cidade: "Niterói",
    estado: "Rio de Janeiro",
    cep: "24020-005",
    responsavel: "Julio",
};

export const MOCK_PRODUCTS = [
    { id: 1, nome: "Biscoito Recheado", codigo: "7891000100103", categoria: "Alimentos",
      quantidadeMinima: 10, quantidade: 35, preco: 3.5 },
    { id: 2, nome: "Detergente Neutro", codigo: "7891024134702", categoria: "Limpeza",
      quantidadeMinima: 20, quantidade: 12, preco: 2.99 },
    { id: 3, nome: "Caderno 10 Matérias", codigo: "7897000100015", categoria: "Papelaria",
      quantidadeMinima: 5, quantidade: 18, preco: 24.9 },
];

export const MOCK_SUMMARY = { entradas: 450, saidas: 215 };

export const MOCK_USER = {
    nome: "Julio Cardoso",
    email: "julio@email.com",
};