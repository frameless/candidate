try {
  // See "Manual highlighting" in the Prism documentation
  // https://prismjs.com/#manual-highlighting
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
} catch (e) {
  // Ignore
}

import 'prismjs/components/prism-core.min.js';
import components from 'prismjs/components.js';
import 'prismjs/components/prism-markup.js';

export const baseURL = 'https://esm.sh/prismjs@1.30.0/';

const cache = new Map();

const getPlugin = (name) => {
  const def = components.languages[name];

  // Some languages have a key in the `languages` object
  if (def) {
    return [name, def];
  }
  // Other languages don't have their own key, but they are listed under `alias` in another language object.
  else {
    const find = Object.entries(components.languages).find(
      // `alias` can be undefined, a string, or an array of strings
      ([_name, x]) => x && Array.isArray(x.alias) && x.alias.includes(name),
    );
    if (find) {
      const [_name, aliasDef] = find;
      return [_name, aliasDef];
    }
  }
  return [];
};

const loadDependencies = (name) => {
  let def = components.languages[name];

  if (!def) {
    const find = Object.entries(components.languages).find(([name, x]) => {
      return Array.isArray(x.alias) ? x.alias.includes(name) : x.alias === name;
    });
    if (find) {
      const [_name, aliasDef] = find;
      name = _name;
      def = aliasDef;
    }
  }
  if (components.languages[name]) {
    const require = components.languages[name].require;
    const dependencies = typeof require === 'string' ? [require] : Array.isArray(require) ? require : [];
    return Promise.all(dependencies.map((name) => loadLanguage(name)));
  }
};

export const loadLanguage = async (name) => {
  const [_name] = getPlugin(name);

  await loadDependencies(_name);
  if (cache.has(_name)) {
    return cache.get(_name);
  } else {
    const loader = import(`../node_modules/prism/components/prism-${_name}.js`);
    cache.set(_name, loader);
    return loader;
  }
};
