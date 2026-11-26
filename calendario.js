/* Calendario de Adviento: dibuja el calendario a partir de la configuración (config.js).
   Lo usan tanto index.html (la web final) como editor.html (la vista previa). */
(function () {
  'use strict';

  var HEART = '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>';
  var STAR = '<path d="M12 2l2.6 6.9L22 9.3l-5.8 4.6 2 7.1L12 17l-6.2 4 2-7.1L2 9.3l7.4-.4z"/>';
  var LOCK = '<svg class="adv-lock" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var BOW = '<svg class="adv-bow" aria-hidden="true" viewBox="0 0 58 34"><path d="M29 22C21 4 3 2 5 14s17 8 24 8zM29 22c8-18 26-20 24-8s-17 8-24 8z" fill="#F2C46D"/><path d="M26 22l-8 12M32 22l8 12" stroke="#F2C46D" stroke-width="4"/><circle cx="29" cy="22" r="5" fill="#C99A3A"/></svg>';
  var CLOSE = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var HILLS = '<svg class="adv-hills" aria-hidden="true" viewBox="0 0 390 120" preserveAspectRatio="none"><path d="M0 70 Q60 40 120 62 T240 58 T390 50 V120 H0Z" fill="#102338"/><path d="M0 92 Q90 70 180 88 T390 80 V120 H0Z" fill="#14294A" opacity=".8"/></svg>';

  var ADORNOS = {
    '': { nombre: 'Ninguno', svg: '' },
    corazon: { nombre: 'Corazón', svg: '<svg class="adv-orn" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">' + HEART + '</svg>' },
    estrella: { nombre: 'Estrella', svg: '<svg class="adv-orn" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">' + STAR + '</svg>' },
    copo: { nombre: 'Copo', svg: '<svg class="adv-orn" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/></svg>' },
    campana: { nombre: 'Campana', svg: '<svg class="adv-orn" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3.5h16L18 13V9a6 6 0 0 0-6-6z"/><circle cx="12" cy="19.5" r="2.2"/></svg>' },
    acebo: { nombre: 'Acebo', svg: '<svg class="adv-orn" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12C8 13 3.5 11 2.5 6.5 7 6 11 8 12 12z" fill="#2F7A4D"/><path d="M12 12c4 1 8.5-1 9.5-5.5C17 6 13 8 12 12z" fill="#3B8C5A"/><circle cx="9.8" cy="14.6" r="2.6" fill="#D7263D"/><circle cx="14.2" cy="14.6" r="2.6" fill="#E33A4F"/><circle cx="12" cy="18.4" r="2.6" fill="#C21F35"/></svg>' }
  };

  var TONOS = {
    rojo: { cls: 'k0', nombre: 'Rojo', muestra: '#A61E2A' },
    verde: { cls: 'k1', nombre: 'Verde abeto', muestra: '#1C5A3F' },
    crema: { cls: 'k2', nombre: 'Crema', muestra: '#F4EAD6' },
    noche: { cls: 'k3', nombre: 'Azul noche', muestra: '#16304A' },
    rosa: { cls: 'k5', nombre: 'Rosa', muestra: '#C9415E' },
    baston: { cls: 'k4', nombre: 'Bastón de caramelo', muestra: 'repeating-linear-gradient(135deg,#F4EAD6 0 5px,#C4303A 5px 10px)' },
    regalo: { cls: 'k6', nombre: 'Regalo con lazo', muestra: 'linear-gradient(#E0B04F,#E0B04F) 50% 0/5px 100% no-repeat,linear-gradient(#E0B04F,#E0B04F) 0 50%/100% 5px no-repeat,#A61E2A' },
    jersey: { cls: 'k10', nombre: 'Jersey navideño', muestra: 'linear-gradient(135deg,#F4EAD6 25%,transparent 25%) -4px 70%/8px 8px repeat-x,linear-gradient(225deg,#F4EAD6 25%,transparent 25%) -4px 70%/8px 8px repeat-x,#B3262E' },
    cuadros: { cls: 'k11', nombre: 'Cuadros escoceses', muestra: 'repeating-linear-gradient(0deg,rgba(166,30,42,.65) 0 3px,transparent 3px 9px),repeating-linear-gradient(90deg,rgba(166,30,42,.65) 0 3px,transparent 3px 9px),#1C5A3F' },
    menta: { cls: 'k14', nombre: 'Caramelo de menta', muestra: 'radial-gradient(circle,#E0525C 1.5px,transparent 2px) 0 0/8px 8px,#D5EFE2' },
    galleta: { cls: 'k13', nombre: 'Galleta de jengibre', muestra: '#9A5B2E' },
    nevado: { cls: 'k12', nombre: 'Nevado', muestra: 'linear-gradient(#fff,#fff) 0 0/100% 30% no-repeat,#1C5A3F' },
    oro: { cls: 'k7', nombre: 'Oro brillante', muestra: 'linear-gradient(135deg,#F8DB83,#D9A535 55%,#B07A22)', animado: true },
    escarcha: { cls: 'k8', nombre: 'Escarcha', muestra: 'linear-gradient(160deg,#EEF7FB,#BCDCEC)', animado: true },
    luces: { cls: 'k9', nombre: 'Bombillas', muestra: '#12243A', animado: true },
    estrellada: { cls: 'k15', nombre: 'Noche estrellada', muestra: 'radial-gradient(circle,#FFE6A0 1px,transparent 1.5px) 0 0/7px 7px,#0F1E3A', animado: true }
  };
  var MOVIMIENTOS = { '': 'Quieta', balanceo: 'Balanceo', latido: 'Latido', flotar: 'Flotar', centelleo: 'Resplandor', brillo: 'Destello' };
  var APERTURAS = { bisagra: 'Bisagra', voltear: 'Hacia arriba', persiana: 'Persiana', deslizar: 'Deslizar', barrido: 'Barrido', desvanecer: 'Desvanecer', caer: 'Caerse', explotar: 'Estallar' };
  var EFECTOS = { ninguno: 'Ninguno', confeti: 'Confeti', corazones: 'Corazones', estrellas: 'Estrellas', copos: 'Copos', mezcla: 'De todo' };
  var FONDOS = {
    nevada: { nombre: 'Noche nevada', muestra: 'linear-gradient(180deg,#0B1828 60%,#14294A)' },
    aurora: { nombre: 'Aurora boreal', muestra: 'linear-gradient(170deg,#061220 20%,#1E8E6E 45%,#4C3A9E 65%,#061220 90%)' },
    estrellas: { nombre: 'Cielo estrellado', muestra: 'radial-gradient(circle,#fff 1px,transparent 1.5px) 0 0/11px 9px,linear-gradient(180deg,#040917,#18264A)' },
    bosque: { nombre: 'Bosque y luna', muestra: 'radial-gradient(circle at 75% 30%,#F4EAD6 0 9%,transparent 10%),linear-gradient(180deg,#0A1726,#123326)' },
    chimenea: { nombre: 'Junto a la chimenea', muestra: 'radial-gradient(130% 70% at 50% 110%,#C2531C,#3D130C 55%,#190A09)' },
    luces: { nombre: 'Guirnalda de luces', muestra: 'radial-gradient(circle,#FF5A4E 2.5px,transparent 3px) 2px 4px/16px 30px,radial-gradient(circle,#F2C46D 2.5px,transparent 3px) 10px 6px/16px 30px,#0E1630' },
    regalo: { nombre: 'Papel de regalo', muestra: 'repeating-linear-gradient(45deg,rgba(255,255,255,.12) 0 6px,transparent 6px 12px),#7E1620' }
  };
  var TIPOGRAFIAS = { clasica: 'Clásica', manuscrita: 'Manuscrita', moderna: 'Moderna' };
  var TAMANOS = { '1x1': '', '2x1': 'w2', '1x2': 'h2', '2x2': 'w2 h2' };
  var CELDAS = { '1x1': 1, '2x1': 2, '1x2': 2, '2x2': 4 };
  var ETIQUETAS = { mensaje: '', foto: '', invitacion: 'Invitación', regalo: 'Hay un regalo escondido', vale: 'Vale canjeable', cancion: 'Nuestra canción', libre: '' };


  /* ---------- Textos en cada idioma ---------- */
  function ord(n) { var v = n % 100; return n + ((v > 10 && v < 14) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th')); }
  var TEXTOS = {
    es: {
      mes: 'Diciembre', fecha: function (n) { return n + ' de diciembre'; },
      antes: 'Empieza el 1 de diciembre', nochebuena: 'Es Nochebuena. Abre la puerta grande.',
      faltan: function (f, d) { return 'Faltan ' + f + (f === 1 ? ' día' : ' días') + ' para Nochebuena · hoy toca el ' + d; },
      dia: function (n) { return 'Día ' + n; }, bloqueado: ', bloqueado',
      paciencia: function (n) { return 'Paciencia… se abre el ' + n + ' de diciembre'; },
      cerrar: 'Cerrar', abrir: 'Abrir', etiquetas: { invitacion: 'Invitación', regalo: 'Hay un regalo escondido', vale: 'Vale canjeable', cancion: 'Nuestra canción' }, musicaOn: 'Silenciar música', musicaOff: 'Poner música', reproducir: 'Reproducir', pausar: 'Pausar', escucharEn: 'Escuchar canción', guardarVale: 'Guardar / Enviar vale', valePara: 'Para', valeDe: 'De', valePie: 'Válido cuando tú quieras ♥', valeListo: '¡Vale guardado!',
      fotoAqui: 'Aquí irá la foto', fotoDel: function (n) { return 'Foto del día ' + n; }, vacio: 'Todavía no hay nada en este día.',
      tituloDef: 'Para ti, {nombre}', gateTitulo: 'Este calendario tiene dueña',
      gateTexto: 'Escribe la contraseña para entrar. Cada intento fallido te da una pista.',
      contrasena: 'Contraseña', casi: 'Casi… prueba otra vez.', pista: 'Pista',
      muac: '¡Muac!', paraTi: '¡Para ti!', lleno: '¡Lleno de regalos!', carta: 'Para ti',
      magia: '¡Magia!', sorpresa: '¡Sorpresa!', feliz: '¡Feliz día!', miau: '¡Miau!', besito: '¡Un besito!',
      saltar: 'Toca para saltar'
    },
    en: {
      mes: 'December', fecha: function (n) { return n + ' December'; },
      antes: 'It starts on 1 December', nochebuena: 'It’s Christmas Eve. Open the big door.',
      faltan: function (f, d) { return f + (f === 1 ? ' day' : ' days') + ' to Christmas Eve · today is the ' + ord(d); },
      dia: function (n) { return 'Day ' + n; }, bloqueado: ', locked',
      paciencia: function (n) { return 'Patience… this one opens on ' + n + ' December'; },
      cerrar: 'Close', abrir: 'Open', etiquetas: { invitacion: 'Invitation', regalo: 'There’s a hidden present', vale: 'Redeemable voucher', cancion: 'Our song' }, musicaOn: 'Mute music', musicaOff: 'Play music', reproducir: 'Play', pausar: 'Pause', escucharEn: 'Listen to song', guardarVale: 'Save / Send voucher', valePara: 'For', valeDe: 'From', valePie: 'Valid anytime you want ♥', valeListo: 'Voucher saved!',
      fotoAqui: 'Your photo goes here', fotoDel: function (n) { return 'Photo for day ' + n; }, vacio: 'Nothing here yet.',
      tituloDef: 'For you, {nombre}', gateTitulo: 'This calendar belongs to someone special',
      gateTexto: 'Type the password to come in. Every wrong guess gives you a hint.',
      contrasena: 'Password', casi: 'So close… try again.', pista: 'Hint',
      muac: 'Mwah!', paraTi: 'For you!', lleno: 'Full of presents!', carta: 'For you',
      magia: 'Magic!', sorpresa: 'Surprise!', feliz: 'Happy day!', miau: 'Meow!', besito: 'A little kiss!',
      saltar: 'Tap to skip'
    }
  };
  var T = TEXTOS.es;
  function idioma(cfg) { T = TEXTOS[cfg && cfg.idioma] || TEXTOS.es; return T; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function heart(size, fill, attrs) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + fill + '" ' + (attrs || '') + '>' + HEART + '</svg>';
  }
  function plantilla(txt, cfg) { return String(txt || '').replace(/\{nombre\}/g, cfg.nombre || ''); }
  function adornoDe(d) { return d.adorno != null ? d.adorno : (d.corazon ? 'corazon' : ''); }

  /* Qué día de diciembre es hoy para el calendario: 0 = aún no ha empezado, 24 = todo abierto */
  function diaActual(cfg) {
    var now = new Date(), y = Number(cfg.anio) || now.getFullYear();
    if (now.getFullYear() < y) return 0;
    if (now.getFullYear() > y) return 24;
    if (now.getMonth() < 11) return 0;
    return Math.min(24, now.getDate());
  }

  /* Números pseudoaleatorios estables, para que el fondo no cambie en cada redibujo */
  function rnd(seed) { var x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); }

  function fondoHTML(tipo) {
    var h = '', i;
    switch (tipo) {
      case 'aurora':
        return '<i></i><i></i><i></i>' + HILLS.replace('#102338', '#07182A').replace('#14294A', '#0B2236');
      case 'chimenea':
        h = '<div class="adv-fire"></div>';
        for (i = 0; i < 18; i++) {
          var s = 2 + Math.round(rnd(i) * 3);
          h += '<span style="left:' + (rnd(i + 40) * 100).toFixed(1) + '%;width:' + s + 'px;height:' + s + 'px;animation-duration:' + (6 + rnd(i + 80) * 6).toFixed(1) + 's;animation-delay:-' + (rnd(i + 120) * 10).toFixed(1) + 's"></span>';
        }
        return h;
      case 'bosque':
        return '<div class="adv-moon"></div><svg class="adv-trees" aria-hidden="true" viewBox="0 0 390 170" preserveAspectRatio="xMidYMax slice">' +
          arboles(14, 70, '#0D2621', 1) + arboles(11, 40, '#0A1C18', 7) + '<rect x="0" y="160" width="390" height="10" fill="#0A1C18"/></svg>';
      case 'luces':
        h = '<div class="adv-wire"><svg aria-hidden="true" viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M-2 8 Q25 60 50 8 Q75 60 102 8" fill="none" stroke="#2A3445" stroke-width=".6" vector-effect="non-scaling-stroke"/></svg>';
        var col = ['#FF5A4E', '#F2C46D', '#4FD1C5', '#FF8FB1', '#7FD36B'];
        for (i = 0; i < 12; i++) {
          var arco = i < 6 ? 0 : 50, t = 0.1 + (i % 6) * 0.16, x = arco + 50 * t, y = 8 + 104 * t * (1 - t);
          h += '<span style="left:' + x.toFixed(1) + '%;top:' + (y + 3).toFixed(1) + 'px;background:' + col[i % 5] + ';color:' + col[i % 5] + ';animation-delay:-' + (rnd(i + 3) * 2.4).toFixed(2) + 's"></span>';
        }
        return h + '</div>';
      case 'estrellas':
        for (i = 0; i < 46; i++) {
          var z = rnd(i + 7) > .85 ? 3 : 2;
          h += '<span style="left:' + (rnd(i) * 100).toFixed(1) + '%;top:' + (rnd(i + 200) * 75).toFixed(1) + '%;width:' + z + 'px;height:' + z + 'px;animation-duration:' + (2 + rnd(i + 9) * 3).toFixed(1) + 's;animation-delay:-' + (rnd(i + 30) * 4).toFixed(1) + 's"></span>';
        }
        return h + '<div class="adv-shoot"></div>' + HILLS.replace('#102338', '#101C38').replace('#14294A', '#18264A');
      case 'regalo':
        return '';
      default:
        return HILLS;
    }
  }
  function arboles(n, alto, color, seed) {
    var p = '', paso = 390 / n;
    for (var i = 0; i <= n; i++) {
      var x = i * paso + (rnd(i + seed) - .5) * paso * .6, h = alto * (.7 + rnd(i * 3 + seed) * .6), w = h * .32, y = 162;
      p += 'M' + (x - w).toFixed(1) + ' ' + y + 'L' + x.toFixed(1) + ' ' + (y - h).toFixed(1) + 'L' + (x + w).toFixed(1) + ' ' + y + 'Z';
      p += 'M' + (x - w * .8).toFixed(1) + ' ' + (y - h * .35).toFixed(1) + 'L' + x.toFixed(1) + ' ' + (y - h * 1.05).toFixed(1) + 'L' + (x + w * .8).toFixed(1) + ' ' + (y - h * .35).toFixed(1) + 'Z';
    }
    return '<path d="' + p + '" fill="' + color + '"/>';
  }

  function nieve(root, cfg) {
    var n = cfg.nieve || {};
    if (n.activa === false) return;
    var copos = n.copos == null ? 14 : n.copos, cor = n.corazones == null ? 7 : n.corazones;
    var colores = ['#FF8FA3', '#FFFFFF', '#E8475A', '#FFC2CC'];
    var h = '';
    for (var i = 0; i < copos; i++) {
      var s = 2 + ((i * 7) % 5), left = ((i * 37) % 100), dur = 8 + ((i * 5) % 9), del = -((i * 3.3) % dur);
      h += '<i style="left:' + left + '%;width:' + s + 'px;height:' + s + 'px;opacity:' + (s > 5 ? .5 : .78) + ';animation-duration:' + dur + 's;animation-delay:' + del.toFixed(1) + 's"></i>';
    }
    for (var j = 0; j < cor; j++) {
      var sz = 8 + ((j * 5) % 7), l2 = (11 + j * 29) % 100, d2 = 12 + ((j * 3) % 7), dl2 = -((j * 4.7) % d2);
      h += '<b style="left:' + l2 + '%;animation-duration:' + d2 + 's;animation-delay:' + dl2.toFixed(1) + 's">' + heart(sz, colores[j % 4], 'opacity="' + (j % 3 ? .85 : .7) + '"') + '</b>';
    }
    var el = document.createElement('div');
    el.className = 'adv-snow';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = h;
    root.appendChild(el);
  }

  /* Prepara la raíz: clases de fondo y tipografía + capa de fondo */
  function raiz(root, cfg, opts, extra) {
    var fondo = FONDOS[cfg.fondo] ? cfg.fondo : 'nevada';
    var tipo = TIPOGRAFIAS[cfg.tipografia] ? cfg.tipografia : 'clasica';
    clearTimeout(root._advT);
    idioma(cfg);
    root.className = 'adv-root bg-' + fondo + ' t-' + tipo + (opts.enMarco ? ' is-frame' : '') + (extra || '');
    root.innerHTML = '<div class="adv-bg" aria-hidden="true">' + fondoHTML(fondo) + '</div>';
  }

  function puertaHTML(d, estado, extra, cfg, resolver) {
    var tono = (TONOS[d.tono] || TONOS.noche).cls;
    var anim = APERTURAS[d.apertura] ? d.apertura : (APERTURAS[cfg.apertura] ? cfg.apertura : 'bisagra');
    var mov = MOVIMIENTOS[d.movimiento] && d.movimiento ? ' m-' + d.movimiento : '';
    var cls = 'adv-door ' + tono + ' ' + (TAMANOS[d.tam] || '') + ' a-' + anim + mov + ' ' + estado + (extra || '');
    var leaf = '<span class="adv-deco"></span><span class="adv-shine"></span>';
    if (d.tono === 'regalo') leaf += BOW;
    leaf += (ADORNOS[adornoDe(d)] || ADORNOS['']).svg;
    leaf += '<span class="adv-num">' + d.n + '</span>';
    if (estado === 'locked') leaf += LOCK;
    var dentro = d.imagen && cfg.fotoDentro !== false
      ? '<img class="adv-inimg" src="' + esc(resolver ? resolver(d.imagen) : d.imagen) + '" alt="" loading="lazy">'
      : heart(24, '#A61E2A', 'aria-hidden="true"');
    return '<button type="button" class="' + cls + '" style="--dl:-' + ((d.n * 0.37) % 3).toFixed(2) + 's" data-n="' + d.n + '" aria-label="' + T.dia(d.n) + (estado === 'locked' ? T.bloqueado : '') + '">' +
      '<span class="adv-inside">' + dentro + '</span><span class="adv-leaf">' + leaf + '</span></button>';
  }

  /* ---------- Objetos animados para la tarjeta abierta ---------- */
  var OBJETOS = {
    '': { nombre: 'Ninguna', svg: '' },
    matcha: {
      nombre: 'Matcha',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-spark" fill="#E6B24C"><path d="M22 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M96 38l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>' +
        '<g class="o-bob"><rect x="66" y="10" width="6" height="44" rx="3" transform="rotate(14 69 32)" fill="#4D8B55"/>' +
        '<path d="M35 38 H85 L79 100 Q78 106 72 106 H48 Q42 106 41 100 Z" fill="#F4EFE6" stroke="#C9B99F" stroke-width="2.2"/>' +
        '<path d="M38 56 Q60 51 82 56 L78 99 Q77 103 72 103 H48 Q43 103 42 99 Z" fill="#7AB362"/>' +
        '<path class="o-swirl" d="M40 76 Q52 70 62 78 T80 74 L78 99 Q77 103 72 103 H48 Q43 103 42 99 Z" fill="#F6F1E7" opacity=".82"/>' +
        '<rect class="o-ice1" x="45" y="45" width="12" height="12" rx="3" transform="rotate(-12 51 51)" fill="#FFFFFF" opacity=".75"/>' +
        '<rect class="o-ice2" x="62" y="47" width="11" height="11" rx="3" transform="rotate(15 67 52)" fill="#FFFFFF" opacity=".7"/>' +
        '<ellipse cx="60" cy="38" rx="25" ry="5" fill="#E8F0DF" stroke="#C9B99F" stroke-width="1.8"/>' +
        '<ellipse cx="60" cy="38" rx="20" ry="3" fill="#90C476" opacity=".8"/></g></svg>'
    },
    dulce: {
      nombre: 'Sweet treat',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-spark" fill="#E6B24C"><path d="M22 34l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M98 28l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>' +
        '<g class="o-bounce"><path d="M34 66 H86 L78 104 Q77 108 72 108 H48 Q43 108 42 104 Z" fill="#E5989B" stroke="#C46D74" stroke-width="2"/>' +
        '<path d="M45 66 L49 107 M60 66 V108 M75 66 L71 107" stroke="#C46D74" stroke-width="1.8" opacity=".55"/>' +
        '<path d="M30 66 C28 50, 44 46, 60 46 C76 46, 92 50, 90 66 Q80 72 70 66 Q60 72 50 66 Q40 72 30 66 Z" fill="#FFF2F4" stroke="#E7BAC2" stroke-width="1.8"/>' +
        '<path d="M38 50 C38 36, 50 32, 60 32 C70 32, 82 36, 82 50 Z" fill="#FFD6DF"/>' +
        '<path d="M48 36 C48 26, 60 22, 68 28 C72 31, 72 36, 72 36 Z" fill="#FFF2F4"/>' +
        '<rect x="44" y="45" width="6" height="2.6" rx="1.3" transform="rotate(-20 47 46)" fill="#E8475A"/>' +
        '<rect x="66" y="42" width="6" height="2.6" rx="1.3" transform="rotate(25 69 43)" fill="#4FD1C5"/>' +
        '<rect x="55" y="54" width="6" height="2.6" rx="1.3" transform="rotate(10 58 55)" fill="#F2C46D"/>' +
        '<rect x="74" y="54" width="6" height="2.6" rx="1.3" transform="rotate(-30 77 55)" fill="#8E6CF0"/>' +
        '<circle cx="60" cy="24" r="8" fill="#D7263D"/><circle cx="57" cy="21" r="2.2" fill="#FF9AA8"/>' +
        '<path d="M62 17 Q68 8 75 11" fill="none" stroke="#3B8C5A" stroke-width="2.2" stroke-linecap="round"/></g></svg>'
    },
    pan: {
      nombre: 'Pan recién hecho',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-steam" fill="none" stroke="#C99A5B" stroke-width="2.4" stroke-linecap="round">' +
        '<path d="M42 46 Q38 36 44 26 T42 12"/><path d="M60 42 Q56 32 62 22 T60 8"/><path d="M78 46 Q74 36 80 26 T78 12"/></g>' +
        '<g class="o-bob"><ellipse cx="60" cy="98" rx="44" ry="8" fill="#DFD1BC"/>' +
        '<path d="M18 86 C18 54, 38 46, 60 46 C82 46, 102 54, 102 86 Q102 96 90 96 H30 Q18 96 18 86 Z" fill="#D48C46" stroke="#9E5E24" stroke-width="2.2"/>' +
        '<path d="M26 78 C28 58, 44 52, 60 52 C76 52, 92 58, 94 78" fill="none" stroke="#F0BE7D" stroke-width="3" opacity=".45"/>' +
        '<path d="M38 56 Q44 62 48 70 M56 52 Q62 59 66 68 M74 56 Q79 62 82 70" fill="none" stroke="#F7E4C4" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M38 56 Q44 62 48 70 M56 52 Q62 59 66 68 M74 56 Q79 62 82 70" fill="none" stroke="#9E5E24" stroke-width="1.4" stroke-linecap="round"/></g></svg>'
    },
    croquetas: {
      nombre: 'Croquetas',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-steam" fill="none" stroke="#C99A5B" stroke-width="2.2" stroke-linecap="round">' +
        '<path d="M44 48 Q40 38 46 28"/><path d="M60 42 Q56 32 62 22"/><path d="M76 48 Q72 38 78 28"/></g>' +
        '<g class="o-heart"><path d="M60 28s-7-4.5-7-9.5a3.8 3.8 0 0 1 7-2.4A3.8 3.8 0 0 1 67 18.5c0 5-7 9.5-7 9.5z" fill="#E8475A"/></g>' +
        '<ellipse cx="60" cy="92" rx="48" ry="15" fill="#FFFFFF" stroke="#D5C7B2" stroke-width="2.2"/>' +
        '<ellipse cx="60" cy="91" rx="35" ry="9" fill="#F5EFE5"/>' +
        '<g class="o-bob">' +
        '<g transform="rotate(-14 42 78)"><rect x="24" y="67" width="36" height="20" rx="10" fill="#CE8136" stroke="#9A581B" stroke-width="1.8"/><circle cx="34" cy="74" r="1.3" fill="#F6D198"/><circle cx="46" cy="79" r="1.4" fill="#F6D198"/><circle cx="52" cy="73" r="1.2" fill="#8B4A14"/></g>' +
        '<g transform="rotate(12 78 78)"><rect x="60" y="67" width="36" height="20" rx="10" fill="#D68A3E" stroke="#9A581B" stroke-width="1.8"/><circle cx="70" cy="75" r="1.3" fill="#F6D198"/><circle cx="82" cy="78" r="1.4" fill="#8B4A14"/><circle cx="88" cy="74" r="1.2" fill="#F6D198"/></g>' +
        '<g transform="rotate(-3 60 66)"><rect x="41" y="55" width="38" height="21" rx="10.5" fill="#DF9547" stroke="#9A581B" stroke-width="1.8"/><circle cx="52" cy="63" r="1.5" fill="#F8D8A6"/><circle cx="63" cy="67" r="1.3" fill="#8B4A14"/><circle cx="71" cy="62" r="1.4" fill="#F8D8A6"/></g></g></svg>'
    },
    cafe: {
      nombre: 'Café',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-steam" fill="none" stroke="#B68B64" stroke-width="2.4" stroke-linecap="round">' +
        '<path d="M46 42 Q42 32 48 22 T46 10"/><path d="M62 40 Q58 30 64 20 T62 8"/><path d="M76 44 Q72 34 78 24"/></g>' +
        '<ellipse cx="58" cy="98" rx="40" ry="9" fill="#E6DAC6" stroke="#C8B79C" stroke-width="2"/>' +
        '<path d="M84 58 H94 A11 11 0 0 1 94 80 H82" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>' +
        '<path d="M84 58 H94 A11 11 0 0 1 94 80 H82" fill="none" stroke="#C8B79C" stroke-width="2"/>' +
        '<path d="M28 50 H88 L82 90 Q80 96 72 96 H44 Q36 96 34 90 Z" fill="#FFFFFF" stroke="#C8B79C" stroke-width="2.2"/>' +
        '<ellipse cx="58" cy="50" rx="30" ry="7" fill="#7B4A2B" stroke="#C8B79C" stroke-width="2"/>' +
        '<path d="M58 54s-6-3-6-6a2.8 2.8 0 0 1 6-1.5A2.8 2.8 0 0 1 64 48c0 3-6 6-6 6z" fill="#F7EFE4"/></svg>'
    },
    cena: {
      nombre: 'Cena especial',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-spark" fill="#E6B24C"><path d="M24 38l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M96 34l1.8 4.5 4.5 1.8-4.5 1.8-1.8 4.5-1.8-4.5-4.5-1.8 4.5-1.8z"/></g>' +
        '<ellipse cx="60" cy="90" rx="48" ry="11" fill="#D5DCE4" stroke="#8E9BAE" stroke-width="2"/>' +
        '<ellipse class="o-glow" cx="60" cy="86" rx="32" ry="8" fill="#FFE394" opacity=".8"/>' +
        '<g class="o-lift"><circle cx="60" cy="38" r="6" fill="#C4CEDB" stroke="#8E9BAE" stroke-width="2"/>' +
        '<path d="M20 86 C20 52, 38 42, 60 42 C82 42, 100 52, 100 86 Z" fill="#E2E8F0" stroke="#8E9BAE" stroke-width="2.2"/>' +
        '<path d="M32 76 C34 58, 46 50, 56 49" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".8"/></g></svg>'
    },
    cine: {
      nombre: 'Cine / Película',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-pop">' +
        '<circle cx="42" cy="42" r="9" fill="#FFF7D6" stroke="#E5C573" stroke-width="1.6"/>' +
        '<circle cx="56" cy="36" r="10" fill="#FFFDF2" stroke="#E5C573" stroke-width="1.6"/>' +
        '<circle cx="72" cy="40" r="9.5" fill="#FFF7D6" stroke="#E5C573" stroke-width="1.6"/>' +
        '<circle cx="48" cy="48" r="8" fill="#FFFDF2"/><circle cx="64" cy="47" r="8" fill="#FFF7D6"/></g>' +
        '<path d="M30 48 H90 L82 104 H38 Z" fill="#FFFDF8" stroke="#C4303A" stroke-width="2"/>' +
        '<path d="M40 48 L45 104 H55 L52 48 Z M68 48 L65 104 H75 L80 48 Z" fill="#D7263D"/>' +
        '<rect x="44" y="68" width="32" height="16" rx="3" fill="#F2C46D" stroke="#B6822A" stroke-width="1.4"/>' +
        '<circle cx="60" cy="76" r="3" fill="#A61E2A"/></svg>'
    },
    helado: {
      nombre: 'Helado',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-spark" fill="#E6B24C"><path d="M24 34l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M95 44l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>' +
        '<g class="o-sway"><path d="M42 62 H78 L60 110 Z" fill="#E0A96D" stroke="#B37A3E" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M47 72 L71 78 M52 86 L67 90 M66 64 L54 96" stroke="#B37A3E" stroke-width="1.4" opacity=".55"/>' +
        '<circle cx="52" cy="52" r="16" fill="#9ED4A8" stroke="#6FA87A" stroke-width="1.6"/>' +
        '<circle cx="68" cy="52" r="16" fill="#F7E7C4" stroke="#D1BA8E" stroke-width="1.6"/>' +
        '<circle cx="60" cy="34" r="17" fill="#F497A9" stroke="#D46A80" stroke-width="1.6"/>' +
        '<rect x="52" y="28" width="5" height="2.4" rx="1.2" transform="rotate(-20 54 29)" fill="#FFF"/>' +
        '<rect x="64" y="32" width="5" height="2.4" rx="1.2" transform="rotate(25 66 33)" fill="#F2C46D"/>' +
        '<circle cx="60" cy="17" r="5" fill="#D7263D"/></g></svg>'
    },
    vino: {
      nombre: 'Vino / Brindis',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-spark" fill="#E6B24C"><path d="M60 14l2.2 5.5 5.5 2.2-5.5 2.2-2.2 5.5-2.2-5.5-5.5-2.2 5.5-2.2z"/></g>' +
        '<g class="o-clink-l"><path d="M24 34 H52 L49 58 C48 68, 28 68, 27 58 Z" fill="#FFFDF8" stroke="#9AA8B8" stroke-width="2"/>' +
        '<path d="M26 48 H50 L49 58 C48 67, 28 67, 27 58 Z" fill="#A61E2A"/>' +
        '<path d="M38 66 V98 M28 98 H48" stroke="#9AA8B8" stroke-width="2.4" stroke-linecap="round"/></g>' +
        '<g class="o-clink-r"><path d="M68 34 H96 L93 58 C92 68, 72 68, 71 58 Z" fill="#FFFDF8" stroke="#9AA8B8" stroke-width="2"/>' +
        '<path d="M70 48 H94 L93 58 C92 67, 72 67, 71 58 Z" fill="#A61E2A"/>' +
        '<path d="M82 66 V98 M72 98 H92" stroke="#9AA8B8" stroke-width="2.4" stroke-linecap="round"/></g></svg>'
    },
    flores: {
      nombre: 'Flores',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-sway">' +
        '<path d="M44 46 L56 84 M60 36 V84 M76 46 L64 84" stroke="#3B8C5A" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="43" cy="60" rx="10" ry="5" transform="rotate(-35 43 60)" fill="#4EA36E"/>' +
        '<ellipse cx="77" cy="60" rx="10" ry="5" transform="rotate(35 77 60)" fill="#4EA36E"/>' +
        '<path d="M36 46 C36 32, 52 32, 52 46 C52 54, 36 54, 36 46 Z" fill="#F2849E"/>' +
        '<path d="M68 46 C68 32, 84 32, 84 46 C84 54, 68 54, 68 46 Z" fill="#F2849E"/>' +
        '<path d="M50 36 C50 20, 70 20, 70 36 C70 46, 50 46, 50 36 Z" fill="#D7263D"/>' +
        '<path d="M40 66 H80 L68 106 H52 Z" fill="#E5CBA8" stroke="#C19E72" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M46 80 H74" stroke="#D7263D" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="60" cy="80" r="4" fill="#F2C46D"/></g></svg>'
    },
    masaje: {
      nombre: 'Masaje / Spa',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-steam" fill="none" stroke="#9BB7A2" stroke-width="2" stroke-linecap="round">' +
        '<path d="M30 46 Q26 36 32 26"/><path d="M90 46 Q86 36 92 26"/></g>' +
        '<ellipse cx="60" cy="98" rx="44" ry="8" fill="#E3D7C4"/>' +
        '<rect x="44" y="54" width="32" height="44" rx="5" fill="#FFFDF8" stroke="#D5C4A8" stroke-width="2"/>' +
        '<path d="M44 64 Q54 70 60 64 Q68 72 76 62" fill="none" stroke="#F0E3CC" stroke-width="3"/>' +
        '<path d="M60 48 V54" stroke="#4A3828" stroke-width="2"/>' +
        '<path class="o-flame" d="M60 22 C67 34, 68 44, 60 48 C52 44, 53 34, 60 22 Z" fill="#F6A623"/>' +
        '<path class="o-flame" d="M60 30 C64 38, 64 44, 60 47 C56 44, 56 38, 60 30 Z" fill="#FFF3B0"/>' +
        '<ellipse cx="30" cy="92" rx="14" ry="7" fill="#7D8C85"/><ellipse cx="32" cy="83" rx="10" ry="5.5" fill="#95A69E"/>' +
        '<ellipse cx="90" cy="92" rx="13" ry="6.5" fill="#8C9C94"/></svg>'
    },
    viaje: {
      nombre: 'Escapada / Viaje',
      svg: '<svg viewBox="0 0 120 120" aria-hidden="true">' +
        '<g class="o-plane"><path d="M20 34 L52 22 L38 40 L34 32 Z" fill="#FFFFFF" stroke="#8FA6C2" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<path d="M10 42 Q20 38 28 36" fill="none" stroke="#C99A5B" stroke-width="1.6" stroke-dasharray="3 3"/></g>' +
        '<g class="o-bob"><path d="M48 48 V40 Q48 36 52 36 H68 Q72 36 72 40 V48" fill="none" stroke="#8A542B" stroke-width="3.5"/>' +
        '<rect x="26" y="48" width="68" height="50" rx="9" fill="#C9415E" stroke="#92263E" stroke-width="2.2"/>' +
        '<path d="M40 48 V98 M80 48 V98" stroke="#F2C46D" stroke-width="4"/>' +
        '<path d="M60 79s-7-4.5-7-9.5a3.8 3.8 0 0 1 7-2.4A3.8 3.8 0 0 1 67 69.5c0 5-7 9.5-7 9.5z" fill="#FFFDF8"/></g></svg>'
    }
  };

  function fmtTiempo(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function cancionHTML(c, resolver) {
    if (!c || (!c.titulo && !c.artista && !c.audio && !c.enlace && !c.portada)) return '';
    var cov = c.portada ? (resolver ? resolver(c.portada) : c.portada) : '';
    var audioSrc = c.audio ? (resolver ? resolver(c.audio) : c.audio) : '';
    var h = '<div class="adv-song" data-audio="' + esc(audioSrc) + '">' +
      '<div class="adv-song-top">' +
      '<div class="adv-vinyl-wrap">' +
        '<div class="adv-vinyl"><div class="adv-vinyl-lbl">' + (cov ? '<img src="' + esc(cov) + '" alt="">' : '') + '</div></div>' +
        '<div class="adv-cover">' + (cov ? '<img src="' + esc(cov) + '" alt="">' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>') + '</div>' +
      '</div>' +
      '<div class="adv-song-info">' +
        (c.titulo ? '<p class="adv-song-t">' + esc(c.titulo) + '</p>' : '') +
        (c.artista ? '<p class="adv-song-a">' + esc(c.artista) + '</p>' : '') +
        '<div class="adv-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '</div></div>';
    if (audioSrc) {
      h += '<div class="adv-song-ctl">' +
        '<button type="button" class="adv-play" aria-label="' + T.reproducir + '">' +
          '<svg class="ic-play" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>' +
          '<svg class="ic-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" rx="1"/><rect x="13.5" y="4" width="4.5" height="16" rx="1"/></svg>' +
        '</button>' +
        '<input type="range" class="adv-seek" min="0" max="100" value="0" aria-label="Progreso">' +
        '<span class="adv-time">0:00</span>' +
      '</div>';
    }
    if (c.enlace) {
      var lbl = c.enlace.indexOf('spotify.com') >= 0 ? 'Spotify' : (c.enlace.indexOf('youtu') >= 0 ? 'YouTube' : (c.enlace.indexOf('apple.com') >= 0 ? 'Apple Music' : T.escucharEn));
      h += '<a class="adv-song-link" href="' + esc(c.enlace) + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
        '<span>' + esc(lbl) + '</span></a>';
    }
    return h + '</div>';
  }

  function contenidoHTML(d, cfg, resolver) {
    var t = d.tipo || 'mensaje', h = '';
    var etiqueta = d.etiqueta != null && d.etiqueta !== '' ? d.etiqueta : (T.etiquetas[t] || '');
    var img = d.imagen ? (resolver ? resolver(d.imagen) : d.imagen) : '';
    if (etiqueta) h += '<p class="adv-label">' + esc(etiqueta) + '</p>';
    if (d.objeto && OBJETOS[d.objeto] && OBJETOS[d.objeto].svg) {
      h += '<div class="adv-obj obj-' + esc(d.objeto) + '" aria-hidden="true">' + OBJETOS[d.objeto].svg + '</div>';
    }
    if (d.cancion) h += cancionHTML(d.cancion, resolver);
    if (t === 'foto' || img) {
      h += img ? '<img class="adv-img" src="' + esc(img) + '" alt="' + esc(d.titulo || T.fotoDel(d.n)) + '">' : '<div class="adv-ph">' + T.fotoAqui + '</div>';
    }
    if (d.titulo) h += '<p class="adv-h">' + esc(d.titulo) + '</p>';
    if (d.texto) h += '<p class="adv-text">' + esc(d.texto) + '</p>';
    if (t === 'mensaje' && (d.firma || cfg.firma)) h += '<p class="adv-sign">— ' + esc(d.firma || cfg.firma) + '</p>';
    if (t === 'vale') {
      if (d.enlace) h += '<a class="adv-btn" href="' + esc(d.enlace) + '" target="_blank" rel="noopener">' + esc(d.boton || T.abrir) + '</a>';
      h += '<button type="button" class="adv-btn adv-btn-vale" data-vale><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg><span>' + esc((!d.enlace && d.boton) ? d.boton : T.guardarVale) + '</span></button>';
    } else if (d.enlace) h += '<a class="adv-btn" href="' + esc(d.enlace) + '" target="_blank" rel="noopener">' + esc(d.boton || T.abrir) + '</a>';
    else if (d.boton) h += '<button type="button" class="adv-btn" data-close>' + esc(d.boton) + '</button>';
    if (!h) h = '<p class="adv-text" style="color:#8A8172">' + T.vacio + '</p>';
    return h;
  }

  /* ---------- Estallido de partículas ---------- */
  var PARTICULAS = {
    confeti: function (i) {
      var c = ['#E8475A', '#F2C46D', '#4FD1C5', '#FFFFFF', '#2F9E6A', '#FF8FB1'][i % 6];
      return '<i style="display:block;width:' + (5 + i % 4) + 'px;height:' + (8 + i % 5) + 'px;background:' + c + ';border-radius:1px"></i>';
    },
    corazones: function (i) { return heart(10 + (i % 4) * 3, ['#E8475A', '#FF8FA3', '#FFC2CC', '#C9415E'][i % 4]); },
    estrellas: function (i) { return '<svg width="' + (10 + (i % 4) * 3) + '" height="' + (10 + (i % 4) * 3) + '" viewBox="0 0 24 24" fill="' + ['#F2C46D', '#FFE3A3', '#FFFFFF'][i % 3] + '">' + STAR + '</svg>'; },
    copos: function (i) { return '<svg width="' + (10 + (i % 3) * 4) + '" height="' + (10 + (i % 3) * 4) + '" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/></svg>'; }
  };
  function estallido(root, btn, tipo) {
    if (!tipo || tipo === 'ninguno') return;
    var r = root.getBoundingClientRect(), b = btn.getBoundingClientRect();
    var k = r.width / root.offsetWidth || 1;
    var cx = (b.left - r.left + b.width / 2) / k, cy = (b.top - r.top + b.height / 2) / k;
    var wrap = document.createElement('div');
    wrap.className = 'adv-burst';
    wrap.style.left = cx + 'px'; wrap.style.top = cy + 'px';
    var tipos = tipo === 'mezcla' ? ['confeti', 'corazones', 'estrellas', 'copos'] : [tipo];
    var h = '', n = 26;
    for (var i = 0; i < n; i++) {
      var ang = (i / n) * Math.PI * 2 + Math.random() * .4, dist = 60 + Math.random() * 90;
      var fn = PARTICULAS[tipos[i % tipos.length]] || PARTICULAS.confeti;
      h += '<span style="--x:' + (Math.cos(ang) * dist).toFixed(0) + 'px;--y:' + (Math.sin(ang) * dist + 40).toFixed(0) + 'px;--r:' + Math.round(Math.random() * 540 - 270) + 'deg;--d:' + (Math.random() * .12).toFixed(2) + 's">' + fn(i) + '</span>';
    }
    wrap.innerHTML = h;
    root.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 1600);
  }

  /* ---------- Escenas al abrir ---------- */
  var ESCENAS = { beso: 'Beso de Papá Noel', elfo: 'Elfo con regalo', calcetin: 'Calcetín de regalos', carta: 'Carta de amor', bola_nieve: 'Bola de nieve', fuegos: 'Fuegos artificiales', arbol: 'Árbol de Navidad', gatito: 'Gatito en caja', muerdago: 'Muérdago' };
  var BOWSM = '<svg viewBox="0 0 36 18" aria-hidden="true"><path d="M18 14C13 2 3 1 4 9s10 5 14 5zM18 14c5-12 15-13 14-5s-10 5-14 5z" fill="#F2C46D"/><circle cx="18" cy="14" r="3.2" fill="#C99A3A"/></svg>';
  function regaloHTML(extra, estilo) {
    return '<div class="sc-gift ' + (extra || '') + '"' + (estilo ? ' style="' + estilo + '"' : '') + '><div class="bx"></div><div class="lid">' + BOWSM + '</div></div>';
  }
  var SANTA_CARA = '<svg viewBox="0 0 220 240" aria-hidden="true">' +
    '<path d="M14 240 Q24 172 110 166 Q196 172 206 240Z" fill="#C8302E"/><rect x="100" y="172" width="20" height="68" fill="#F7F4EE"/>' +
    '<circle cx="66" cy="104" r="15" fill="#F7F4EE"/><circle cx="154" cy="104" r="15" fill="#F7F4EE"/>' +
    '<circle cx="110" cy="102" r="43" fill="#F6CBA9"/>' +
    '<path d="M56 108 Q48 152 70 178 Q86 204 110 208 Q134 204 150 178 Q172 152 164 108 Q150 134 110 136 Q70 134 56 108Z" fill="#F7F4EE"/>' +
    '<path d="M64 80 Q76 22 130 26 Q174 32 186 92 L172 98 Q164 62 142 56 Q152 70 156 80Z" fill="#C8302E"/>' +
    '<rect x="56" y="68" width="108" height="24" rx="12" fill="#F7F4EE"/><circle cx="180" cy="100" r="12" fill="#F7F4EE"/>' +
    '<path d="M84 86 q8 -5 16 0 M120 86 q8 -5 16 0" stroke="#F7F4EE" stroke-width="5" stroke-linecap="round" fill="none"/>' +
    '<path d="M88 98 q6 -6 12 0" stroke="#3A2416" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
    '<ellipse class="wink" cx="127" cy="97" rx="4" ry="4.4" fill="#3A2416"/>' +
    '<circle cx="84" cy="114" r="8" fill="#F29A9A" opacity=".7"/><circle cx="136" cy="114" r="8" fill="#F29A9A" opacity=".7"/>' +
    '<circle cx="110" cy="114" r="8" fill="#EE9C8C"/>' +
    '<path d="M110 122 Q96 114 80 124 Q90 136 110 127Z M110 122 Q124 114 140 124 Q130 136 110 127Z" fill="#fff"/>' +
    '<ellipse class="mouth" cx="110" cy="136" rx="6" ry="5" fill="#B5303D"/></svg>';
  var ELFO = '<svg viewBox="0 0 130 200" aria-hidden="true"><defs><pattern id="advelfst" width="12" height="8" patternUnits="userSpaceOnUse"><rect width="12" height="4" fill="#D7263D"/><rect y="4" width="12" height="4" fill="#fff"/></pattern></defs>' +
    '<rect x="42" y="148" width="12" height="36" fill="url(#advelfst)"/><rect x="62" y="148" width="12" height="36" fill="url(#advelfst)"/>' +
    '<path d="M38 182 L58 182 Q70 182 74 172 Q78 186 60 191 L38 191Z" fill="#2F7A4D"/><path d="M58 182 L78 182 Q90 182 94 172 Q98 186 80 191 L58 191Z" fill="#2F7A4D"/>' +
    '<path d="M30 154 L42 96 L80 96 L92 154 Q61 162 30 154Z" fill="#2F9E6A"/><rect x="36" y="128" width="52" height="8" fill="#3B2A1A"/><rect x="56" y="126" width="12" height="12" rx="2" fill="none" stroke="#F2C46D" stroke-width="2.5"/>' +
    '<path d="M48 104 Q72 118 100 126 L98 134 Q66 128 44 114Z" fill="#279058"/><circle cx="101" cy="130" r="6" fill="#F6CBA9"/>' +
    '<path d="M74 102 Q98 108 112 118 L108 126 Q92 118 74 114Z" fill="#2F9E6A"/><circle cx="111" cy="122" r="6" fill="#F6CBA9"/>' +
    '<path d="M40 98 l7 8 l7 -8 l7 8 l7 -8 l7 8 l7 -8 l2 -6 L40 92Z" fill="#D7263D"/>' +
    '<circle cx="62" cy="74" r="20" fill="#F6CBA9"/><path d="M80 70 L98 60 L83 82Z" fill="#F6CBA9"/>' +
    '<circle cx="58" cy="72" r="2.6" fill="#2B1608"/><circle cx="71" cy="72" r="2.6" fill="#2B1608"/><path d="M58 82 q7 6 14 0" stroke="#A0402E" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="52" cy="80" r="4" fill="#F29A9A" opacity=".7"/><circle cx="77" cy="80" r="4" fill="#F29A9A" opacity=".7"/>' +
    '<path d="M42 62 Q50 30 80 20 Q102 14 112 36 Q98 26 86 36 Q88 48 84 60Z" fill="#2F9E6A"/><rect x="38" y="54" width="50" height="11" rx="5.5" fill="#D7263D"/><circle cx="112" cy="38" r="6" fill="#F2C46D"/></svg>';
  var CALCETIN = '<svg viewBox="0 -90 120 260" aria-hidden="true"><path d="M50 -90 V6" stroke="#C9B79A" stroke-width="2"/><circle cx="50" cy="-90" r="4" fill="#C9B79A"/>' +
    '<rect x="22" y="-6" width="20" height="18" rx="2" fill="#2F9E6A"/><rect x="44" y="-14" width="18" height="26" rx="2" fill="#F2C46D"/><rect x="62" y="-4" width="18" height="16" rx="2" fill="#4C6FD1"/>' +
    '<path d="M20 30 L20 112 Q20 152 58 156 L96 156 Q120 152 118 130 Q116 110 92 108 L80 106 L80 30Z" fill="#C8302E"/>' +
    '<path d="M20 64 H80 V74 H20Z M20 90 H80 V98 H20Z" fill="#2F7A4D"/>' +
    '<path d="M96 156 Q120 152 118 130 Q116 116 102 112 Q108 130 96 156Z" fill="#F4EAD6"/>' +
    '<rect x="12" y="6" width="76" height="30" rx="14" fill="#F7F4EE"/><circle cx="20" cy="12" r="6" fill="#F7F4EE"/><circle cx="80" cy="12" r="6" fill="#F7F4EE"/>' +
    '<path d="M40 22 c-4-6 4-10 6-4 c2-6 10-2 6 4 l-6 6z" fill="#E8475A"/></svg>';

  var GLOBO_NIEVE = '<svg viewBox="0 0 200 220" aria-hidden="true">' +
    '<defs><clipPath id="adv-sgc"><circle cx="100" cy="96" r="74"/></clipPath></defs>' +
    '<circle cx="100" cy="96" r="76" fill="#163554" stroke="#CFE5F5" stroke-width="4"/>' +
    '<g clip-path="url(#adv-sgc)">' +
    '<ellipse cx="100" cy="158" rx="76" ry="26" fill="#F2F7FB"/>' +
    '<path d="M52 146 L68 106 L84 146 Z M56 128 L68 96 L80 128 Z" fill="#1F6E4A"/>' +
    '<rect x="104" y="114" width="38" height="30" rx="2" fill="#B83B3B"/>' +
    '<path d="M98 116 L123 94 L148 116 Z" fill="#F7F4EE"/>' +
    '<rect class="win" x="117" y="124" width="12" height="12" rx="2" fill="#FFE082"/>' +
    '<g class="flk" fill="#FFFFFF">' +
    '<circle cx="52" cy="58" r="2.6"/><circle cx="88" cy="48" r="2.2"/><circle cx="134" cy="62" r="2.8"/>' +
    '<circle cx="72" cy="84" r="2"/><circle cx="112" cy="76" r="2.5"/><circle cx="148" cy="94" r="2.2"/>' +
    '<circle cx="46" cy="102" r="2"/><circle cx="96" cy="106" r="2.6"/><circle cx="128" cy="44" r="2"/></g></g>' +
    '<path d="M52 54 A58 58 0 0 1 92 34" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".45"/>' +
    '<path d="M46 164 H154 L164 196 Q164 204 154 204 H46 Q36 204 36 196 Z" fill="#7D4427" stroke="#592E18" stroke-width="2.5"/>' +
    '<rect x="74" y="176" width="52" height="14" rx="4" fill="#F2C46D"/></svg>';
  var ARBOL_SVG = '<svg viewBox="0 0 200 240" aria-hidden="true">' +
    '<rect x="86" y="196" width="28" height="32" rx="4" fill="#7D4427"/>' +
    '<path d="M24 200 L100 120 L176 200 Z" fill="#185C3D"/>' +
    '<path d="M36 156 L100 84 L164 156 Z" fill="#1F734C"/>' +
    '<path d="M52 114 L100 50 L148 114 Z" fill="#288B5D"/>' +
    '<path d="M54 146 Q100 166 154 142 M42 186 Q100 206 164 182 M64 108 Q100 122 138 104" fill="none" stroke="#F2C46D" stroke-width="2.5" stroke-dasharray="6 6" opacity=".85"/>' +
    '<g class="baub">' +
    '<circle cx="78" cy="102" r="6" fill="#E8475A"/><circle cx="120" cy="104" r="5.5" fill="#F2C46D"/>' +
    '<circle cx="66" cy="144" r="6.5" fill="#4FD1C5"/><circle cx="102" cy="138" r="6" fill="#E8475A"/><circle cx="136" cy="146" r="6" fill="#FF8FB1"/>' +
    '<circle cx="52" cy="186" r="7" fill="#F2C46D"/><circle cx="90" cy="180" r="6.5" fill="#FF8FB1"/><circle cx="126" cy="184" r="7" fill="#4FD1C5"/><circle cx="152" cy="190" r="6" fill="#E8475A"/></g></svg>';
  var GATITO_SVG = '<svg viewBox="0 0 140 120" aria-hidden="true">' +
    '<g class="kears"><path d="M34 54 L26 20 L56 36 Z" fill="#F4C08A" stroke="#D1945A" stroke-width="2" stroke-linejoin="round"/><path d="M34 46 L31 28 L48 38 Z" fill="#F7A8B8"/>' +
    '<path d="M106 54 L114 20 L84 36 Z" fill="#F4C08A" stroke="#D1945A" stroke-width="2" stroke-linejoin="round"/><path d="M106 46 L109 28 L92 38 Z" fill="#F7A8B8"/></g>' +
    '<ellipse cx="70" cy="68" rx="44" ry="38" fill="#F4C08A" stroke="#D1945A" stroke-width="2"/>' +
    '<path d="M62 32 V44 M70 30 V46 M78 32 V44" stroke="#D1945A" stroke-width="3" stroke-linecap="round"/>' +
    '<g class="keyes"><circle cx="53" cy="66" r="5.2" fill="#231812"/><circle cx="87" cy="66" r="5.2" fill="#231812"/><circle cx="51.5" cy="64.5" r="1.8" fill="#FFF"/><circle cx="85.5" cy="64.5" r="1.8" fill="#FFF"/></g>' +
    '<circle cx="42" cy="76" r="6" fill="#F48A9A" opacity=".55"/><circle cx="98" cy="76" r="6" fill="#F48A9A" opacity=".55"/>' +
    '<path d="M66 74 H74 L70 79 Z" fill="#E86A7E"/>' +
    '<path d="M62 82 Q66 86 70 81 Q74 86 78 82" fill="none" stroke="#5A3825" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M22 72 L38 74 M20 80 L38 80 M118 72 L102 74 M120 80 L102 80" stroke="#8C6244" stroke-width="1.8" stroke-linecap="round"/>' +
    '<ellipse cx="44" cy="102" rx="11" ry="8" fill="#FFF4E6" stroke="#D1945A" stroke-width="1.8"/>' +
    '<ellipse cx="96" cy="102" rx="11" ry="8" fill="#FFF4E6" stroke="#D1945A" stroke-width="1.8"/></svg>';
  var MUERDAGO_SVG = '<svg viewBox="0 0 180 180" aria-hidden="true">' +
    '<path d="M90 0 V46" stroke="#F2C46D" stroke-width="2.5"/>' +
    '<g fill="#2F7A4D" stroke="#1E5434" stroke-width="1.8">' +
    '<path d="M90 56 C62 66, 36 86, 30 116 C54 114, 78 96, 90 74 Z"/>' +
    '<path d="M90 56 C118 66, 144 86, 150 116 C126 114, 102 96, 90 74 Z"/>' +
    '<path d="M90 66 C74 96, 70 126, 76 150 C90 134, 96 106, 90 66 Z"/>' +
    '<path d="M90 66 C106 96, 110 126, 104 150 C90 134, 84 106, 90 66 Z"/></g>' +
    '<g fill="#FFFDF8" stroke="#D9E2EC" stroke-width="1.5">' +
    '<circle cx="80" cy="96" r="7"/><circle cx="100" cy="96" r="7"/><circle cx="90" cy="108" r="7.5"/></g>' +
    '<path d="M90 54 C70 30, 44 34, 52 54 C60 66, 80 60, 90 54 Z M90 54 C110 30, 136 34, 128 54 C120 66, 100 60, 90 54 Z" fill="#D7263D"/>' +
    '<path d="M84 56 L70 84 M96 56 L110 84" stroke="#D7263D" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="90" cy="54" r="7" fill="#B31B2E"/></svg>';

  function escenaHTML(tipo) {
    var h = '', i;
    var corazon = function (c) { return heart(44, c || '#E8475A'); };
    switch (tipo) {
      case 'beso':
        h = '<div class="santa">' + SANTA_CARA + '</div><div class="kiss">' + corazon() + '</div><div class="sc-word muac">' + T.muac + '</div>';
        for (i = 0; i < 7; i++) h += '<div class="mini" style="left:140px;top:266px;--x:' + Math.round(Math.cos(i) * 120) + 'px;--y:' + Math.round(-60 - Math.random() * 100) + 'px;animation-delay:' + (1.4 + i * .08).toFixed(2) + 's">' + heart(16, ['#FF8FA3', '#E8475A', '#FFC2CC'][i % 3]) + '</div>';
        return h;
      case 'elfo':
        return '<div class="sc-word para">' + T.paraTi + '</div><div class="elf">' + ELFO + '</div><div class="gw"><div class="gift">' + regaloHTML() + '<div class="glow"></div></div></div>';
      case 'calcetin':
        h = '<div class="drop"><div class="swing">' + CALCETIN;
        var pos = [[-70, -40, 1, -20, 'g2'], [70, -60, 1.1, 18, ''], [-30, -110, .9, 8, 'g3'], [40, -130, .95, -14, 'g4'], [0, -80, 1.15, 4, '']];
        pos.forEach(function (p, k) {
          h += '<div class="pg" style="--x:' + p[0] + 'px;--y:' + p[1] + 'px;--s:' + p[2] + ';--r:' + p[3] + 'deg;--d:' + (1.15 + k * .14).toFixed(2) + 's">' + regaloHTML(p[4]) + '</div>';
        });
        for (i = 0; i < 6; i++) h += '<div class="star" style="left:50px;top:0;--x:' + Math.round(Math.cos(i * 1.1) * 110) + 'px;--y:' + Math.round(-40 - Math.random() * 120) + 'px;--d:' + (1.2 + i * .1).toFixed(2) + 's;animation-delay:var(--d)"><svg width="18" height="18" viewBox="0 0 24 24" fill="#F2C46D">' + STAR + '</svg></div>';
        return h + '</div></div><div class="sc-word lleno">' + T.lleno + '</div>';
      case 'carta':
        h = '<div class="env"><div class="back"></div><div class="letter"><b>' + T.carta + '</b><i></i><i></i><i style="width:70px"></i>' + heart(18, '#E8475A') + '</div>' +
          '<svg class="front" viewBox="0 0 200 130" aria-hidden="true"><path d="M0 4 L100 74 L200 4 V124 Q200 130 194 130 H6 Q0 130 0 124Z" fill="#EADBC0"/><path d="M0 130 L92 66 M200 130 L108 66" stroke="#D3BE9A" stroke-width="1.5"/></svg>' +
          '<div class="flap"><svg viewBox="0 0 200 80" aria-hidden="true"><path d="M0 0 H200 L106 74 Q100 78 94 74Z" fill="#DCC6A1"/></svg></div>' +
          '<div class="seal">' + heart(16, '#FFD9DF') + '</div></div>';
        for (i = 0; i < 8; i++) h += '<div class="mini" style="left:150px;top:110px;--x:' + Math.round(Math.cos(i * .8) * 130) + 'px;--y:' + Math.round(-30 - Math.random() * 110) + 'px;--d:' + (1.55 + i * .07).toFixed(2) + 's">' + heart(16, ['#FF8FA3', '#E8475A', '#FFC2CC'][i % 3]) + '</div>';
        return h;
      case 'bola_nieve':
        h = '<div class="sg-wrap">' + GLOBO_NIEVE + '</div><div class="sc-word magia">' + T.magia + '</div>';
        for (i = 0; i < 8; i++) h += '<div class="sg-star" style="left:142px;top:140px;--x:' + Math.round(Math.cos(i * .8) * 125) + 'px;--y:' + Math.round(Math.sin(i * .8) * 115 - 20) + 'px;--d:' + (1.2 + i * .08).toFixed(2) + 's"><svg width="16" height="16" viewBox="0 0 24 24" fill="#FFE3A3">' + STAR + '</svg></div>';
        return h;
      case 'fuegos':
        var fws = [[80, 110, '#F2C46D', .2], [215, 85, '#FF8FA3', .75], [150, 165, '#4FD1C5', 1.3]];
        fws.forEach(function (fw) {
          h += '<div class="fw" style="left:' + fw[0] + 'px;top:' + fw[1] + 'px;--c:' + fw[2] + ';--d:' + fw[3] + 's">';
          for (var j = 0; j < 12; j++) {
            var a = (j / 12) * Math.PI * 2, dist = 54 + (j % 2) * 24;
            h += '<i style="--x:' + Math.round(Math.cos(a) * dist) + 'px;--y:' + Math.round(Math.sin(a) * dist) + 'px"></i>';
          }
          h += '</div>';
        });
        return h + '<div class="sc-word fww">' + T.sorpresa + '</div>';
      case 'arbol':
        return '<div class="tr-wrap">' + ARBOL_SVG + '</div><div class="tr-star"><svg width="46" height="46" viewBox="0 0 24 24" fill="#F2C46D">' + STAR + '</svg></div><div class="sc-word trw">' + T.feliz + '</div>';
      case 'gatito':
        h = '<div class="kt-box"><div class="kt-cat">' + GATITO_SVG + '</div><div class="bx"></div><div class="lid">' + BOWSM + '</div></div><div class="sc-word ktw">' + T.miau + '</div>';
        for (i = 0; i < 6; i++) h += '<div class="mini" style="left:142px;top:150px;--x:' + Math.round(Math.cos(i * 1.1) * 110) + 'px;--y:' + Math.round(-40 - Math.random() * 100) + 'px;animation-delay:' + (1.35 + i * .1).toFixed(2) + 's">' + heart(16, ['#FF8FA3', '#E8475A', '#FFC2CC'][i % 3]) + '</div>';
        return h;
      case 'muerdago':
        h = '<div class="md-wrap">' + MUERDAGO_SVG + '</div><div class="sc-word mdw">' + T.besito + '</div>';
        for (i = 0; i < 8; i++) h += '<div class="mini" style="left:142px;top:160px;--x:' + Math.round((Math.random() - .5) * 180) + 'px;--y:' + Math.round(30 + Math.random() * 110) + 'px;animation-delay:' + (.9 + i * .12).toFixed(2) + 's">' + heart(18, ['#E8475A', '#FF8FA3', '#FFC2CC'][i % 3]) + '</div>';
        return h;
    }
    return '';
  }
  var DURACION_ESCENA = { beso: 3000, elfo: 3300, calcetin: 3100, carta: 3100, bola_nieve: 3300, fuegos: 3100, arbol: 3300, gatito: 3200, muerdago: 3000 };
  function escena(root, tipo, alTerminar) {
    if (tipo === 'azar') { var ks = Object.keys(ESCENAS); tipo = ks[Math.floor(Math.random() * ks.length)]; }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ESCENAS[tipo] || reduce) { alTerminar(); return; }
    var el = document.createElement('div');
    el.className = 'adv-scene sc-' + tipo;
    el.innerHTML = '<div class="adv-stage">' + escenaHTML(tipo) + '<p class="sc-skip">' + T.saltar + '</p></div>';
    root.appendChild(el);
    var hecho = false, tg, tb;
    function fin() {
      if (hecho) return; hecho = true;
      clearTimeout(tg); clearTimeout(tb);
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 280);
      alTerminar();
    }
    el.addEventListener('click', fin);
    if (tipo === 'elfo') tb = setTimeout(function () { var g = el.querySelector('.gift'); if (g) estallido(root, g, 'mezcla'); }, 2100);
    tg = setTimeout(fin, DURACION_ESCENA[tipo]);
  }

  /* Abre una puerta con su animación y su efecto; después muestra el contenido */
  function abrir(root, btn, d, cfg, resolver, alCerrar) {
    var anim = APERTURAS[d.apertura] ? d.apertura : (APERTURAS[cfg.apertura] ? cfg.apertura : 'bisagra');
    var efecto = d.efecto || cfg.efecto || 'ninguno';
    var esc = d.escena || cfg.escena || 'ninguna';
    var ya = btn.classList.contains('open');
    if (!ya) {
      btn.classList.remove('ready', 'today', 'locked');
      void btn.offsetWidth;
      btn.classList.add('open');
      setTimeout(function () { estallido(root, btn, efecto); }, anim === 'explotar' ? 220 : 350);
    }
    var mostrar = function () { hoja(root, d, cfg, resolver, alCerrar); };
    setTimeout(function () {
      if (!ya && esc !== 'ninguna') escena(root, esc, mostrar); else mostrar();
    }, ya ? 0 : (esc !== 'ninguna' ? 850 : 1000));
  }

  /* ---------- Sorpresas animadas ---------- */
  function reno(x, rudolph) {
    return '<g transform="translate(' + x + ',0)">' +
      '<ellipse cx="0" cy="40" rx="12" ry="5.5"/><path d="M8 37 L14 27 L20 25.5 L21.5 28.5 L16 31 L11 40Z"/>' +
      '<path d="M-8 43 l-7 6 M-5 44 l-3 8 M6 43 l7 5 M9 43 l3 8 M-11 38 l-4 -3" stroke="#F2C46D" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
      '<path d="M15 26 l-3 -7 m1.4 3.2 l-4.5 -2 M18 25.5 l1 -7 m-.4 3.4 l3.5 -3" stroke="#F2C46D" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
      (rudolph ? '<circle class="nose" cx="22" cy="28" r="2.6" fill="#FF3B3B" style="filter:drop-shadow(0 0 4px #FF3B3B)"/>' : '') + '</g>';
  }
  var SANTA = '<svg viewBox="0 0 240 80" aria-hidden="true"><g fill="#F2C46D">' +
    '<g class="trail" fill="#FFE3A3"><circle cx="6" cy="44" r="1.5"/><circle cx="14" cy="38" r="2"/><circle cx="22" cy="46" r="1.4"/><circle cx="28" cy="40" r="1.8"/><circle cx="2" cy="36" r="1.2"/></g>' +
    '<circle cx="50" cy="28" r="10"/>' +
    '<path d="M38 44 Q35 30 50 30 L80 30 Q86 30 88 38 L90 50 Q78 54 58 54 Q42 54 38 44Z"/>' +
    '<circle cx="70" cy="24" r="9"/><circle cx="75" cy="13" r="5.5"/><path d="M70 10 Q77 0 86 6 L82 9.5Z"/><circle cx="87" cy="6" r="2.3"/>' +
    '<path d="M32 60 Q30 53 37 53 M37 60 L92 60 Q102 60 104 51 M48 54 L46 60 M82 54 L84 60" stroke="#F2C46D" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<path d="M90 42 Q130 30 160 38 Q190 30 222 36" stroke="#F2C46D" stroke-width="1" fill="none" opacity=".8"/>' +
    reno(140, false) + reno(176, false) + reno(212, true) + '</g></svg>';
  var SPLAT = '<svg viewBox="0 0 360 340" aria-hidden="true"><path fill="#F6FAFD" d="M180 40c26 0 30 34 52 30s30-34 52-14-6 42 10 58 48 4 50 30-36 26-34 48 30 34 14 54-42-6-56 10 4 50-26 54-30-30-52-28-30 38-54 26-6-44-26-54-52 12-58-14 28-34 18-54-46-16-38-42 46-10 50-32-26-44-2-58 38 14 54 2-4-48 28-54 28 16 50 16z"/>' +
    '<g fill="#F6FAFD"><circle cx="40" cy="60" r="9"/><circle cx="320" cy="44" r="7"/><circle cx="338" cy="290" r="10"/><circle cx="26" cy="300" r="6"/><circle cx="300" cy="320" r="5"/><circle cx="70" cy="20" r="4"/></g>' +
    '<path fill="#DCEAF3" d="M120 150c20-30 80-40 120-10" stroke="none" opacity=".6"/></svg>';
  var GINGER = '<svg viewBox="0 0 96 120" aria-hidden="true"><g fill="#B06A33">' +
    '<circle cx="48" cy="26" r="20"/><rect x="28" y="40" width="40" height="44" rx="16"/>' +
    '<rect x="8" y="46" width="30" height="15" rx="7.5" transform="rotate(-18 23 53)"/>' +
    '<g class="arm"><rect x="58" y="46" width="30" height="15" rx="7.5" transform="rotate(18 73 53)"/><path d="M72 49 q3 3 0 6 q-3 3 0 6" transform="rotate(18 73 53)" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
    '<rect x="26" y="72" width="17" height="40" rx="8.5" transform="rotate(8 34 92)"/><rect x="53" y="72" width="17" height="40" rx="8.5" transform="rotate(-8 62 92)"/></g>' +
    '<path d="M20 50 q3 3 0 6 q-3 3 0 6 M28 104 q3 2 6 0 q3 -2 6 0 M56 104 q3 2 6 0 q3 -2 6 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" transform="rotate(-6 48 80)"/>' +
    '<g class="eyes"><circle cx="41" cy="24" r="3" fill="#2B1608"/><circle cx="55" cy="24" r="3" fill="#2B1608"/></g>' +
    '<path d="M39 32 q9 8 18 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="34" cy="31" r="3" fill="#E77" opacity=".55"/><circle cx="62" cy="31" r="3" fill="#E77" opacity=".55"/>' +
    '<circle cx="48" cy="52" r="3.4" fill="#D7263D"/><circle cx="48" cy="63" r="3.4" fill="#2F9E6A"/><circle cx="48" cy="74" r="3.4" fill="#D7263D"/>' +
    '<path d="M32 44 q16 7 32 0" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="3 3"/></svg>';
  var PENG = '<svg viewBox="0 0 130 70" aria-hidden="true">' +
    '<g class="spray" fill="#fff"><circle cx="16" cy="56" r="3"/><circle cx="12" cy="50" r="2.2"/><circle cx="20" cy="48" r="1.8"/></g>' +
    '<g class="body"><path d="M22 52 l-8 -4 l2 8z M24 56 l-9 0 l4 6z" fill="#F29A2E"/>' +
    '<ellipse cx="62" cy="48" rx="42" ry="17" fill="#1B2533" stroke="#8FA6C2" stroke-width="1.5"/><ellipse cx="66" cy="54" rx="34" ry="10" fill="#F4F1EA"/>' +
    '<path d="M40 38 q14 -10 30 -2 q-16 4 -30 2z" fill="#121A24"/>' +
    '<circle cx="102" cy="42" r="15" fill="#1B2533" stroke="#8FA6C2" stroke-width="1.5"/><ellipse cx="106" cy="46" rx="8" ry="7" fill="#F4F1EA"/>' +
    '<path d="M115 42 l11 3 l-11 3z" fill="#F29A2E"/><circle cx="108" cy="38" r="2.4" fill="#fff"/><circle cx="108.6" cy="38.2" r="1.3" fill="#111"/>' +
    '<path d="M86 34 q8 14 10 22 l6 -2 q-4 -10 -2 -18z" fill="#D7263D"/><path d="M84 32 q10 8 22 0 l1 6 q-12 8 -24 0z" fill="#E33A4F"/></g></svg>';

  var COMETA = '<svg viewBox="0 0 180 56" aria-hidden="true">' +
    '<defs><linearGradient id="adv-cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FFE8A3" stop-opacity="0"/><stop offset="70%" stop-color="#F2C46D" stop-opacity=".65"/><stop offset="100%" stop-color="#FFFDF2" stop-opacity="1"/></linearGradient></defs>' +
    '<path d="M4 28 Q76 24 146 28 Q76 32 4 28Z" fill="url(#adv-cg)"/>' +
    '<g class="sparks" fill="#FFE8A3"><circle cx="38" cy="22" r="1.8"/><circle cx="66" cy="34" r="1.4"/><circle cx="94" cy="20" r="2"/><circle cx="118" cy="35" r="1.6"/><circle cx="80" cy="28" r="1.3"/></g>' +
    '<g transform="translate(152,28)"><g class="head"><path d="M0 -14 L3.5 -3.5 L14 0 L3.5 3.5 L0 14 L-3.5 3.5 L-14 0 L-3.5 -3.5Z" fill="#FFFDF2"/><circle r="4.5" fill="#FFE38E"/></g></g></svg>';
  var BUHO = '<svg viewBox="0 0 120 96" aria-hidden="true">' +
    '<g class="wing-b"><path d="M52 38 Q36 8 10 18 Q26 36 44 44Z" fill="#DCE6F0" stroke="#9EB2C7" stroke-width="1.2"/></g>' +
    '<ellipse cx="58" cy="48" rx="22" ry="15" fill="#F5F8FB" stroke="#B6C6D6" stroke-width="1.4"/>' +
    '<path d="M36 52 L16 58 L22 48 L14 44 L36 44Z" fill="#E3ECF5" stroke="#B6C6D6" stroke-width="1.2"/>' +
    '<g class="letter"><rect x="46" y="60" width="24" height="16" rx="2" fill="#FFFDF8" stroke="#D8C8AE" stroke-width="1.2"/><path d="M46 61 L58 70 L70 61" fill="none" stroke="#D8C8AE" stroke-width="1.2"/><circle cx="58" cy="69" r="2.6" fill="#D7263D"/></g>' +
    '<path d="M52 60 l-2 4 M62 60 l2 4" stroke="#E09B3D" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="78" cy="40" r="14" fill="#F5F8FB" stroke="#B6C6D6" stroke-width="1.4"/>' +
    '<path d="M72 28 L68 20 L77 26 M84 28 L89 21 L88 30" fill="#E3ECF5" stroke="#B6C6D6" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<circle cx="83" cy="39" r="3.2" fill="#F2B830"/><circle cx="83.6" cy="39" r="1.6" fill="#182230"/>' +
    '<path d="M90 41 L97 44 L90 46Z" fill="#E09B3D"/>' +
    '<g class="wing-f"><path d="M58 44 Q42 10 14 22 Q32 42 52 50Z" fill="#FFFFFF" stroke="#B6C6D6" stroke-width="1.3"/></g></svg>';
  var MUNECO = '<svg viewBox="0 0 110 130" aria-hidden="true">' +
    '<circle cx="55" cy="96" r="30" fill="#F6FAFD" stroke="#C6DCEA" stroke-width="1.6"/>' +
    '<circle cx="55" cy="54" r="21" fill="#F6FAFD" stroke="#C6DCEA" stroke-width="1.6"/>' +
    '<path d="M35 84 L12 68 M18 72 L14 62 M75 84 L98 68 M92 72 L96 62" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round"/>' +
    '<rect x="35" y="68" width="40" height="9" rx="4.5" fill="#D7263D"/>' +
    '<path d="M62 74 L70 96 L60 98 L55 76Z" fill="#C21F35"/>' +
    '<circle cx="55" cy="86" r="2.8" fill="#1D2A3A"/><circle cx="55" cy="97" r="2.8" fill="#1D2A3A"/><circle cx="55" cy="108" r="2.8" fill="#1D2A3A"/>' +
    '<circle cx="48" cy="50" r="2.5" fill="#1D2A3A"/><circle cx="62" cy="50" r="2.5" fill="#1D2A3A"/>' +
    '<circle cx="43" cy="55" r="2.8" fill="#F08A96" opacity=".55"/><circle cx="67" cy="55" r="2.8" fill="#F08A96" opacity=".55"/>' +
    '<path d="M55 54 L71 57 L55 60Z" fill="#EE7B28"/>' +
    '<path d="M47 61 Q55 67 63 61" fill="none" stroke="#1D2A3A" stroke-width="2" stroke-linecap="round"/>' +
    '<g class="hat"><rect x="31" y="31" width="48" height="6" rx="3" fill="#1B2533"/><rect x="39" y="10" width="32" height="23" rx="3" fill="#233042"/><rect x="39" y="26" width="32" height="5" fill="#D7263D"/><circle cx="64" cy="28.5" r="2.5" fill="#F2C46D"/></g></svg>';
  var PARACAIDAS = '<svg viewBox="0 0 110 136" aria-hidden="true">' +
    '<path d="M12 48 C12 14, 98 14, 98 48 Z" fill="#D7263D"/>' +
    '<path d="M32 48 C34 18, 76 18, 78 48 Z" fill="#F4EAD6"/>' +
    '<path d="M48 48 C49 20, 61 20, 62 48 Z" fill="#D7263D"/>' +
    '<path d="M12 48 Q22 43 32 48 Q43 43 55 48 Q67 43 78 48 Q88 43 98 48" fill="none" stroke="#F2C46D" stroke-width="2"/>' +
    '<path d="M16 48 L43 90 M36 48 L49 90 M74 48 L61 90 M94 48 L67 90" stroke="#F4EAD6" stroke-width="1.3" opacity=".85"/>' +
    '<rect x="37" y="90" width="36" height="34" rx="4" fill="#2F9E6A" stroke="#1E744B" stroke-width="1.4"/>' +
    '<rect x="34" y="86" width="42" height="9" rx="2.5" fill="#3BB37A" stroke="#1E744B" stroke-width="1.2"/>' +
    '<rect x="51" y="86" width="8" height="38" fill="#F2C46D"/>' +
    '<rect x="37" y="103" width="36" height="7" fill="#F2C46D"/>' +
    '<path d="M55 86 C47 76, 39 79, 43 86 Z M55 86 C63 76, 71 79, 67 86 Z" fill="#F2C46D"/></svg>';
  var RENO_ASOMA = '<svg viewBox="0 0 120 105" aria-hidden="true">' +
    '<path d="M38 36 L26 10 M32 24 L20 22 M30 16 L36 8 M82 36 L94 10 M88 24 L100 22 M90 16 L84 8" stroke="#6E4423" stroke-width="4" stroke-linecap="round" fill="none"/>' +
    '<g class="ears"><ellipse cx="26" cy="48" rx="12" ry="6" transform="rotate(-18 26 48)" fill="#9E6235"/><ellipse cx="26" cy="48" rx="7" ry="3" transform="rotate(-18 26 48)" fill="#E3A487"/>' +
    '<ellipse cx="94" cy="48" rx="12" ry="6" transform="rotate(18 94 48)" fill="#9E6235"/><ellipse cx="94" cy="48" rx="7" ry="3" transform="rotate(18 94 48)" fill="#E3A487"/></g>' +
    '<ellipse cx="60" cy="60" rx="28" ry="27" fill="#9E6235"/>' +
    '<ellipse cx="60" cy="70" rx="20" ry="15" fill="#DFC3A5"/>' +
    '<circle cx="48" cy="54" r="3.5" fill="#1D120B"/><circle cx="72" cy="54" r="3.5" fill="#1D120B"/>' +
    '<circle cx="49" cy="53" r="1.2" fill="#fff"/><circle cx="73" cy="53" r="1.2" fill="#fff"/>' +
    '<circle class="rnose" cx="60" cy="66" r="7.5" fill="#E62B3A"/><circle cx="57.5" cy="63.5" r="2.2" fill="#FF9AA2" opacity=".8"/>' +
    '<path d="M52 76 Q60 82 68 76" fill="none" stroke="#5E381C" stroke-width="2.2" stroke-linecap="round"/></svg>';
  var GLOBO = '<svg viewBox="0 0 80 132" aria-hidden="true">' +
    '<path class="str" d="M40 70 Q32 86 42 98 T38 128" fill="none" stroke="#F2C46D" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M40 68 C14 52, 8 34, 8 24 C8 12, 18 5, 29 5 C35 5, 38 9, 40 13 C42 9, 45 5, 51 5 C62 5, 72 12, 72 24 C72 34, 66 52, 40 68 Z" fill="#E0354B"/>' +
    '<path d="M36 68 L44 68 L41 73 L39 73 Z" fill="#B82135"/>' +
    '<ellipse cx="25" cy="22" rx="6" ry="10" transform="rotate(-24 25 22)" fill="#FF9AA8" opacity=".45"/>' +
    '<circle cx="29" cy="14" r="2.2" fill="#FFF" opacity=".6"/></svg>';

  function tamRaiz(root) { return { W: root.offsetWidth || 390, H: root.offsetHeight || 844 }; }
  function sorpresa(root, tipo) {
    if (root.querySelector('.adv-overlay, .adv-scene')) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var s = tamRaiz(root), el = document.createElement('div'), dur = 6000, r = Math.random();
    el.style.setProperty('--W', s.W + 'px'); el.style.setProperty('--H', s.H + 'px');
    switch (tipo) {
      case 'trineo':
        el.className = 'adv-sur adv-santa' + (r < .5 ? ' rtl' : '');
        el.style.setProperty('--y', Math.round(s.H * (.06 + Math.random() * .22)) + 'px');
        el.style.setProperty('--t', (8 + Math.random() * 3).toFixed(1) + 's');
        el.innerHTML = '<div class="bob">' + SANTA + '</div>';
        dur = 11500; break;
      case 'bola':
        el.className = 'adv-sur adv-ball';
        el.style.left = Math.round(s.W * (.3 + Math.random() * .4)) + 'px';
        el.style.top = Math.round(s.H * (.35 + Math.random() * .2)) + 'px';
        el.style.setProperty('--sx', Math.round((Math.random() - .5) * 200) + 'px');
        el.innerHTML = '<div class="b"></div><div class="s">' + SPLAT + '</div>';
        var sc = root.querySelector('.adv-scroll');
        if (sc) { sc.classList.remove('adv-shake-all'); void sc.offsetWidth; sc.classList.add('adv-shake-all'); }
        dur = 4300; break;
      case 'galleta':
        var lado = r < .5 ? 'bottom' : r < .75 ? 'left' : 'right';
        el.className = 'adv-sur adv-ginger ' + lado;
        el.style.setProperty('--x', Math.round(20 + Math.random() * (s.W - 130)) + 'px');
        el.style.setProperty('--y', Math.round(s.H * (.3 + Math.random() * .45)) + 'px');
        el.innerHTML = GINGER;
        dur = 5400; break;
      case 'pinguino':
        el.className = 'adv-sur adv-peng' + (r < .5 ? ' rtl' : '');
        el.innerHTML = PENG;
        dur = 4800; break;
      case 'estrella':
        el.className = 'adv-sur adv-comet' + (r < .5 ? ' rtl' : '');
        el.style.setProperty('--y', Math.round(s.H * (.06 + Math.random() * .26)) + 'px');
        el.innerHTML = COMETA;
        dur = 2600; break;
      case 'buho':
        el.className = 'adv-sur adv-owl' + (r < .5 ? ' rtl' : '');
        el.style.setProperty('--y', Math.round(s.H * (.14 + Math.random() * .4)) + 'px');
        el.style.setProperty('--t', (6.5 + Math.random() * 2.5).toFixed(1) + 's');
        el.innerHTML = '<div class="glide">' + BUHO + '</div>';
        dur = 9500; break;
      case 'muneco':
        el.className = 'adv-sur adv-snowm';
        el.style.setProperty('--x', Math.round(16 + Math.random() * Math.max(40, s.W - 130)) + 'px');
        el.innerHTML = MUNECO;
        dur = 5200; break;
      case 'regalo':
        el.className = 'adv-sur adv-para';
        el.style.setProperty('--x', Math.round(24 + Math.random() * Math.max(40, s.W - 140)) + 'px');
        el.style.setProperty('--t', (7.5 + Math.random() * 2.5).toFixed(1) + 's');
        el.innerHTML = '<div class="sway">' + PARACAIDAS + '</div>';
        dur = 10500; break;
      case 'reno':
        el.className = 'adv-sur adv-deer';
        el.style.setProperty('--x', Math.round(20 + Math.random() * Math.max(40, s.W - 140)) + 'px');
        el.innerHTML = RENO_ASOMA;
        dur = 4800; break;
      case 'globo':
        el.className = 'adv-sur adv-balloon';
        el.style.setProperty('--x', Math.round(20 + Math.random() * Math.max(40, s.W - 100)) + 'px');
        el.style.setProperty('--t', (7 + Math.random() * 2.5).toFixed(1) + 's');
        el.innerHTML = '<div class="drift">' + GLOBO + '</div>';
        dur = 10000; break;
      default: return;
    }
    root.appendChild(el);
    setTimeout(function () { el.remove(); }, dur);
  }
  var FRECUENCIAS = { pocas: [40, 70], normal: [16, 32], muchas: [6, 12] };
  var SORPRESAS = {
    trineo: 'Papá Noel en trineo', bola: 'Bola de nieve gigante', galleta: 'Galleta traviesa', pinguino: 'Pingüino patinador',
    estrella: 'Estrella fugaz', buho: 'Búho mensajero', muneco: 'Muñeco de nieve', regalo: 'Regalo en paracaídas',
    reno: 'Reno curioso', globo: 'Globo de corazón'
  };
  function programarSorpresas(root, cfg) {
    var so = cfg.sorpresas || {};
    var activas = Object.keys(SORPRESAS).filter(function (k) { return so[k]; });
    if (!activas.length) return;
    var f = FRECUENCIAS[so.frecuencia] || FRECUENCIAS.normal, primera = true, ultima = null;
    (function siguiente() {
      var espera = primera ? 4000 + Math.random() * 3000 : (f[0] + Math.random() * (f[1] - f[0])) * 1000;
      primera = false;
      root._advT = setTimeout(function () {
        if (!document.hidden) {
          var pool = activas.length > 1 ? activas.filter(function (k) { return k !== ultima; }) : activas;
          ultima = pool[Math.floor(Math.random() * pool.length)];
          sorpresa(root, ultima);
        }
        siguiente();
      }, espera);
    })();
  }

  /* ---------- Música navideña de fondo ---------- */
  var MELODIA = [
    /* Jingle Bells + We Wish You a Merry Christmas (cajita de música suave) */
    [659.25,1],[659.25,1],[659.25,2],[659.25,1],[659.25,1],[659.25,2],
    [659.25,1],[783.99,1],[523.25,1.5],[587.33,.5],[659.25,3],[0,1],
    [698.46,1],[698.46,1],[698.46,1.5],[698.46,.5],[698.46,1],[659.25,1],[659.25,1],[659.25,.5],[659.25,.5],
    [659.25,1],[587.33,1],[587.33,1],[659.25,1],[587.33,2],[783.99,2],
    [659.25,1],[659.25,1],[659.25,2],[659.25,1],[659.25,1],[659.25,2],
    [659.25,1],[783.99,1],[523.25,1.5],[587.33,.5],[659.25,3],[0,1],
    [698.46,1],[698.46,1],[698.46,1.5],[698.46,.5],[698.46,1],[659.25,1],[659.25,1],[659.25,.5],[659.25,.5],
    [783.99,1],[783.99,1],[698.46,1],[587.33,1],[523.25,3],[0,1]
  ];
  var bgmState = { playing: false, muted: false, pausedBySong: false, audio: null, ctx: null, timer: null, idx: 0, cfg: null, resolver: null };

  function bgmStopInternal() {
    clearTimeout(bgmState.timer); bgmState.timer = null;
    if (bgmState.audio) { try { bgmState.audio.pause(); } catch (e) {} }
    bgmState.playing = false;
  }
  function bgmNota() {
    if (!bgmState.playing || bgmState.muted) return;
    var ctx = bgmState.ctx;
    if (!ctx) return;
    var item = MELODIA[bgmState.idx % MELODIA.length];
    bgmState.idx = (bgmState.idx + 1) % MELODIA.length;
    var freq = item[0], beats = item[1], stepMs = 340 * beats;
    if (freq > 0) {
      var now = ctx.currentTime, vol = Math.max(.02, Math.min(1, Number((bgmState.cfg || {}).volumen) || .35)) * .16;
      var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(freq, now);
      o2.type = 'triangle'; o2.frequency.setValueAtTime(freq * 2, now);
      var g2 = ctx.createGain(); g2.gain.setValueAtTime(.18, now);
      g.gain.setValueAtTime(.0001, now);
      g.gain.exponentialRampToValueAtTime(vol, now + .02);
      g.gain.exponentialRampToValueAtTime(.0001, now + Math.min(1.6, stepMs / 1000 * 1.4));
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(ctx.destination);
      o.start(now); o2.start(now);
      o.stop(now + 1.7); o2.stop(now + 1.7);
    }
    bgmState.timer = setTimeout(bgmNota, stepMs);
  }
  function bgmStart() {
    var m = bgmState.cfg || {};
    if (!m.activa || bgmState.muted || bgmState.playing) return;
    var vol = Math.max(0, Math.min(1, m.volumen == null ? .35 : Number(m.volumen)));
    if (m.fuente === 'archivo' && m.archivo) {
      var src = bgmState.resolver ? bgmState.resolver(m.archivo) : m.archivo;
      if (!bgmState.audio || bgmState.audio.dataset.src !== src) {
        if (bgmState.audio) { try { bgmState.audio.pause(); } catch (e) {} }
        bgmState.audio = new Audio(src);
        bgmState.audio.dataset.src = src;
        bgmState.audio.loop = true;
      }
      bgmState.audio.volume = vol;
      var p = bgmState.audio.play();
      if (p && p.then) {
        p.then(function () { bgmState.playing = true; bgmSyncBtns(); }).catch(function () { bgmState.playing = false; bgmSyncBtns(); });
      } else { bgmState.playing = true; bgmSyncBtns(); }
    } else {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!bgmState.ctx) bgmState.ctx = new AC();
      if (bgmState.ctx.state === 'suspended') bgmState.ctx.resume();
      bgmState.playing = true;
      bgmSyncBtns();
      bgmNota();
    }
  }
  function bgmSyncBtns() {
    document.querySelectorAll('.adv-bgm').forEach(function (b) {
      var on = bgmState.playing && !bgmState.muted;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? T.musicaOn : T.musicaOff);
      b.title = on ? T.musicaOn : T.musicaOff;
    });
  }
  function montarMusica(root, cfg, resolver) {
    var m = cfg.musica || {};
    bgmState.cfg = m;
    bgmState.resolver = resolver || null;
    if (!m.activa) { bgmStopInternal(); return; }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'adv-bgm' + (bgmState.playing && !bgmState.muted ? ' on' : '');
    btn.innerHTML = '<svg class="ic-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
      '<svg class="ic-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M3 3l18 18"/></svg>';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (bgmState.playing && !bgmState.muted) {
        bgmState.muted = true;
        bgmStopInternal();
      } else {
        bgmState.muted = false;
        bgmStart();
      }
      bgmSyncBtns();
    });
    root.appendChild(btn);
    bgmSyncBtns();
    if (!bgmState.muted && !bgmState.playing) {
      var desbloquear = function () {
        if (!bgmState.muted && !bgmState.playing && (bgmState.cfg || {}).activa) bgmStart();
      };
      root.addEventListener('pointerdown', desbloquear, { once: true });
    }
  }

  /* ---------- API pública ---------- */

  /* opts: { modo: 'vivo'|'editar', dia, enMarco, seleccionado, abiertos(Set), alElegir(n), alMover(desde, hasta), alAbrir(n), resolverImagen(ruta) } */
  function calendario(root, cfg, opts) {
    opts = opts || {};
    var modo = opts.modo || 'vivo';
    var dia = opts.dia == null ? diaActual(cfg) : opts.dia;
    var abiertos = opts.abiertos || new Set();
    raiz(root, cfg, opts, modo === 'editar' ? ' is-edit' : '');
    var falta = 24 - dia;
    var sub = dia === 0 ? T.antes : falta === 0 ? T.nochebuena : T.faltan(falta, dia);
    var palabras = esc(plantilla(cfg.titulo || T.tituloDef, cfg)).split(' ');
    var ultima = palabras.pop();
    var titulo = palabras.join(' ') + ' <span style="white-space:nowrap">' + ultima + ' ' + heart(26, '#E8475A', 'aria-hidden="true"') + '</span>';
    var puertas = (cfg.dias || []).map(function (d) {
      var estado = d.n > dia ? 'locked' : abiertos.has(d.n) ? 'open' : 'ready';
      var extra = (d.n === dia && estado !== 'open' ? ' today' : '') + (opts.seleccionado === d.n ? ' sel' : '');
      return puertaHTML(d, estado, extra, cfg, opts.resolverImagen);
    }).join('');
    var scroll = document.createElement('div');
    scroll.className = 'adv-scroll';
    scroll.innerHTML = '<div class="adv-cal"><div class="adv-head"><p class="adv-kicker">' + T.mes + ' ' + esc(cfg.anio) + '</p>' +
      '<h1 class="adv-title">' + titulo + '</h1><p class="adv-sub">' + esc(sub) + '</p></div>' +
      '<div class="adv-grid">' + puertas + '</div></div>';
    root.appendChild(scroll);
    nieve(root, cfg);

    var grid = scroll.querySelector('.adv-grid');
    var porN = {};
    (cfg.dias || []).forEach(function (d) { porN[d.n] = d; });

    if (modo === 'editar') {
      var desde = null;
      grid.querySelectorAll('.adv-door').forEach(function (b, idx) {
        b.draggable = true;
        b.addEventListener('click', function () { opts.alElegir && opts.alElegir(Number(b.dataset.n)); });
        b.addEventListener('dragstart', function (e) { desde = idx; b.classList.add('drag'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(idx)); });
        b.addEventListener('dragend', function () { b.classList.remove('drag'); });
        b.addEventListener('dragover', function (e) { e.preventDefault(); b.classList.add('over'); });
        b.addEventListener('dragleave', function () { b.classList.remove('over'); });
        b.addEventListener('drop', function (e) {
          e.preventDefault(); b.classList.remove('over');
          if (desde != null && desde !== idx && opts.alMover) opts.alMover(desde, idx);
          desde = null;
        });
      });
      return;
    }

    montarMusica(root, cfg, opts.resolverImagen);
    programarSorpresas(root, cfg);
    var toastT;
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.adv-door');
      if (!b) return;
      var n = Number(b.dataset.n);
      if (n > dia) {
        var old = root.querySelector('.adv-toast');
        if (old) old.remove();
        var t = document.createElement('div');
        t.className = 'adv-toast'; t.setAttribute('role', 'status');
        t.textContent = T.paciencia(n);
        root.appendChild(t);
        clearTimeout(toastT); toastT = setTimeout(function () { t.remove(); }, 1900);
        return;
      }
      abiertos.add(n);
      opts.alAbrir && opts.alAbrir(n);
      abrir(root, b, porN[n], cfg, opts.resolverImagen);
    });
  }

  /* ---------- Exportar vale como imagen PNG (con compartir nativo en móvil) ---------- */
  function wrapCanvasText(ctx, text, x, y, maxW, lineH, maxLines) {
    var words = String(text || '').replace(/\n/g, ' \n ').split(/\s+/), line = '', lines = [];
    for (var i = 0; i < words.length; i++) {
      if (words[i] === '\n') { lines.push(line.trim()); line = ''; continue; }
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = words[i];
      } else line = test;
    }
    if (line.trim()) lines.push(line.trim());
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    }
    for (var j = 0; j < lines.length; j++) ctx.fillText(lines[j], x, y + j * lineH);
    return y + lines.length * lineH;
  }

  function exportarVale(d, cfg, root) {
    var W = 1000, H = 580;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');

    // Fondo exterior oscuro elegante
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0B1828');
    bg.addColorStop(1, '#1A2D46');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Ticket central crema con muescas laterales
    var pad = 42, tx = pad, ty = pad, tw = W - pad * 2, th = H - pad * 2, r = 24, nr = 26;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.38)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 12;
    ctx.beginPath();
    ctx.moveTo(tx + r, ty);
    ctx.lineTo(tx + tw - r, ty);
    ctx.quadraticCurveTo(tx + tw, ty, tx + tw, ty + r);
    ctx.lineTo(tx + tw, ty + th / 2 - nr);
    ctx.arc(tx + tw, ty + th / 2, nr, -Math.PI / 2, Math.PI / 2, true);
    ctx.lineTo(tx + tw, ty + th - r);
    ctx.quadraticCurveTo(tx + tw, ty + th, tx + tw - r, ty + th);
    ctx.lineTo(tx + r, ty + th);
    ctx.quadraticCurveTo(tx, ty + th, tx, ty + th - r);
    ctx.lineTo(tx, ty + th / 2 + nr);
    ctx.arc(tx, ty + th / 2, nr, Math.PI / 2, -Math.PI / 2, true);
    ctx.lineTo(tx, ty + r);
    ctx.quadraticCurveTo(tx, ty, tx + r, ty);
    ctx.closePath();
    ctx.fillStyle = '#F7F0E3';
    ctx.fill();
    ctx.restore();

    // Borde dorado interior punteado
    ctx.save();
    ctx.strokeStyle = '#C99A3A';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 7]);
    ctx.strokeRect(tx + 22, ty + 22, tw - 44, th - 44);
    ctx.restore();

    // Etiqueta superior + fecha
    var etq = (d.etiqueta != null && d.etiqueta !== '' ? d.etiqueta : (T.etiquetas.vale || 'VALE CANJEABLE')).toUpperCase();
    var hasObj = !!(d.objeto && OBJETOS[d.objeto] && OBJETOS[d.objeto].svg);
    var leftX = tx + 60;
    var textMaxW = hasObj ? tw - 360 : tw - 120;

    ctx.fillStyle = '#A61E2A';
    ctx.font = '600 20px "DM Sans", system-ui, sans-serif';
    ctx.fillText(etq + '  ·  ' + T.fecha(d.n).toUpperCase(), leftX, ty + 78);

    // Línea separadora fina
    ctx.fillStyle = '#E0D2B8';
    ctx.fillRect(leftX, ty + 96, textMaxW, 2);

    // Título del vale
    ctx.fillStyle = '#1B2533';
    ctx.font = 'italic 600 54px "Cormorant Garamond", Georgia, serif';
    var nextY = wrapCanvasText(ctx, d.titulo || T.dia(d.n), leftX, ty + 162, textMaxW, 58, 3);

    // Texto / detalles
    if (d.texto) {
      ctx.fillStyle = '#4A5568';
      ctx.font = '400 26px "DM Sans", system-ui, sans-serif';
      wrapCanvasText(ctx, d.texto, leftX, nextY + 18, textMaxW, 36, 3);
    }

    // Pie con Para / De y validez
    var para = cfg.nombre ? (T.valePara + ': ' + cfg.nombre) : '';
    var de = (d.firma || cfg.firma) ? (T.valeDe + ': ' + (d.firma || cfg.firma)) : '';
    var meta = [para, de].filter(Boolean).join('   ·   ');
    ctx.fillStyle = '#8A6B3E';
    ctx.font = '600 20px "DM Sans", system-ui, sans-serif';
    if (meta) ctx.fillText(meta, leftX, ty + th - 76);

    ctx.fillStyle = '#A61E2A';
    ctx.font = 'italic 600 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(T.valePie, leftX, ty + th - 42);

    function finalizar() {
      var fname = 'vale-dia-' + d.n + '.png';
      c.toBlob(function (blob) {
        if (!blob) return;
        var file = null;
        try { file = new File([blob], fname, { type: 'image/png' }); } catch (e) {}
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: d.titulo || etq }).catch(function (err) {
            if (err && err.name !== 'AbortError') descargarBlob(blob, fname);
          });
        } else {
          descargarBlob(blob, fname);
        }
      }, 'image/png');
    }

    function descargarBlob(blob, fname) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = fname;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      if (root) {
        var old = root.querySelector('.adv-toast'); if (old) old.remove();
        var t = document.createElement('div');
        t.className = 'adv-toast'; t.setAttribute('role', 'status');
        t.textContent = T.valeListo;
        root.appendChild(t);
        setTimeout(function () { t.remove(); }, 2000);
      }
    }

    if (hasObj) {
      // Círculo suave a la derecha y dibujo SVG del objeto
      var cx = tx + tw - 175, cy = ty + th / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 118, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(242,196,109,0.22)';
      ctx.fill();
      ctx.restore();

      var svgStr = OBJETOS[d.objeto].svg;
      if (svgStr.indexOf('xmlns=') < 0) svgStr = svgStr.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, cx - 98, cy - 98, 196, 196);
        finalizar();
      };
      img.onerror = finalizar;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
    } else {
      finalizar();
    }
  }

  function hoja(root, d, cfg, resolver, alCerrar) {
    idioma(cfg);
    var ov = document.createElement('div');
    ov.className = 'adv-overlay';
    ov.innerHTML = '<div class="adv-sheet" role="dialog" aria-modal="true" aria-label="' + T.dia(d.n) + '">' +
      '<div class="adv-sheet-top"><p class="adv-date">' + T.fecha(d.n) + '</p><button type="button" class="adv-x" aria-label="' + T.cerrar + '">' + CLOSE + '</button></div>' +
      contenidoHTML(d, cfg, resolver) + '</div>';
    var songAudio = null, wasBgm = false;
    var songEl = ov.querySelector('.adv-song');
    if (songEl && songEl.dataset.audio) {
      songAudio = new Audio(songEl.dataset.audio);
      var playBtn = songEl.querySelector('.adv-play');
      var seek = songEl.querySelector('.adv-seek');
      var timeEl = songEl.querySelector('.adv-time');
      function setPlayUI(on) {
        songEl.classList.toggle('playing', on);
        if (playBtn) playBtn.setAttribute('aria-label', on ? T.pausar : T.reproducir);
      }
      if (playBtn) playBtn.addEventListener('click', function () {
        if (songAudio.paused) {
          if (bgmState.playing && !bgmState.muted) { wasBgm = true; bgmStopInternal(); bgmSyncBtns(); }
          songAudio.play().then(function () { setPlayUI(true); }).catch(function () {});
        } else {
          songAudio.pause();
          setPlayUI(false);
          if (wasBgm && !bgmState.muted) { wasBgm = false; bgmStart(); }
        }
      });
      songAudio.addEventListener('timeupdate', function () {
        if (seek && songAudio.duration) seek.value = String(Math.round((songAudio.currentTime / songAudio.duration) * 100));
        if (timeEl) timeEl.textContent = fmtTiempo(songAudio.currentTime);
      });
      songAudio.addEventListener('ended', function () {
        setPlayUI(false);
        if (seek) seek.value = '0';
        if (wasBgm && !bgmState.muted) { wasBgm = false; bgmStart(); }
      });
      if (seek) seek.addEventListener('input', function () {
        if (songAudio.duration) songAudio.currentTime = (Number(seek.value) / 100) * songAudio.duration;
      });
    }
    function cerrar() {
      if (songAudio) { try { songAudio.pause(); } catch (e) {} songAudio = null; }
      if (wasBgm && !bgmState.muted) { wasBgm = false; bgmStart(); }
      ov.remove(); document.removeEventListener('keydown', tecla); alCerrar && alCerrar();
    }
    function tecla(e) { if (e.key === 'Escape') cerrar(); }
    ov.addEventListener('click', function (e) {
      if (e.target.closest('[data-vale]')) { exportarVale(d, cfg, root); return; }
      if (e.target === ov || e.target.closest('.adv-x') || e.target.closest('[data-close]')) cerrar();
    });
    document.addEventListener('keydown', tecla);
    root.appendChild(ov);
    ov.querySelector('.adv-x').focus({ preventScroll: true });
  }

  function entrada(root, cfg, alEntrar, opts) {
    opts = opts || {};
    raiz(root, cfg, opts);
    var g = cfg.entrada || {};
    var pistas = (cfg.pistas || []).filter(Boolean);
    var scroll = document.createElement('div');
    scroll.className = 'adv-scroll';
    scroll.innerHTML = '<div class="adv-gate">' +
      '<svg aria-hidden="true" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#F2C46D" stroke-width="1.4"><path d="M28 4v48M4 28h48M11 11l34 34M45 11L11 45"/><path d="M28 4l-5 6M28 4l5 6M28 52l-5-6M28 52l5-6M4 28l6-5M4 28l6 5M52 28l-6-5M52 28l-6 5"/></svg>' +
      '<div class="adv-gate-copy"><p class="adv-kicker">' + T.mes + ' ' + esc(cfg.anio) + '</p><h1>' + esc(plantilla(g.titulo || T.gateTitulo, cfg)) + '</h1>' +
      '<p class="adv-gate-text">' + esc(plantilla(g.texto || T.gateTexto, cfg)) + '</p></div>' +
      '<form class="adv-form" novalidate><label for="adv-pw">' + T.contrasena + '</label><div class="adv-row">' +
      '<input id="adv-pw" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="' + esc(g.placeholder || '') + '">' +
      '<button type="submit">' + T.abrir + '</button></div><p class="adv-err" hidden>' + T.casi + '</p></form>' +
      '<div class="adv-hints" aria-live="polite"></div></div>';
    root.appendChild(scroll);
    nieve(root, cfg);
    montarMusica(root, cfg, opts.resolverImagen);
    programarSorpresas(root, cfg);
    var form = scroll.querySelector('form'), input = form.querySelector('input'), err = form.querySelector('.adv-err'), hints = scroll.querySelector('.adv-hints');
    var intentos = 0;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = opts.comprobar ? opts.comprobar(input.value) : normal(input.value) === normal(cfg.contrasena);
      Promise.resolve(ok).then(function (bien) {
        if (bien) { alEntrar(input.value); return; }
        intentos++;
        err.hidden = false;
        form.classList.remove('adv-shake'); void form.offsetWidth; form.classList.add('adv-shake');
        if (intentos <= pistas.length) {
          var p = document.createElement('p');
          p.className = 'adv-hint';
          p.innerHTML = '<b>' + T.pista + ' ' + intentos + ' · </b>' + esc(pistas[intentos - 1]);
          hints.appendChild(p);
        }
      });
    });
    input.addEventListener('input', function () { err.hidden = true; });
  }

  function normal(s) {
    return String(s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  window.Adviento = {
    calendario: calendario, entrada: entrada, hoja: hoja, abrir: abrir, estallido: estallido, sorpresa: sorpresa, SORPRESAS: SORPRESAS, escena: escena, ESCENAS: ESCENAS, diaActual: diaActual, normal: normal,
    TONOS: TONOS, TAMANOS: TAMANOS, CELDAS: CELDAS, ADORNOS: ADORNOS, MOVIMIENTOS: MOVIMIENTOS,
    APERTURAS: APERTURAS, EFECTOS: EFECTOS, FONDOS: FONDOS, TIPOGRAFIAS: TIPOGRAFIAS, TEXTOS: TEXTOS, OBJETOS: OBJETOS
  };
})();
