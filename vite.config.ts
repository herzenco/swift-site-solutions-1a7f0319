import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const Renderer = vitePrerender.PuppeteerRenderer;

// Routes to prerender for SEO
const routesToPrerender = [
  "/",
  "/use-cases/real-estate",
  "/use-cases/professional-services",
  "/use-cases/home-services",
  "/use-cases/education-coaching",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    command === "serve" && mode === "development" && componentTagger(),
    // Prerender marketing pages for SEO during production build
    command === "build" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: routesToPrerender,
        renderer: new Renderer({
          renderAfterDocumentEvent: "render-event",
          headless: true,
        }),
        postProcess(renderedRoute: { html: string }) {
          // Add data-prerendered attribute to help identify prerendered pages
          renderedRoute.html = renderedRoute.html.replace(
            /<html/,
            '<html data-prerendered="true"'
          );
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
