import resolve from "resolve"

var moduleDirectories =
[
  "web_modules",
  "node_modules"
]

function resolveModule(id, opts)
{
  return new Promise(function(res, rej)
  {
    resolve(id, opts, function(err, path)
    {
      if (err)
        return rej(err)

      res(path)
    })
  })
}

export default function(id, base, options)
{
  var paths = options.path

  var resolveOpts =
  {
    basedir: base,
    moduleDirectory: moduleDirectories,
    paths: paths,
    extensions: [ ".css", ".sss", ".less", ".scss", ".sass" ],
    packageFilter: function processPackage(pkg)
    {
      if (pkg.style) {
        pkg.main = pkg.style
      }
      else if (pkg.browser) {
        pkg.main = pkg.browser
      }
      else if (!pkg.main || !/\.css$/.test(pkg.main)) {
        pkg.main = "index.css"
      }
      return pkg
    }
  }

  return resolveModule("./" + id, resolveOpts)
    .catch(function() {
      return resolveModule(id, resolveOpts)
    })
    .catch(function() {
      if (paths.indexOf(base) === -1) {
        paths.unshift(base)
      }

      throw new Error([
        "Failed to find '" + id + "'",
        "in [ ",
        "    " + paths.join(",\n        "),
        "]",
      ].join("\n    "))
    })
}
