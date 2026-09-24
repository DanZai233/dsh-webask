/**
 * dsh-webask — host half.
 *
 * WebAsk is presentation-only: everything it does happens in the browser (a
 * composer affordance, a global palette, and a settings tab). The host half
 * therefore registers no service, tool, or HTTP route.
 *
 * It still has to exist. The Loader mounts a composition entry by importing the
 * package root, and `exports["./client"]` is what makes the browser bundle
 * discoverable; a package without this file has nothing to resolve.
 */

export const name = 'dsh-webask';

/** No host-side service is required. */
export const inject = [];

export function apply() {
  // Intentionally empty — the client half owns all behaviour.
}
