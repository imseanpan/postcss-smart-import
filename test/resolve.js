import test from "ava"
import compareFixtures from "./helpers/compare-fixtures"

test("should resolve relative to cwd",
  (t) => compareFixtures(t, "resolve-cwd", {
    path: null,
  })
)

test(`should resolve relative to 'root' option`,
  (t) => compareFixtures(t, "resolve-root", {
    root: "fixtures",
    path: null,
  })
)

test(`should resolve relative to postcss 'from' option`,
  (t) => compareFixtures(t, "resolve-from", {
    path: null,
  }, {
    from: "fixtures/file.css",
  })
)

test(`should resolve relative to 'path' which resolved with cwd`,
  (t) => compareFixtures(t, "resolve-path-cwd", {
    path: "fixtures/imports",
  })
)

test(`should resolve relative to 'path' which resolved with 'root'`,
  (t) => compareFixtures(t, "resolve-path-root", {
    root: "fixtures",
    path: "imports",
  })
)

test("should resolve local modules",
  (t) => compareFixtures(t, "resolve-local-modules", {
    path: null,
  })
)

test("should resolve local modules",
  (t) => compareFixtures(t, "resolve-path-modules", {
    path: "fixtures/imports/modules",
  })
)

test("should be able to consume npm package or local modules",
  (t) => compareFixtures(t, "resolve-modules", {
    path: null,
  }, {
    from: "fixtures/imports/foo.css",
  })
)
