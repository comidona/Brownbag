# 📚 Template de Documentación - Estructura HTML

Template de referencia para el archivo `docs/DOCUMENTATION.html`.

---

## Estructura Completa del HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>[APP_NAME] - Documentación v[VERSION]</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <style>
    /* === VARIABLES === */
    :root {
      --bg: #0a0e17;
      --panel: #1c2128;
      --panel-alt: #262d36;
      --text: #f5f7fa;
      --accent: #44FF00;
      --accent-alt: #00B5CC;
      --danger: #ff5f56;
      --success: #3fb950;
      --warning: #f59e0b;
      --code-bg: #161b22;
      --border: #30363d;
    }

    /* === BASE === */
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Space Grotesk',system-ui,sans-serif; background:var(--bg); color:var(--text); line-height:1.6; }
    a { color:var(--accent); text-decoration:none; }
    a:hover { color:var(--accent-alt); }
    code { background:var(--code-bg); padding:.15rem .4rem; border-radius:4px; font-size:.85em; }
    pre { background:var(--code-bg); padding:1rem; border-radius:8px; overflow-x:auto; font-size:.85rem; position:relative; border:1px solid var(--border); }

    /* === LAYOUT === */
    .layout { display:flex; min-height:100vh; }
    nav#toc { width:280px; position:sticky; top:0; height:100vh; overflow-y:auto; background:var(--panel); border-right:1px solid var(--border); padding:1.5rem; }
    main { flex:1; padding:2rem 3rem; max-width:960px; }

    /* === TOC === */
    nav#toc h3 { font-size:1rem; margin-bottom:1rem; color:var(--accent); }
    .search-box input { width:100%; padding:.5rem .75rem; background:var(--panel-alt); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:.8rem; outline:none; }
    .search-box input:focus { border-color:var(--accent); }
    .toc-section { margin-top:1rem; }
    .toc-section a { display:block; padding:.4rem .75rem; border-radius:6px; font-size:.8rem; color:#8b949e; transition:all .2s; }
    .toc-section a:hover { background:var(--panel-alt); color:var(--text); }
    .toc-label { font-size:.65rem; text-transform:uppercase; letter-spacing:.05em; color:#484f58; margin:1rem 0 .5rem; font-weight:600; }

    /* === HEADER === */
    .doc-header { margin-bottom:2.5rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border); }
    .doc-header h1 { font-size:2rem; margin-bottom:.5rem; }
    .doc-header .subtitle { color:#8b949e; }
    .badge { display:inline-block; padding:.2rem .6rem; border-radius:12px; font-size:.7rem; font-weight:600; }
    .badge-primary { background:var(--accent); color:#000; }
    .badge-info { background:var(--accent-alt); color:#fff; }

    /* === SECTIONS === */
    section { margin-bottom:3rem; }
    section h2 { font-size:1.5rem; margin-bottom:1rem; padding-bottom:.5rem; border-bottom:1px solid var(--border); }

    /* === STACK INFO === */
    .stack-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1rem; }
    .stack-card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:1.25rem; }
    .stack-card h4 { font-size:.85rem; color:var(--accent); margin-bottom:.25rem; }
    .stack-card p { font-size:.8rem; color:#8b949e; }

    /* === MERMAID === */
    .mermaid { background:var(--panel); border-radius:12px; padding:2rem; margin:1.5rem 0; border:1px solid var(--border); overflow-x:auto; }

    /* === SCREEN CARDS === */
    .screen-card { background:var(--panel); border:1px solid var(--border); border-radius:16px; margin-bottom:1.5rem; overflow:hidden; transition:all .3s; }
    .screen-card:hover { border-color:var(--accent); box-shadow:0 0 20px rgba(68,255,0,.05); }
    .screen-content { padding:1.5rem; }
    .screen-id { font-size:.65rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:.05em; margin-bottom:.5rem; }
    .screen-title { font-size:1.2rem; font-weight:700; margin-bottom:.5rem; }
    .screen-desc { color:#8b949e; margin-bottom:1rem; font-size:.9rem; }
    .screen-features { margin-bottom:1rem; }
    .screen-features strong { display:block; font-size:.8rem; color:var(--accent-alt); margin:.75rem 0 .25rem; }
    .screen-features ul { list-style:none; }
    .screen-features li { font-size:.8rem; color:#8b949e; padding:.2rem 0; padding-left:1rem; }
    .screen-features li::before { content:'▸ '; color:var(--accent); }
    .screen-actions { display:flex; flex-wrap:wrap; gap:.5rem; }

    /* === ACTION BADGES === */
    .action-badge { font-size:.65rem; padding:.3rem .6rem; background:var(--accent-alt); color:#fff; border-radius:6px; font-weight:600; cursor:pointer; transition:.2s; }
    .action-badge:hover { filter:brightness(1.2); }
    .action-badge a { color:#fff; text-decoration:none; }
    .action-badge.nav { background:var(--success); }
    .action-badge.method-get { background:#4493f8; }
    .action-badge.method-post { background:#3fb950; }
    .action-badge.method-delete { background:#ff5f56; }

    /* === ENDPOINT CARDS === */
    .endpoint-card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:1.5rem; margin-bottom:1.5rem; }
    .endpoint-header { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
    .method { font-weight:700; padding:.25rem .6rem; border-radius:6px; font-size:.75rem; color:#fff; }
    .GET { background:#4493f8; }
    .POST { background:#3fb950; }
    .DELETE { background:#ff5f56; }
    .PATCH { background:#ffa657; color:#222; }
    .PUT { background:#b48cf2; }
    .endpoint-path { font-family:monospace; font-size:.9rem; color:var(--text); }

    .endpoint-card table { width:100%; border-collapse:collapse; margin:1rem 0; }
    .endpoint-card th, .endpoint-card td { text-align:left; padding:.5rem .75rem; border-bottom:1px solid var(--border); font-size:.8rem; }
    .endpoint-card th { color:var(--accent-alt); font-weight:600; }

    .notice { background:var(--panel-alt); border-left:3px solid var(--accent-alt); padding:.75rem 1rem; border-radius:0 8px 8px 0; margin:1rem 0; font-size:.85rem; }
    .notice.danger { border-left-color:var(--danger); }

    /* === MAPPING TABLE === */
    .mapping-table { width:100%; border-collapse:collapse; }
    .mapping-table th { background:var(--panel-alt); color:var(--accent); }
    .mapping-table th, .mapping-table td { padding:.6rem 1rem; border:1px solid var(--border); font-size:.8rem; }
    .mapping-table tr:hover { background:var(--panel-alt); }

    /* === COPY BUTTON === */
    .copy-btn { position:absolute; top:.5rem; right:.5rem; background:var(--panel-alt); border:1px solid var(--border); color:#8b949e; padding:.25rem .5rem; border-radius:4px; cursor:pointer; font-size:.7rem; }
    .copy-btn:hover { color:var(--text); border-color:var(--accent); }

    /* === RESPONSIVE === */
    @media(max-width:768px) {
      .layout { flex-direction:column; }
      nav#toc { width:100%; height:auto; position:relative; border-right:none; border-bottom:1px solid var(--border); }
      main { padding:1.5rem; }
      .stack-grid { grid-template-columns:1fr; }
    }
  </style>
</head>
<body>
<div class="layout">
  <!-- TOC -->
  <nav id="toc">
    <h3>📚 [APP_NAME]</h3>
    <div class="search-box">
      <input type="text" placeholder="Buscar..." oninput="filterToc(this)" />
    </div>
    <div class="toc-section">
      <p class="toc-label">General</p>
      <a href="#section-stack">🏗️ Stack Tecnológico</a>
      <a href="#section-flow">🗺️ Flujo de Navegación</a>
      
      <p class="toc-label">Pantallas</p>
      <a href="#screen-home">🏠 Inicio</a>
      <a href="#screen-list">📋 Lista</a>
      <a href="#screen-detail">📄 Detalle</a>

      <p class="toc-label">API & Servicios</p>
      <a href="#section-api-overview">📡 Overview</a>
      <a href="#section-mapping">📊 Tabla de Mapeo</a>
      <a href="#api-resource-get">GET /resource</a>
    </div>
  </nav>

  <!-- MAIN CONTENT -->
  <main>
    <!-- HEADER -->
    <div class="doc-header">
      <h1>📖 [APP_NAME] - Documentación</h1>
      <p class="subtitle">Documentación técnica completa de la aplicación</p>
      <div style="margin-top:.75rem">
        <span class="badge badge-primary">v1.0.0</span>
        <span class="badge badge-info">React + TypeScript</span>
      </div>
    </div>

    <!-- STACK TECNOLÓGICO -->
    <section id="section-stack">
      <h2>🏗️ Stack Tecnológico</h2>
      <div class="stack-grid">
        <div class="stack-card">
          <h4>⚛️ React</h4>
          <p>Librería de UI con componentes funcionales y hooks</p>
        </div>
        <div class="stack-card">
          <h4>📘 TypeScript</h4>
          <p>Tipado estático para mayor robustez</p>
        </div>
        <div class="stack-card">
          <h4>⚡ Vite</h4>
          <p>Build tool ultrarrápido con HMR</p>
        </div>
        <div class="stack-card">
          <h4>🎨 TailwindCSS</h4>
          <p>Framework CSS utility-first</p>
        </div>
      </div>
    </section>

    <!-- FLUJO DE NAVEGACIÓN -->
    <section id="section-flow">
      <h2>🗺️ Flujo de Navegación</h2>
      <div class="mermaid">
        graph LR
          A[🏠 Inicio] --> B[📋 Lista]
          B --> C[📄 Detalle]
      </div>
    </section>

    <!-- PANTALLAS -->
    <section id="screen-home">
      <div class="screen-card">
        <div class="screen-content">
          <div class="screen-id">SCREEN-01</div>
          <h3 class="screen-title">🏠 Pantalla de Inicio</h3>
          <p class="screen-desc">Descripción de la pantalla principal.</p>
          <div class="screen-features">
            <strong>Elementos UI:</strong>
            <ul>
              <li>Hero section con título y CTAs</li>
              <li>Tarjetas de estadísticas</li>
            </ul>
            <strong>Funcionalidades:</strong>
            <ul>
              <li>Navegación a secciones principales</li>
              <li>Visualización de datos destacados</li>
            </ul>
          </div>
          <div class="screen-actions">
            <span class="action-badge"><a href="#api-resource-get">GET /resource</a></span>
            <span class="action-badge nav">→ Lista</span>
          </div>
        </div>
      </div>
    </section>

    <!-- API OVERVIEW -->
    <section id="section-api-overview">
      <h2>🔌 API & Servicios</h2>
      <p style="color:#8b949e">Base URL: <code>https://api.example.com</code></p>
    </section>

    <!-- TABLA DE MAPEO -->
    <section id="section-mapping">
      <h2>📊 Tabla de Mapeo - Pantallas ↔ Endpoints</h2>
      <table class="mapping-table">
        <thead>
          <tr>
            <th>Pantalla</th>
            <th>Endpoint</th>
            <th>Método</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inicio</td>
            <td><a href="#api-resource-get">/resource</a></td>
            <td><span class="method GET">GET</span></td>
            <td>Obtener datos para la pantalla inicial</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ENDPOINTS -->
    <section id="api-resource-get">
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method GET">GET</span>
          <span class="endpoint-path">/resource</span>
        </div>
        <p>Descripción del endpoint.</p>
        <h4>Parámetros</h4>
        <table>
          <thead><tr><th>Parámetro</th><th>Tipo</th><th>Requerido</th><th>Descripción</th></tr></thead>
          <tbody>
            <tr><td>page</td><td>number</td><td>No</td><td>Número de página</td></tr>
          </tbody>
        </table>
        <h4>Respuesta de Ejemplo</h4>
        <pre>{ "results": [...] }</pre>
      </div>
    </section>
  </main>
</div>

<script>
  mermaid.initialize({ startOnLoad:true, theme:'dark' });
  
  function filterToc(el) {
    const q = el.value.toLowerCase();
    document.querySelectorAll('#toc .toc-section a').forEach(a => {
      a.style.display = (q === '' || a.textContent.toLowerCase().includes(q)) ? 'block' : 'none';
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre').forEach(pre => {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copiar';
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
          btn.textContent = '✓ Copiado';
          setTimeout(() => btn.textContent = 'Copiar', 1800);
        });
      });
      wrapper.appendChild(btn);
    });
  });
</script>
</body>
</html>
```

---

## Checklist de Validación

- [ ] HTML válido y renderiza correctamente
- [ ] Mermaid diagram carga (CDN accesible)
- [ ] TOC con búsqueda funcional
- [ ] Todas las pantallas de la app documentadas
- [ ] Todos los endpoints documentados con ejemplos
- [ ] Badges de API enlazan correctamente a secciones
- [ ] Botones de copiar funcionan
- [ ] Responsive (mobile + desktop)
- [ ] Dark theme consistente
- [ ] Textos en español
