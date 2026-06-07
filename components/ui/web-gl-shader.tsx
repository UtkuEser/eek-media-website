'use client';

import { useEffect, useRef } from 'react';

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Tasarım felsefesi:
// İki ayrı bileşen:
//   arc(ux)    — statik büyük S-kıvrımı: solda y≈0.30, ortada y≈0.20, sağda y≈0.38
//   ripple(px) — küçük animasyon titreşimleri, S-kıvrımının üzerinde akar
// 5 gaussian katman: geniş glow → dalga gövdesi → elektrik mavi çekirdek → buz mavi ince çizgi → beyaz tepe
// Arka plan üstte neredeyse siyah, dalga çevresinde kontrollü mavi parıltı.
// Renk: yalnızca lacivert / elektrik mavi / buz mavisi / beyaz-mavi.
const FRAG_SRC = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;
uniform float u_strength;

// Statik S-kıvrımı taban eğrisi: sin(0…pi) çukur → sağa linear kayma
// Sonuç: sol=0, orta≈-0.10, sağ=+0.08 offset (yc hesabına eklenir)
float arc(float ux) {
  return -0.13 * sin(ux * 3.14159) + 0.08 * ux;
}

// Küçük canlı titreşimler: 3 harmonik, ters yönlü ikinci harmonik
float ripple(float px) {
  float t = u_time;
  return sin(px * 1.20 + t * 0.25         ) * 0.055
       + sin(px * 2.05 - t * 0.18 + 1.42  ) * 0.022
       + sin(px * 0.58 + t * 0.11 + 2.90  ) * 0.012;
}

void main() {
  vec2  uv  = gl_FragCoord.xy / u_resolution;
  float ax  = u_resolution.x / u_resolution.y;
  float px  = uv.x * ax;
  float uy  = uv.y;
  float str = u_strength;

  // Zemin: çok koyu lacivert (neredeyse siyah)
  vec3 col = vec3(0.014, 0.026, 0.075);

  // Dalga merkezi: statik ark + canlı titreşim
  // uv.x=0.0 → yc≈0.30 | uv.x=0.5 → yc≈0.20 | uv.x=1.0 → yc≈0.38
  float yc = 0.30 + arc(uv.x) + ripple(px);
  float d  = uy - yc;

  // Katman 1 — Geniş atmosfer: tüm alt alanı maviye boyar (k=4)
  col += vec3(0.005, 0.022, 0.118) * exp(-d*d *   4.0) * 0.78 * str;

  // Katman 2 — Ana dalga gövdesi: yumuşak görünür şerit (k=18)
  col += vec3(0.020, 0.078, 0.355) * exp(-d*d *  18.0) * 0.94 * str;

  // Katman 3 — Elektrik mavi çekirdek: yüksek yoğunluk (k=115)
  col += vec3(0.055, 0.172, 0.678) * exp(-d*d * 115.0) * 1.00 * str;

  // Katman 4 — Buz mavisi highlight: akışkan ince çizgi (k=2100)
  col += vec3(0.395, 0.625, 0.948) * exp(-d*d * 2100.0) * 0.62 * str;

  // Katman 5 — Beyaz-mavi tepe: referanstaki parlak merkez (k=8000)
  col += vec3(0.800, 0.892, 0.998) * exp(-d*d * 8000.0) * 0.46 * str;

  // Dalga altı yansıma: "zemine çarpan ışık" hissi
  float belowWave = smoothstep(yc + 0.01, yc - 0.14, uy);
  col += vec3(0.003, 0.013, 0.068) * belowWave * 0.50 * str;

  // Üst kısım karartma: metnin olduğu alan neredeyse saf siyah kalsın
  float topDark = smoothstep(0.60, 1.00, uy);
  col = mix(col, col * 0.10, topDark);

  // Vignette: kenar karartma, merkez dalga bölgesinde açık
  vec2  vc   = uv - vec2(0.50, 0.26);
  float vign = 1.0 - smoothstep(0.22, 0.94, length(vc * vec2(0.92, 1.70)));
  col = mix(vec3(0.006, 0.012, 0.045), col, vign);

  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

function initShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // highp için webgl2 tercih et, yoksa webgl
    const gl =
      (canvas.getContext('webgl2') as WebGLRenderingContext | null) ??
      canvas.getContext('webgl');
    if (!gl) return;

    const vert = initShader(gl, gl.VERTEX_SHADER,   VERT_SRC);
    const frag = initShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert!);
    gl.attachShader(prog, frag!);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime     = gl.getUniformLocation(prog, 'u_time');
    const uRes      = gl.getUniformLocation(prog, 'u_resolution');
    const uStrength = gl.getUniformLocation(prog, 'u_strength');

    // Mobilde yoğunluğu azalt
    gl.uniform1f(uStrength, isMobile ? 0.55 : 1.0);

    let startTime = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function draw() {
      if (!gl) return;
      const elapsed = reduced ? 0 : (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas!.width, canvas!.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
