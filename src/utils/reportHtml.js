import { formatDate, formatMoney, MONTHS } from "./format";

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" width="200" height="47">
  <g transform="translate(6,4)">
    <polygon points="22,2 42,13 22,24 2,13" fill="#4D86F0"/>
    <polygon points="2,13 22,24 22,46 2,35" fill="#002F87"/>
    <polygon points="42,13 22,24 22,46 42,35" fill="#0045C4"/>
    <polygon points="12,7.5 32,18.5 32,22 12,11" fill="#FFFFFF" opacity="0.9"/>
  </g>
  <text x="58" y="30" font-family="Arial" font-size="22" font-weight="800" fill="#0B1F44">StockHub</text>
  <text x="59" y="46" font-family="Arial" font-size="11" font-weight="700" fill="#0045C4" letter-spacing="5">PRO</text>
</svg>`;

export function buildReportHtml({ company, products, summary, ano, mes, inicio, fim }) {
    const valorEstoque = products.reduce((total, p) => total + p.preco * p.quantidade, 0);
    const alertas = products.filter((p) => p.quantidade <= p.quantidadeMinima);

    const linhasEstoque = products.map((p) => `
        <tr>
            <td>${p.nome}</td>
            <td>${p.codigo}</td>
            <td>${p.categoria}</td>
            <td class="num ${p.quantidade <= p.quantidadeMinima ? "alerta" : ""}">${p.quantidade}</td>
            <td class="num">${p.quantidadeMinima}</td>
            <td class="num">${formatMoney(p.preco * p.quantidade)}</td>
        </tr>`).join("");

    const blocoAlertas = alertas.length === 0
        ? "<p>Nenhum produto abaixo da quantidade mínima. 👍</p>"
        : `<ul>${alertas.map((p) =>
            `<li><b>${p.nome}</b>: ${p.quantidade} em estoque (mínimo ${p.quantidadeMinima})</li>`
          ).join("")}</ul>`;

    return `
<html>
<head>
<meta charset="utf-8" />
<style>
    body { font-family: Arial, sans-serif; color: #222; padding: 24px; }
    .topo { display: flex; justify-content: space-between; align-items: center;
            border-bottom: 3px solid #0045C4; padding-bottom: 12px; }
    h1 { color: #0045C4; font-size: 20px; margin: 0; }
    h2 { color: #0045C4; font-size: 16px; margin-top: 28px; }
    .empresa { margin-top: 12px; font-size: 13px; line-height: 1.5; }
    .resumo { display: flex; gap: 12px; margin-top: 12px; }
    .card { flex: 1; border: 1px solid #0045C4; border-radius: 8px; padding: 12px; text-align: center; }
    .card span { display: block; font-size: 12px; color: #555; }
    .card b { font-size: 18px; color: #0045C4; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
    th { background: #0045C4; color: #fff; padding: 8px; text-align: left; }
    td { padding: 8px; border-bottom: 1px solid #ddd; }
    .num { text-align: right; }
    .alerta { color: #E53935; font-weight: bold; }
    .rodape { margin-top: 40px; font-size: 11px; color: #888; text-align: center; }
</style>
</head>
<body>
    <div class="topo">
        ${LOGO_SVG}
        <h1>Relatório Mensal<br/>${MONTHS[mes]} de ${ano}</h1>
    </div>

    <div class="empresa">
        <b>${company.nome}</b> — CNPJ ${company.cnpj}<br/>
        ${company.logradouro}, ${company.numero} — ${company.bairro}<br/>
        ${company.cidade} - ${company.estado} — CEP ${company.cep}<br/>
        Período: ${formatDate(inicio)} a ${formatDate(fim)}
    </div>

    <h2>Resumo do mês</h2>
    <div class="resumo">
        <div class="card"><span>Entradas</span><b>${summary.entradas}</b></div>
        <div class="card"><span>Saídas</span><b>${summary.saidas}</b></div>
        <div class="card"><span>Saldo</span><b>${summary.entradas - summary.saidas}</b></div>
        <div class="card"><span>Valor em estoque</span><b>${formatMoney(valorEstoque)}</b></div>
    </div>

    <h2>Estoque atual</h2>
    <table>
        <tr>
            <th>Produto</th><th>Código</th><th>Categoria</th>
            <th class="num">Qtd. atual</th><th class="num">Qtd. mínima</th><th class="num">Valor total</th>
        </tr>
        ${linhasEstoque}
    </table>

    <h2>Alertas de estoque baixo</h2>
    ${blocoAlertas}

    <div class="rodape">
        Gerado em ${formatDate(new Date())} por ${company.responsavel} — StockHub Pro
    </div>
</body>
</html>`;
}