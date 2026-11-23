import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { Magnetic, REDUCED, lerp } from "../lib.jsx";

const FRAG = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float s;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*noise(p);p=R*p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  vec2 mm=(m-.5*r)/r.y;
  float tt=t*.05;
  p.y+=s*.35;
  float d=length(p-mm); float glow=exp(-d*d*5.);
  vec2 q=vec2(fbm(p*1.4+tt),fbm(p*1.4-tt+5.2));
  vec2 w=vec2(fbm(p*1.4+3.2*q+vec2(1.7,9.2)+tt*1.3+glow*.35),fbm(p*1.4+3.2*q+vec2(8.3,2.8)-tt));
  float f=fbm(p*1.4+3.*w);
  vec3 c=vec3(.025,.022,.045);
  c=mix(c,vec3(.24,.14,.72),smoothstep(.35,.85,f));
  c=mix(c,vec3(.05,.62,.78),smoothstep(.5,.95,w.x)*.75);
  c=mix(c,vec3(.95,.25,.52),smoothstep(.62,.98,q.y)*.42);
  c+=pow(f,4.)*vec3(.6,.5,1.)*.8;
  c+=glow*vec3(.35,.25,.75)*.45;
  float v=length((uv-.5)*vec2(1.,1.2));
  c*=smoothstep(1.05,.15,v);
  c*=mix(.15,1.,smoothstep(0.,.5,uv.y));
  gl_FragColor=vec4(pow(c,vec3(.95)),1.);
}`;

function ShaderBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return;
    const compile = (type, src) => {
      const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; }
      return o;
    };
    const vs = compile(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}");
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    const uR = u("r"), uT = u("t"), uM = u("m"), uS = u("s");

    let W = 0, H = 0;
    const resize = () => {
      const k = Math.min(devicePixelRatio || 1, 2) * 0.5; // render at half-res, CSS upscales
      W = canvas.width = Math.floor(canvas.clientWidth * k);
      H = canvas.height = Math.floor(canvas.clientHeight * k);
      gl.viewport(0, 0, W, H);
    };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: 0.65, y: 0.45, tx: 0.65, ty: 0.45 };
    const move = (e) => { mouse.tx = e.clientX / innerWidth; mouse.ty = e.clientY / innerHeight; };
    addEventListener("pointermove", move);

    let visible = true, raf;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const t0 = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x = lerp(mouse.x, mouse.tx, 0.04); mouse.y = lerp(mouse.y, mouse.ty, 0.04);
      gl.uniform2f(uR, W, H);
      gl.uniform1f(uT, REDUCED ? 20 : (now - t0) / 1000 + 20);
      gl.uniform2f(uM, mouse.x * W, (1 - mouse.y) * H);
      gl.uniform1f(uS, Math.min(1, scrollY / innerHeight));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      removeEventListener("resize", resize); removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} className="hero__bg" aria-hidden="true" />;
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/** Cycles through roles with a glitchy text-scramble transition. */
function RoleScramble({ roles, ready }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let idx = 0, raf, timer;
    el.textContent = roles[0];
    const scrambleTo = (text) => {
      const from = el.textContent, len = Math.max(from.length, text.length);
      const q = Array.from({ length: len }, (_, i) => {
        const start = Math.floor(Math.random() * 20);
        return { from: from[i] || "", to: text[i] || "", start, end: start + Math.floor(Math.random() * 20), ch: "" };
      });
      let frame = 0;
      const tick = () => {
        let out = "", done = 0;
        for (const c of q) {
          if (frame >= c.end) { done++; out += c.to; }
          else if (frame >= c.start) {
            if (!c.ch || Math.random() < 0.28) c.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            out += `<span style="color:var(--violet)">${c.ch}</span>`;
          } else out += c.from;
        }
        el.innerHTML = out;
        if (done < q.length) { frame++; raf = requestAnimationFrame(tick); }
      };
      tick();
    };
    const next = () => {
      idx = (idx + 1) % roles.length;
      if (REDUCED) el.textContent = roles[idx]; else scrambleTo(roles[idx]);
      timer = setTimeout(next, 2800);
    };
    if (ready) timer = setTimeout(next, 2800);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [roles, ready]);
  return <span ref={ref} className="hero__roleText" />;
}

function SplitName({ lines }) {
  let i = 0;
  return (
    <h1 className="hero__name" aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span className="line" key={line} aria-hidden="true">
          {[...line].map((ch, k) => (
            <span className="char" key={k} style={{ "--i": i++ }}>{ch}</span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Clock() {
  const fmt = () => new Date().toLocaleTimeString("fi-FI", { timeZone: "Europe/Helsinki", hour12: false });
  const [now, setNow] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setNow(fmt()), 1000); return () => clearInterval(id); }, []);
  return <span>{now}</span>;
}

export default function Hero({ ready }) {
  const { t } = useLang();
  return (
    <section className="hero" id="hero">
      <ShaderBackground />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__kicker"><span className="pulse" /><span>{t.hero.kicker}</span></p>
        <SplitName lines={["Petri", "Malmström"]} />
        <div className="hero__role">
          <span className="mono">&gt;</span>
          <RoleScramble roles={t.hero.roles} ready={ready} />
          <span className="caret" />
        </div>
        <p className="hero__lead">{t.hero.lead}</p>
        <div className="hero__cta">
          <Magnetic href="#journey" className="btn btn--primary">
            <span>{t.hero.cta1}</span>
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Magnetic>
          <Magnetic href="#contact" className="btn btn--ghost"><span>{t.hero.cta2}</span></Magnetic>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true"><span>{t.hero.scroll}</span><i /></div>
      <div className="hero__meta mono" aria-hidden="true"><span>FI</span><Clock /><span>v2026</span></div>
    </section>
  );
}
