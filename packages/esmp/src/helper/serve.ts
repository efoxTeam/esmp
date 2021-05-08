import internalIp from 'internal-ip'
//
export function getHostname(hostname?:string) {
  /* if (hostname === 'local-ip') {
    hostname = internalIp.v4.sync() || internalIp.v6.sync() || '0.0.0.0'
  } else if (hostname === 'local-ipv4') {
    hostname = internalIp.v4.sync() || '0.0.0.0'
  } else if (hostname === 'local-ipv6') {
    hostname = internalIp.v6.sync() || '::'
  } */
  hostname = internalIp.v4.sync() || internalIp.v6.sync() || '0.0.0.0'
  return hostname
}
/* function getDevHost(host) {
  if (!host) {
    host = internalIp.v4.sync() || internalIp.v6.sync() || 'localhost'
  }
  return host
} */

