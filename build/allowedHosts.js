/**
 * Host header allowlist for the Vite dev/preview server. The configuration
 * factory passes the configured names in; this module reads no environment.
 *
 * Binding to a wildcard interface only controls which network interfaces accept
 * connections. It must not turn into a wildcard Host-header policy: this server
 * brokers configured API keys through local proxy routes.
 */

import { isIP } from 'node:net';

export const DEFAULT_ALLOWED_HOSTS = Object.freeze(['localhost', '127.0.0.1']);

const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

/**
 * Host value safe to put in Vite's config for this edition.
 * `GEV_CONTAINER_BIND=1` is only the Docker launcher: compose publishes
 * `127.0.0.1:4173:4173`, so the process inside the container must accept the
 * docker bridge. Every other launch is forced onto loopback.
 * @param {string|undefined|null} requested
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string}
 */
export function loopbackConfigHost(requested, env = process.env) {
  if (env.GEV_CONTAINER_BIND === '1')
    return String(requested || '0.0.0.0').trim() || '0.0.0.0';
  const host = String(requested || '')
    .trim()
    .toLowerCase();
  if (LOOPBACK_HOSTS.has(host)) return host;
  return '127.0.0.1';
}

/**
 * Whether a bound server address is loopback. Node reports the address it
 * actually opened, which is how a `--host 0.0.0.0` override is caught.
 * @param {string|{address?: string}|null|undefined} address
 * @returns {boolean}
 */
export function isLoopbackListenAddress(address) {
  const raw =
    address && typeof address === 'object' ? address.address : address;
  let host = String(raw || '')
    .trim()
    .toLowerCase();
  if (host.startsWith('::ffff:')) host = host.slice('::ffff:'.length);
  return host === '127.0.0.1' || host === '::1' || host === 'localhost';
}

/**
 * Resolve Vite's allowedHosts setting from an optional comma-separated list.
 * Empty entries and suffix/wildcard entries are ignored; repeated names keep
 * their first occurrence. Vite treats leading-dot values as suffix wildcards,
 * which would defeat an explicit host policy.
 *
 * @param {string|undefined|null} configuredHosts
 * @returns {string[]}
 */
export function resolveAllowedHosts(configuredHosts) {
  const hosts = String(configuredHosts ?? '')
    .split(',')
    .map((host) => host.trim())
    .filter((host) => host && !host.startsWith('.') && !host.includes('*'));
  return [...new Set([...DEFAULT_ALLOWED_HOSTS, ...hosts])];
}

/**
 * Whether a Host header names a host the server answers, by Vite's own rule:
 * IP addresses, `localhost` and `*.localhost` always; then `additional` names
 * (the configured server host) and `allowedHosts` (a leading dot allows a
 * domain and its subdomains). `allowedHosts === true` allows every host.
 *
 * @param {string|undefined} hostHeader
 * @param {string[]|true} allowedHosts
 * @param {string[]} [additional]
 * @returns {boolean}
 */
export function isAllowedHost(hostHeader, allowedHosts, additional = []) {
  if (allowedHosts === true) return true;
  const host = String(hostHeader ?? '').trim();
  if (!host) return false;
  if (host[0] === '[') {
    const end = host.indexOf(']');
    return end > 0 && isIP(host.slice(1, end)) === 6;
  }
  const colon = host.indexOf(':');
  const hostname = (colon === -1 ? host : host.slice(0, colon)).toLowerCase();
  if (isIP(hostname) === 4) return true;
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) return true;
  if (additional.includes(hostname)) return true;
  return (allowedHosts || []).some(
    (allowed) =>
      allowed === hostname ||
      (allowed[0] === '.' &&
        (allowed.slice(1) === hostname || hostname.endsWith(allowed))),
  );
}

/**
 * Vite plugin that applies the Host check before every other middleware.
 * Vite installs its own check after the middleware plugins add in
 * `configureServer`, so without this the app's `/api` routes would answer any
 * Host, including a DNS-rebinding name. It runs first (`enforce: 'pre'`) and
 * uses the same allowed hosts as Vite, on the dev and preview servers.
 */
/**
 * Close the server if it is not bound to loopback. Vite's CLI `--host` flag
 * overrides `server.host`, so the config value alone cannot keep a PC launch
 * off the LAN. The Docker launcher sets `GEV_CONTAINER_BIND=1` first.
 */
export function loopbackBindPlugin() {
  const arm = (server) => {
    const httpServer = server.httpServer;
    if (!httpServer) return;
    httpServer.on('listening', () => {
      if (process.env.GEV_CONTAINER_BIND === '1') return;
      const address = httpServer.address();
      if (isLoopbackListenAddress(address)) return;
      const where =
        address && typeof address === 'object'
          ? `${address.address}:${address.port}`
          : String(address);
      console.error(
        `[security] Refusing ${where}. This edition listens only on 127.0.0.1 and ::1. Do not pass --host or set HOST=0.0.0.0.`,
      );
      httpServer.close(() => {
        process.exit(1);
      });
    });
  };
  return {
    name: 'gev-loopback-only',
    configureServer: arm,
    configurePreviewServer: arm,
  };
}

export function hostCheckPlugin() {
  const middleware = (config, preview) => {
    const allowed = preview
      ? config.preview.allowedHosts
      : config.server.allowedHosts;
    const additional = [config.server.host, config.preview.host].filter(
      (value) => typeof value === 'string' && value,
    );
    return (req, res, next) => {
      if (isAllowedHost(req.headers.host, allowed, additional)) return next();
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Blocked request. This host is not allowed.');
    };
  };
  return {
    name: 'host-check',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(middleware(server.config, false));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server.config, true));
    },
  };
}
