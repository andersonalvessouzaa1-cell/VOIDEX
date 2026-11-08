# Vendedores — próxima entrega solicitada (08/11/2026)

Solicitação do dono: presença, coração/favoritos, concluir vendas e acompanhar platina. Ainda NÃO implementados; nesta entrega somente navegação e responsividade.

- Presença: separar “ativo no Acervo Void” de “no jogo — informado pelo vendedor”. Nunca inferir login no jogo a partir de sessão no site. Exibir horário da atualização e expirar status antigo; fechar o navegador não pode manter presença indefinidamente. Não expor e-mail, última atividade privada ou IP.
- Vendas: ação explícita do proprietário, com quantidade e preço realmente negociados; confirmação e transação atômica. Venda parcial reduz quantidade; venda total sai da consulta pública. Retirar anúncio sem venda não incrementa estatísticas. Não executar esta ação nos anúncios reais do dono durante testes.
- Histórico privado: contar operações e unidades separadamente; somar quantidade × preço final informado. Rotular “vendas/platina informadas por você”, nunca saldo real da conta, lucro ou transação verificada. Permitir correção/estorno e impedir duplicação por duplo clique.
- Coração: começar por vendedor favorito privado, com remoção fácil. Se houver avaliação pública, definir antes quem pode avaliar, uma avaliação por conta, bloqueio de autoavaliação e abuso, e distinguir curtidas de reputação/compras comprovadas.
- Segurança: RLS por proprietário, sem confiar em owner_id/preço/status enviados pelo navegador; testes de isolamento com rollback. Não apagar nem concluir anúncios reais como fixtures.
- Conta do jogo: investigar método autorizado de verificação Warframe. Login Microsoft sozinho não comprova nickname; PlayStation depende de integração oficial disponível. Não adicionar botões sem funcionamento real.

Critérios: celular 320/375/768/1280 px, teclado, falhas de conexão, expiração de presença, dupla submissão e histórico sem dados inventados. Continuar gratuito.
