const scripts = browser.runtime.getManifest().web_accessible_resources.filter((name) => {
  return /.js$/.test(name);
});

const next = () => {
  const script = scripts.shift();
  if (!script) {
    return;
  }

  const s = document.createElement("script");
  s.setAttribute("src", browser.extension.getURL(script));
  s.addEventListener("load", next);
  document.documentElement.appendChild(s);
};

const load = next;

export default { load };
