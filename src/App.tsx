/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { 
  Truck, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  ArrowRight, 
  Menu,
  CheckCircle2,
  HardHat,
  Hammer,
  PaintBucket
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
      });

      gsap.from('.hero-sub', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'back.out(1.7)'
      });

      // Scroll Reveals
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-accent/30">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto glass rounded-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <HardHat className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">ANDARAÍ</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a>
            <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
            <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300">
            Falar com Especialista
          </button>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000" 
              alt="Construction site" 
              className="w-full h-full object-cover opacity-40 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/40 to-dark-bg"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-xs font-bold tracking-widest uppercase text-accent"
            >
              <Star className="w-3 h-3 fill-accent" />
              Melhor Atendimento da Região
            </motion.div>
            
            <h1 className="hero-title text-6xl md:text-8xl font-black leading-[0.9] mb-8 text-gradient">
              DO BÁSICO AO <br />
              <span className="text-accent">ACABAMENTO</span> DE LUXO.
            </h1>
            
            <p className="hero-sub text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Materiais de alta qualidade, entrega recorde e o atendimento humano que sua obra merece. No Andaraí, transformamos sua reforma em realização.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group bg-accent text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:shadow-[0_0_30px_rgba(242,125,38,0.4)] transition-all duration-300">
                Simular Entrega Agora
                <Truck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                Ver Catálogo
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* BRAND MARQUEE */}
        <section className="py-20 border-y border-white/5 overflow-hidden bg-white/[0.02]">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 mx-16">
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">VOTORANTIM</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">SUVINIL</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">TIGRE</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">GERDAU</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">AMANCO</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">DECA</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">CORAL</span>
                <span className="text-4xl font-display font-black text-white/10 hover:text-accent/40 transition-colors cursor-default">VEDACIT</span>
              </div>
            ))}
          </div>
        </section>

        {/* DIFERENCIAIS BENTO GRID */}
        <section id="diferenciais" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">POR QUE SOMOS <span className="text-accent italic">DIFERENTES</span>?</h2>
            <p className="text-white/50 max-w-xl mx-auto">Não vendemos apenas tijolos e cimento. Entregamos confiança e tecnologia para facilitar sua vida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Big Card - Simulator */}
            <div className="bento-item md:col-span-2 md:row-span-2 group scroll-reveal">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Truck size={200} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                    <Truck className="text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Simulador de Entrega em Tempo Real</h3>
                  <p className="text-white/60 max-w-md">Insira seu CEP e veja nosso caminhão em movimento. Saiba exatamente o custo do frete e o tempo de chegada sem precisar de login.</p>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Seu CEP (00000-000)" 
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex-1 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-accent hover:text-white transition-all">
                    Simular
                  </button>
                </div>
              </div>
            </div>

            {/* AI Chat Card */}
            <div className="bento-item scroll-reveal">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">FAQ Inteligente 24h</h3>
              <p className="text-sm text-white/50">Nosso chat é treinado com as 200 dúvidas mais comuns dos nossos clientes. Respostas técnicas instantâneas.</p>
            </div>

            {/* Quality Card */}
            <div className="bento-item scroll-reveal">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Qualidade Certificada</h3>
              <p className="text-sm text-white/50">Trabalhamos apenas com as melhores marcas do mercado, do básico ao acabamento fino.</p>
            </div>

            {/* Speed Card */}
            <div className="bento-item md:col-span-1 scroll-reveal">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Entrega Expressa</h3>
              <p className="text-sm text-white/50">Logística otimizada para o Rio de Janeiro. Sua obra não para por falta de material.</p>
            </div>
          </div>
        </section>

        {/* SERVICES / ABOUT */}
        <section id="servicos" className="py-32 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Quem Somos</span>
              <h2 className="text-5xl font-bold mb-8 leading-tight">SOLUÇÕES COMPLETAS PARA SUA <span className="italic">OBRA</span>.</h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Somos uma empresa do ramo de materiais de construção que entende a dor do cliente. Trabalhamos do básico ao acabamento, oferecendo material de qualidade e preço justo, seguido de um atendimento que já virou referência no Andaraí.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { icon: <Hammer />, title: "Material Básico", desc: "Areia, brita, cimento e tijolos de alta resistência." },
                  { icon: <PaintBucket />, title: "Acabamento", desc: "Pisos, azulejos e tintas das melhores marcas." },
                  { icon: <CheckCircle2 />, title: "Consultoria Técnica", desc: "Vendedores que entendem de obra para te ajudar." }
                ].map((item, i) => (
                  <div key={i} className="glass p-6 rounded-2xl">
                    <div className="text-accent mb-4">{item.icon}</div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="depoimentos" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 scroll-reveal">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold mb-6">O QUE DIZEM NOSSOS <span className="text-accent">CLIENTES AMIGOS</span></h2>
                <p className="text-white/50">A confiança se conquista com transparência e ajuda mútua. Veja por que somos recomendados.</p>
              </div>
              <div className="flex items-center gap-2 glass px-6 py-3 rounded-full">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <span className="font-bold">4.9 no Google</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ateliê do Conhecimento",
                  text: "Excelentes profissionais, gentis e prestativos. Foram humanos e me emprestaram uma ferramenta para usar em casa na boa-fé, pois não conseguia usar o material que havia comprado. Ganhou nossa confiança! Recomendo! ❤️1",
                  tag: "Recomendo ❤️"
                },
                {
                  name: "Marli Cruz",
                  text: "Melhor loja do bairro, ótimos preços e excelente atendimento! Recomendo com certeza! ❤️2",
                  tag: "Preço Justo ❤️"
                },
                {
                  name: "Maria Cristina da Costa Sampaio",
                  text: "Passando para comentar que a loja fica perto de onde moro e os preços são bons e principalmente a qualidade no atendimento dos funcionários. Recomendo com certeza. Passem lá para conferir ❤️1",
                  tag: "Qualidade ❤️"
                },
                {
                  name: "Ana Lucia Brito",
                  text: "Muito bom atendimento o rapaz entendi te tudo até pra ajudar e tirar as dúvidas sobre material excelente atendimento ❤️1",
                  tag: "Expertise ❤️"
                },
                {
                  name: "Eduarda",
                  text: "Atendimento excelente,loja bastante organizada e com muita variedade,estão de parabéns 👏🏼 ❤️1",
                  tag: "Organização ❤️"
                },
                {
                  name: "Naim Moussa",
                  text: "Além do bom atendimento, a entrega é muito rápida! ❤️1",
                  tag: "Entrega Rápida ❤️"
                }
              ].map((test, i) => (
                <div key={i} className="glass p-8 rounded-3xl flex flex-col justify-between scroll-reveal">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                    </div>
                    <p className="text-white/80 leading-relaxed mb-8 italic">"{test.text}"</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">{test.name}</h4>
                      <span className="text-xs text-accent font-bold uppercase tracking-widest">{test.tag}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="contato" className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden scroll-reveal">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/10 blur-[120px] -z-10"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8">PRONTO PARA TIRAR SUA OBRA DO <span className="text-accent">PAPEL</span>?</h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Estamos na R. Leopoldo, 106 - Andaraí. Venha conferir nossos preços ou peça pelo WhatsApp com entrega recorde.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="https://wa.me/5521998187716" 
                target="_blank" 
                rel="noreferrer"
                className="w-full md:w-auto bg-accent text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform"
              >
                <Phone className="w-6 h-6" />
                (21) 99818-7716
              </a>
              <div className="flex flex-col items-start gap-2 text-left">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin className="w-4 h-4" />
                  R. Leopoldo, 106 - Andaraí, RJ
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Clock className="w-4 h-4" />
                  Aberto até às 18:30
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <HardHat className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold tracking-tighter">ANDARAÍ MATERIAIS</span>
          </div>
          
          <p className="text-white/30 text-sm">
            © 2026 Andaraí Materiais de Construção. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
        <MessageSquare className="text-white w-8 h-8" />
        <span className="absolute right-20 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Dúvida técnica? Fale com a IA
        </span>
      </button>
    </div>
  );
}
