import Link from 'next/link';
export const metadata = { title: 'Termos de uso | Acervo Void' };
export default function TermsPage() {
  return <main className="mx-auto w-full max-w-3xl px-5 py-16">
    <Link href="/" className="text-energy-cyan underline">Voltar ao Acervo Void</Link>
    <h1 className="mt-8 font-display text-5xl">Termos de uso da beta</h1>
    <p className="mt-3 text-sm text-slate-400">Atualizado em 8 de novembro de 2026.</p>
    <div className="mt-8 space-y-7 leading-relaxed text-slate-300">
      <section><h2 className="font-display text-3xl text-white">O que o site oferece</h2><p>O Acervo Void é um projeto independente e gratuito de consulta de builds e demonstração de mercado para Warframe. Não é um serviço oficial da Digital Extremes nem é afiliado ao Warframe.market. As marcas e conteúdos do jogo pertencem aos respectivos titulares.</p></section>
      <section><h2 className="font-display text-3xl text-white">Limitações atuais</h2><p>O mercado desta beta usa anúncios, vendedores e preços de exemplo, identificados como demonstração. O site não recebe pagamentos, não realiza trocas e não acessa contas do jogo. A conta Google e o perfil privado não comprovam identidade no Warframe nem reputação comercial.</p><p className="mt-3">Os cálculos do Build Lab são parciais. O preset completo experimental disponível é o de Dante e não foi testado por nós dentro do jogo. Fontes e limitações devem ser consideradas antes de usar uma recomendação. Não há garantia de dano final, resultado de partida ou proteção contra punições do jogo.</p></section>
      <section><h2 className="font-display text-3xl text-white">Uso da conta</h2><p>Use somente uma conta Google à qual você tenha acesso autorizado. Não informe senhas do jogo, dados de pagamento ou informações sensíveis no nickname. Não use o site para fraude, falsificação de identidade, assédio, exploração de falhas ou tentativas de acessar dados de outras pessoas.</p></section>
      <section><h2 className="font-display text-3xl text-white">Disponibilidade</h2><p>As funções podem mudar ou ficar indisponíveis durante o desenvolvimento. A hospedagem gratuita está sujeita aos limites dos provedores. Os recursos de demonstração não constituem ofertas comerciais reais.</p></section>
      <section><h2 className="font-display text-3xl text-white">Contato e dados pessoais</h2><p>Para dúvidas, relatar problemas ou pedir exclusão da conta, escreva para <a className="text-energy-cyan underline break-all" href="mailto:anderson.alves.souzaa1@gmail.com">anderson.alves.souzaa1@gmail.com</a>. A <Link href="/privacidade" className="text-energy-cyan underline">Política de Privacidade</Link> explica o tratamento dos dados e como solicitar alterações.</p></section>
    </div>
  </main>;
}
