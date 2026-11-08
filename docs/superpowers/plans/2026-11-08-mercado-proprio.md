# Mercado próprio — entrega agrupada
Autorização: concluir o Acervo Void gratuitamente; priorização atual de funcionalidade central com economia de tokens.
Ruling: implementar anúncios próprios autenticados, sem copiar ofertas do Warframe.market. A integração externa M1/M3 permanece pendente.
Escopo: catálogo negociável de mods/arcanos com rank conhecido; mercado público com filtros; dono cria/edita preço e quantidade/retira anúncios pela conta Google. Nickname/plataforma publicados somente após consentimento no formulário. Sem e-mail público, reputação fictícia, verificação da conta do jogo ou troca automática.
1. DTOs/validação e catálogo rastreável; testes específicos.
2. Tabelas/RLS/privilégios/quota20porusuário, itens/ranks permitidos e testes SQL com rollback.
3. Páginas /mercado e /conta/anuncios, contato por mensagem copiada; privacidade/termos atualizados.
4. Revisão de segurança, tipos/lint direcionado, publicação única, conferir leitura pública e proteção das ações. Não publicar anúncio real em nome do dono como teste.
Critérios: nenhum exemplo na lista real; usuário só altera seus anúncios; API pública não expõe e-mail/perfil privado; capacidade/rank/preço/quantidade validados no servidor e banco. Beta não equivale a concluir todo o plano.
