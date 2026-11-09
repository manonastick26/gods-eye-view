/** HTTPS links this edition will show. Anything else is dropped, not rewritten. */
const ALLOWED_HOSTS = new Set([
  'whc.unesco.org',
  'zenodo.org',
  'creativecommons.org',
  'registry.opendata.aws',
  'data.nasa.gov',
  'gmv.cast.uark.edu',
  'www.gnu.org',
  'www.nps.gov',
  'www.cambridge.org',
  'www.antiquity.ac.uk',
  'revistas-filologicas.unam.mx',
  'www.bbc.com',
  'doi.org',
  'www.grandcanyontrust.org',
  'grcahistory.org',
  'www.library.pima.gov',
  'www.discovermagazine.com',
]);

export function safeSourceUrl(value) {
  try {
    const url = new URL(String(value || ''));
    if (url.protocol !== 'https:') return null;
    if (url.username || url.password) return null;
    const host = url.hostname;
    if (host === 'github.com') {
      if (
        url.pathname.startsWith('/geoinfo-smdu/') ||
        url.pathname.startsWith('/awslabs/open-data-registry/')
      )
        return url.href;
      return null;
    }
    if (!ALLOWED_HOSTS.has(host)) return null;
    return url.href;
  } catch {
    return null;
  }
}
