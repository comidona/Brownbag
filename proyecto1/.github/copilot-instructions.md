# 🎨 Instrucciones de Desarrollo - Design System & Reglas de Diseño

## 🧭 Índice rápido (human-readable)
- **Objetivo del archivo**: definir estándares de UI, código y diseño para que la app sea consistente.
- **1) Información del proyecto**: stack, idioma y enfoque general.
- **2) Design system**: paleta, reglas de color, cards y animaciones.
- **3) Convenciones y reglas**: estructura de carpetas, patrones de código y regla de personajes.
- **4) Tema e i18n**: sistema dark/light y textos en español.
- **5) Scripts y documentación**: utilidades reutilizables y guía para `DOCUMENTATION.html`.
- **6) Checklist final**: validaciones mínimas antes de cerrar una feature.

## Información del Proyecto
- **Stack Tecnológico**: React + TypeScript + Vite + TailwindCSS
- **Idioma de respuesta**: ESPAÑOL (siempre responder en castellano)
- **Tipografía principal**: `Space Grotesk` (importar desde Google Fonts)
- **Enfoque**: Aplicaciones web modernas con APIs REST públicas

---

## 🎨 Design System - Paleta de Colores

### Tema Oscuro (Principal)
```css
:root {
  --bg-primary: #0a0e17;        /* Fondo principal */
  --bg-surface: #111827;        /* Tarjetas y paneles */
  --bg-surface-light: #1e293b;  /* Inputs, elementos elevados */
  --bg-surface-lighter: #334155; /* Bordes, dividers */
  --text-primary: #f1f5f9;      /* Texto principal */
  --text-secondary: #94a3b8;    /* Texto secundario */
  --text-muted: #64748b;        /* Texto muted */
  --accent-primary: #44FF00;    /* Verde portal - acento principal */
  --accent-secondary: #00B5CC;  /* Cyan glow - acento secundario */
  --accent-gradient: linear-gradient(135deg, #44FF00, #00B5CC);
  --danger: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --border: #1e293b;
}
```

### Tema Claro
```css
:root.light {
  --bg-primary: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-light: #f1f5f9;
  --bg-surface-lighter: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --accent-primary: #44FF00;
  --accent-secondary: #00B5CC;
  --border: #e2e8f0;
}
```

### Reglas de Uso de Colores:
1. **Botones primarios**: Gradiente `from-[#44FF00] to-[#2DB800]` con `text-black`
2. **Botones secundarios**: Border con `border-slate-600` (dark) o `border-slate-300` (light)
3. **Links y acentos**: `text-[#44FF00]` para links activos
4. **Hover en cards**: `box-shadow: 0 12px 40px rgba(68, 255, 0, 0.15)` (dark)
5. **Badges de estado**: Verde para activo, rojo para inactivo, gris para desconocido
6. **Gradientes en headers/hero**: `from-[#0a0e17] via-[#0d1525] to-[#0a1a1a]` (dark)

---

## 🧩 Estructura de Componentes

### Layout Principal
- **Navbar**: Sticky top, backdrop-blur, con logo + links + theme toggle + avatar
- **Footer**: Border-top, centrado, texto muted con créditos
- **Responsive**: Mobile hamburger menu o scroll horizontal de tabs

### Patrón de Tarjetas (Card)
```tsx
// Clase recomendada para cards
className={`rounded-2xl overflow-hidden card-hover ${
  isDark 
    ? 'bg-[#111827] border border-slate-800' 
    : 'bg-white border border-slate-200 shadow-sm'
}`}
```

### Animaciones Requeridas
```css
/* Portal glow - para elementos destacados */
@keyframes portalGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(68, 255, 0, 0.3); }
  50% { box-shadow: 0 0 30px rgba(68, 255, 0, 0.5); }
}

/* Float - para iconos hero */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

---

## 📐 Convenciones de Código

### Nomenclatura de Archivos
- Páginas: `PascalCase.tsx` (ej: `CharacterDetail.tsx`)
- Componentes: `PascalCase.tsx` (ej: `Layout.tsx`)
- Servicios: `camelCase.ts` (ej: `api.ts`)
- Hooks: `camelCase.ts` con prefijo `use` (ej: `useFetch.ts`)
- Types: `index.ts` dentro de carpeta `types/`

### Estructura de Carpetas
```
src/
├── components/     # Componentes reutilizables
├── pages/          # Páginas/vistas
├── services/       # Llamadas a API
├── hooks/          # Custom hooks
├── types/          # TypeScript interfaces
├── context/        # React Context (tema, auth, etc.)
├── App.tsx         # Router principal
├── main.tsx        # Entry point
└── index.css       # Tailwind + custom CSS
```

### Patrones de Código
- **Siempre usar** TypeScript strict
- **Siempre incluir** loading states con skeletons (no spinners genéricos)
- **Siempre incluir** empty states con emojis y mensajes descriptivos
- **Siempre incluir** error handling en fetches
- **Usar** `useFetch` hook para data fetching
- **Preferir** componentes funcionales con hooks sobre clases
- **Usar** React Router v6 para navegación

### Regla de diseño (Personajes)
- **Obligatorio**: cuando se muestren personajes, usar **tarjetas con foto** (card/grid layout).
- **Listas de personajes**: quedan **reemplazadas/deprecadas** y no deben usarse en nuevas implementaciones ni refactors.

### Patrón de Servicio API
```typescript
// Siempre usar un servicio centralizado
const BASE_URL = 'https://api.example.com';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
```

---

## 🌗 Sistema de Temas

### Implementación obligatoria:
1. Usar React Context para el tema (`ThemeContext`)
2. Persistir preferencia en `localStorage`
3. Toggle visible en navbar (☀️/🌙)
4. Transiciones suaves entre temas (`transition: background-color 0.3s, color 0.3s`)

### Patrón de uso del tema en componentes:
```tsx
const { theme } = useTheme();
const isDark = theme === 'dark';

// Condicionar clases según tema
className={isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-slate-50 text-slate-900'}
```

---

## 📝 Internacionalización
- Todos los textos de UI **en español**
- Usar terminología consistente:
  - Characters → Personajes
  - Episodes → Episodios
  - Locations → Ubicaciones
  - Search → Buscar
  - Next → Siguiente
  - Previous → Anterior
  - Favorites → Favoritos

---

## Scripts Reutilizables

En la carpeta `.github/scripts/` se encuentran utilidades reutilizables:

### 1. `api-helper.ts` - Wrapper de Fetch con manejo de errores
Ubicación: `.github/scripts/api-helper.ts`
Copiar a `src/services/` cuando se necesite.

### 2. `use-fetch.ts` - Hook genérico de data fetching
Ubicación: `.github/scripts/use-fetch.ts`
Copiar a `src/hooks/` cuando se necesite.

### 3. `theme-context.tsx` - Context de tema claro/oscuro
Ubicación: `.github/scripts/theme-context.tsx`
Copiar a `src/context/` cuando se necesite.

---

## 📊 Documentación

### Generación de Documentación:
Cuando se solicite documentar la aplicación, seguir las instrucciones de `DOCUMENTATION_PROMPT.md`
y usar el template de `DOCUMENTATION_TEMPLATE.md`.

La documentación se genera como un **único archivo HTML** (`docs/DOCUMENTATION.html`) que incluye:
- Tecnología utilizada
- Diagrama de flujo Mermaid
- Descripción de cada pantalla
- Documentación de API/servicios consumidos
- Todo navegable por tabla de contenidos
- Dark theme con la paleta del proyecto

---

## ✅ Checklist de Desarrollo

Antes de dar por terminada una feature:
- [ ] Funciona en tema claro y oscuro
- [ ] Loading states implementados (skeletons)
- [ ] Empty states con mensajes claros
- [ ] Responsive (mobile + desktop)
- [ ] Error handling en llamadas API
- [ ] Textos en español
- [ ] TypeScript sin errores
- [ ] Animaciones suaves en hover/transiciones


---

## ⚠️ Errores de compilación a evitar 

### Caso real detectado
En una edición automática de `Home.tsx` se insertaron fragmentos sueltos de objetos JSX/TS fuera de su bloque (`{ label: ... }`, `{ to: ... }`), dejando arrays incompletos y llaves desbalanceadas.
Esto rompió la compilación con errores `TS1005`, `TS1128` y `TS1381`.

### Caso real detectado #2
Al integrar `useFetch`, se pasó un `fetcher` inline en cada render y el hook dependía de esa referencia cambiante.
Esto generó un bucle de ejecución del `useEffect`, múltiples requests simultáneos y errores en runtime:
- `net::ERR_INSUFFICIENT_RESOURCES`
- `Maximum update depth exceeded`

### 🚨 Advertencia crítica (obligatoria)
**Nunca** usar funciones `fetcher` inline como dependencia directa del efecto dentro de `useFetch`.
Si el hook depende de una referencia que cambia en cada render, se dispara un bucle de peticiones.

Patrón obligatorio:
- `deps` estables para refrescar (`[page]`, `[id]`, filtros serializados estables).
- Referencia interna con `useRef` para el `fetcher` cuando sea necesario.
- Si se detectan requests repetidos en consola, detener cambios y corregir dependencias antes de continuar.

### Regla obligatoria para futuras ejecuciones
1. **Si se modifica un bloque repetitivo (arrays `.map`, secciones JSX largas), reemplazar el bloque completo**, no insertar líneas aisladas en múltiples parches.
2. **Después de cada edición en páginas React, ejecutar validación inmediata** (`npm run build` o al menos revisar errores TS) antes de continuar con más cambios.
3. **Si aparece un error de sintaxis en cascada**, rehacer la sección completa del componente afectado en un único parche limpio.
4. **No dejar cambios intermedios parcialmente aplicados** cuando hay conflicto de contexto en `apply_patch`.
5. **En hooks de fetch, no depender directamente de funciones inline inestables** para disparar efectos.
6. **Cuando se use `useFetch`, controlar re-ejecución con `deps` estables** (ej: `[page]`, `[id]`) y usar referencia interna (`useRef`) para el `fetcher`.
7. **Si aparecen muchas llamadas repetidas en consola**, detener y revisar de inmediato dependencias de `useEffect`/`useCallback`.

### Validación rápida recomendada
```bash
npm run build
```

### Plantilla de recuperación rápida (cuando un `.tsx` se rompe)
Usar este flujo sin improvisar:
1. **Detener nuevas ediciones** en otros archivos.
2. **Abrir archivo afectado completo** y ubicar el primer error TS de sintaxis.
3. **Reemplazar bloque completo** (no editar líneas sueltas) para:
  - arrays renderizados con `.map(...)`
  - secciones JSX con anidación profunda
  - retornos condicionales grandes
4. **Verificar balance de llaves/paréntesis** antes del siguiente parche.
5. **Compilar inmediatamente** con `npm run build`.
6. Solo si compila, continuar con el siguiente cambio.

---

## 🚀 Aplicación rápida de reglas de diseño (modo eficaz)

### Protocolo Express (5 pasos)
1. **Tema primero**: confirmar `ThemeContext` + `localStorage` + toggle visible en navbar.
2. **Tokens visuales**: aplicar paleta y tipografía base en `src/index.css` (sin colores fuera de design system).
3. **Datos**: usar servicio centralizado (`src/services/api.ts`) + `useFetch` para pantallas de datos.
4. **UX obligatoria**: validar en cada pantalla `loading + empty + error`.
5. **Cierre técnico**: ejecutar `npm run build` y corregir antes de seguir.

### Mapa rápido de archivos clave
- `src/index.css` → tokens, tipografía, transiciones, animaciones.
- `src/context/ThemeContext.tsx` → tema global y persistencia.
- `src/components/Layout.tsx` → navbar sticky, toggle tema, navegación y footer.
- `src/pages/*.tsx` → textos en español, estados UI y comportamiento responsive.
- `src/services/api.ts` + `src/hooks/useFetch.ts` → patrón de consumo API y manejo de errores.

### Criterio de aceptación mínimo por feature
- Compila (`npm run build`).
- No rompe tema claro/oscuro.
- Mantiene terminología de diseño en español (Personajes, Episodios, Ubicaciones, Buscar, Siguiente, Anterior).
- No introduce estilos fuera del design system.

