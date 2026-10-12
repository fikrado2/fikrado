import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Node >= 22 ships its own `localStorage` global that stays `undefined` unless
// `--localstorage-file` is passed. That own accessor shadows jsdom's
// implementation, so anything reading `window.localStorage` in a test sees
// `undefined` instead of a working store.
//
// Install a minimal in-memory replacement only when that is what we are given,
// and leave a real implementation untouched. Individual tests can still mock
// the property to simulate blocked storage.
const memoryStores: { localStorage?: Storage; sessionStorage?: Storage } = {};

function createMemoryStorage(): Storage {
  const entries = new Map<string, string>();

  return {
    get length() {
      return entries.size;
    },
    key: (index: number) => [...entries.keys()][index] ?? null,
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, String(value));
    },
    removeItem: (key: string) => {
      entries.delete(key);
    },
    clear: () => entries.clear(),
  };
}

for (const name of ["localStorage", "sessionStorage"] as const) {
  if (typeof window[name] !== "undefined") continue;

  Object.defineProperty(window, name, {
    configurable: true,
    get: () => (memoryStores[name] ??= createMemoryStorage()),
  });
}