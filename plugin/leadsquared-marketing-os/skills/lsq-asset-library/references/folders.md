# Folder model

- Industry folders: built in (`Education`, `Healthcare`, `Fintech / BFSI`, shared `Cross-segment`) plus any `folders` doc with `industry: null` (its `name` is the segment value).
- Inside each industry: four type folders, from the asset's `type`: Creative, Copy, Enablement, Docs (`Doc`).
- Custom folders: `folders` docs with `industry: "<key>"` and `parent`: `null` (directly in the industry), `"t:<Type>"` (inside that type folder), or another folder id (nested). Up to 4 levels: industry > folder > folder > folder.
- Industry keys: `education`, `healthcare`, `fintech`, `shared`, or `x_<name in snake_case>` for created industries (e.g. `x_product_marketing`).
- Older folder docs without `industry`: `{name, parent: null}` is an industry; `{name, parent: "<industry key>"}` is a folder directly in it.
- To file into a custom folder: set `segment` to the industry's segment value and `subfolder` to the folder id. If the folder sits under a type folder (`t:Copy`), set `type` to match.
