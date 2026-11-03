export function formatMoney(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDate(data) {
    const dia = String(data.getDate()).padStart(2, "0");    // 02/05 ao invés de 2/5
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    return `${dia}/${mes}/${data.getFullYear()}`;
}

export const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];