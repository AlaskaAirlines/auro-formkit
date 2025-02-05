# Semantic Release Automated Changelog

# [2.0.0-beta.33](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2025-02-05)


### Bug Fixes

* form event listeners ([531752b](https://github.com/AlaskaAirlines/auro-formkit/commit/531752b3d6fec481ccebf5e0feef00ef539080c2))
* **form:** try `.value` first when initializing state keys ([a9c373a](https://github.com/AlaskaAirlines/auro-formkit/commit/a9c373abab1550be0286d3d0df71c1f4373ceaa4))


### Features

* make form pickup combobox input ([47aa6fe](https://github.com/AlaskaAirlines/auro-formkit/commit/47aa6fe6be3441678242876cda602a385f2b465d))

# [2.0.0-beta.32](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2025-02-04)


### Bug Fixes

* styling for mobile Datepicker ([7c43db9](https://github.com/AlaskaAirlines/auro-formkit/commit/7c43db9a4aff2903911bd726e244290f437f0ce5))
* update container query per design spec ([5509027](https://github.com/AlaskaAirlines/auro-formkit/commit/55090272a8cedc847292edb53924bc316fe58075))

# [2.0.0-beta.31](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2025-01-31)


### Bug Fixes

* add margin only when the slotted node has contents [#271](https://github.com/AlaskaAirlines/auro-formkit/issues/271) ([7ef1ef8](https://github.com/AlaskaAirlines/auro-formkit/commit/7ef1ef8b38b2be55a0b6fef22cb4dbc7c789e31d))

# [2.0.0-beta.30](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2025-01-30)


### Bug Fixes

* check deep nested slots with recusive function ([6ab4435](https://github.com/AlaskaAirlines/auro-formkit/commit/6ab4435c155e75f1075963484d14c5d9db9ea326))


### Features

* enhance dropdown rendering with value, label, and help text slots [#250](https://github.com/AlaskaAirlines/auro-formkit/issues/250) ([7a14d3e](https://github.com/AlaskaAirlines/auro-formkit/commit/7a14d3eef033ea33ce5ae85da766df6224ae3a0a))

# [2.0.0-beta.29](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2025-01-30)


### Bug Fixes

*  update visibility when re-rendered [`auro-helptext`] ([f6bf6b7](https://github.com/AlaskaAirlines/auro-formkit/commit/f6bf6b750bebddf4ec2f967d0acf5a195f067bab))
* fix build failure ([7721f7f](https://github.com/AlaskaAirlines/auro-formkit/commit/7721f7ff5be1a68f26b7a9b5724a87d67e4ed4f2))


### Features

* add `helptext` component (internal use only) ([66747a0](https://github.com/AlaskaAirlines/auro-formkit/commit/66747a09ecde24cf209c225369197c6190e51adf))

# [2.0.0-beta.28](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2025-01-30)


### Bug Fixes

* breaking builds in gh actions ([1046717](https://github.com/AlaskaAirlines/auro-formkit/commit/1046717c08d67fbde9966e5b583ff0adef9a4853))
* handle early input and validity ([6df5c6d](https://github.com/AlaskaAirlines/auro-formkit/commit/6df5c6d9f038f308263ed310455c3e6f62dba992))


### Features

* expose `reset` event and a couple internal states ([c72379b](https://github.com/AlaskaAirlines/auro-formkit/commit/c72379b02ba3e9eb830303786c60e6621e22707b))


### Performance Improvements

* rebase package lock ([385eeb6](https://github.com/AlaskaAirlines/auro-formkit/commit/385eeb6424a44307741c7833f235ed08e5ea974e))

# [2.0.0-beta.27](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2025-01-29)


### Bug Fixes

* update config index with exports [#283](https://github.com/AlaskaAirlines/auro-formkit/issues/283) ([35af251](https://github.com/AlaskaAirlines/auro-formkit/commit/35af251bfbcbc7cc0d74c56c9f0ef35f6afbb50d))
* update postinstall script to use reliable dependency path ([fa0607f](https://github.com/AlaskaAirlines/auro-formkit/commit/fa0607faea8a5bab9c78f4d0ee82bc05864eb2b0))

# [2.0.0-beta.26](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2025-01-28)


### Bug Fixes

* add display block to auro-dropdown in counter-group styles [#249](https://github.com/AlaskaAirlines/auro-formkit/issues/249) ([558aa17](https://github.com/AlaskaAirlines/auro-formkit/commit/558aa1733792b33d828b61e524757d0319df3a1c))

# [2.0.0-beta.25](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2025-01-28)


### Bug Fixes

* update counter tests to use initial values in markup and ensure HTMLButtonElement before focusing [#202](https://github.com/AlaskaAirlines/auro-formkit/issues/202) ([193b4ee](https://github.com/AlaskaAirlines/auro-formkit/commit/193b4ee599c08a650dc399e1695d6a3c331629f8))


### Performance Improvements

* add increment and decrement disable functionality, and create tests [#202](https://github.com/AlaskaAirlines/auro-formkit/issues/202) ([8ea3afb](https://github.com/AlaskaAirlines/auro-formkit/commit/8ea3afb8ebed273472d771eeefebfab9172af438))

# [2.0.0-beta.24](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2025-01-24)


### Bug Fixes

* make datepicker's height the same as other components' height [#271](https://github.com/AlaskaAirlines/auro-formkit/issues/271) ([40f206d](https://github.com/AlaskaAirlines/auro-formkit/commit/40f206dd135eff95ab24012be54db80320c1b190))

# [2.0.0-beta.23](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2025-01-24)


### Bug Fixes

* bad datepicker test ([8d4d4a3](https://github.com/AlaskaAirlines/auro-formkit/commit/8d4d4a39ff2e8f565f18d42f6d13364bc3ce827f))

# [2.0.0-beta.22](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2025-01-24)


### Features

* datepicker array values ([6c8deb7](https://github.com/AlaskaAirlines/auro-formkit/commit/6c8deb7942b51fc90428b8b3a14257a7ffb036c1))
* datepicker range support ([d235a68](https://github.com/AlaskaAirlines/auro-formkit/commit/d235a681340ab539e1191ba56acd48d6214d3383))

# [2.0.0-beta.21](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2025-01-24)


### Bug Fixes

* remove duplicate package.json entry ([be9b60f](https://github.com/AlaskaAirlines/auro-formkit/commit/be9b60f3d7c3f030ddaef509253658790fab7aab))
* wrap values as array ([bde8d4a](https://github.com/AlaskaAirlines/auro-formkit/commit/bde8d4a5944e6e90f76c5327a123b31fdfdafa3b))

# [2.0.0-beta.20](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2025-01-23)


### Bug Fixes

* reset `validity` when resetting `value` [#260](https://github.com/AlaskaAirlines/auro-formkit/issues/260) ([47eb399](https://github.com/AlaskaAirlines/auro-formkit/commit/47eb39960875e0a5d6c6686e71675a3eca2d261f))

# [2.0.0-beta.19](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2025-01-22)


### Bug Fixes

* pass correct paramenter to `validate` ([6d947a3](https://github.com/AlaskaAirlines/auro-formkit/commit/6d947a3fb321fbd2f18730868d1121e27e58a651))


### Features

* add public `validate` function in each components [#246](https://github.com/AlaskaAirlines/auro-formkit/issues/246) ([cb37af5](https://github.com/AlaskaAirlines/auro-formkit/commit/cb37af58b679df066f335e45d5f6db93df5db43d))

# [2.0.0-beta.18](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2025-01-18)


### Bug Fixes

* **form:** remove temporary styling ([1200922](https://github.com/AlaskaAirlines/auro-formkit/commit/1200922634cd6c7f74414585a3dd19aa29872cee))


### Features

* **form:** add submit connection ([b3fc7a4](https://github.com/AlaskaAirlines/auro-formkit/commit/b3fc7a4a47eed1f560e8d937c98fb7b285536f7d))
* **form:** connect .reset() to reset buttons ([79c7c3d](https://github.com/AlaskaAirlines/auro-formkit/commit/79c7c3df03c07372833cff1b5ba43921bc2c1251))

# [2.0.0-beta.17](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2025-01-18)


### Features

* counter group dropdown variant [#179](https://github.com/AlaskaAirlines/auro-formkit/issues/179) ([fe09f66](https://github.com/AlaskaAirlines/auro-formkit/commit/fe09f662decc331efcc41cad62eb94285573022a))

# [2.0.0-beta.16](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2025-01-17)


### Bug Fixes

* **form:** address group feedback ([1743430](https://github.com/AlaskaAirlines/auro-formkit/commit/174343098dfffb2cb005bc408d9b6779bbe401bf))
* **form:** make form validity only return valid or invalid ([4bd2e65](https://github.com/AlaskaAirlines/auro-formkit/commit/4bd2e6543d195f0dae1a8ec4efd28ee90f14cf26))
* **form:** pr feedback ([dbee3a9](https://github.com/AlaskaAirlines/auro-formkit/commit/dbee3a900aee30e1391c0a6410b561c1ab2a5f9e))


### Features

* implement a very basic MVP form element ([1316508](https://github.com/AlaskaAirlines/auro-formkit/commit/1316508f479d429bf6eb96845301793da12a0946))
* implement initial event listeners ([73e083a](https://github.com/AlaskaAirlines/auro-formkit/commit/73e083a4d7520a30d1867fa104ad02412c23cd59))

# [2.0.0-beta.15](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2025-01-17)


### Bug Fixes

* remove extra css selector ([c5b2dce](https://github.com/AlaskaAirlines/auro-formkit/commit/c5b2dce6095a7afbe2940dcb908b87583f45d20f))
* update color token for active and hover states ([8cb23dc](https://github.com/AlaskaAirlines/auro-formkit/commit/8cb23dc48c1330703a48695c165117d8e831702d))

# [2.0.0-beta.14](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2025-01-17)


### Features

* enhance AuroCounterGroup to include total value and update value structure to support auro-form [#200](https://github.com/AlaskaAirlines/auro-formkit/issues/200) ([b7f8eda](https://github.com/AlaskaAirlines/auro-formkit/commit/b7f8eda10669714afa01e15c05efd86faa272dd5))

# [2.0.0-beta.13](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2025-01-17)


### Bug Fixes

* resolve console error during testing [#85](https://github.com/AlaskaAirlines/auro-formkit/issues/85) ([aa15e31](https://github.com/AlaskaAirlines/auro-formkit/commit/aa15e315f25cca72ebc4ce1dcce7269c8b043d90))

# [2.0.0-beta.12](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2025-01-17)


### Features

* add combobox autocomplete=off functionality [#109](https://github.com/AlaskaAirlines/auro-formkit/issues/109) ([8cab9dd](https://github.com/AlaskaAirlines/auro-formkit/commit/8cab9ddf73c6afb0f5de99ab9f6c592d64f6ca8b))


### Performance Improvements

* force focus into html5 input for combobox [#143](https://github.com/AlaskaAirlines/auro-formkit/issues/143) ([89c2323](https://github.com/AlaskaAirlines/auro-formkit/commit/89c2323530b79f5c9c55527cce5f6be19288ef1a))

# [2.0.0-beta.11](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2025-01-17)


### Bug Fixes

* add multiselect attribute to select ([e37d424](https://github.com/AlaskaAirlines/auro-formkit/commit/e37d42453c721841a1589316c7fdef9689351002))
* combobox returns array ([aca8bbe](https://github.com/AlaskaAirlines/auro-formkit/commit/aca8bbe17b6dffbfe005f4ee8135b1120fb280b7))
* handle preset values in select ([c60d29a](https://github.com/AlaskaAirlines/auro-formkit/commit/c60d29a9ceeb0475f1723da5e35d329c1d893af8))
* menu api updates ([c507594](https://github.com/AlaskaAirlines/auro-formkit/commit/c507594035b052680100f61467877c15cc885095))
* programmatic updates & mutlisect ([ac4d49a](https://github.com/AlaskaAirlines/auro-formkit/commit/ac4d49a4aadf34d847ec012d33f64a9eba98a4df))
* update combobox to work with new menu api ([e49d6fe](https://github.com/AlaskaAirlines/auro-formkit/commit/e49d6fe269125224b9dbbedd598af5b292031ff0))
* update Select to work with updated Menu API ([63b0f12](https://github.com/AlaskaAirlines/auro-formkit/commit/63b0f12bfca623f268b6d6c951934a26396b9a79))

# [2.0.0-beta.10](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2025-01-17)


### Bug Fixes

* make calendar render correctly when maxDate is set [#170](https://github.com/AlaskaAirlines/auro-formkit/issues/170) ([a912b52](https://github.com/AlaskaAirlines/auro-formkit/commit/a912b52a1b74802ada4a51718dc2232142bebf87))

# [2.0.0-beta.9](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2025-01-16)


### Features

* add IconUtil for SVG icon generation [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([4f5d55f](https://github.com/AlaskaAirlines/auro-formkit/commit/4f5d55f5959d302c6ac48efdee0f33fa5909a34c))
* adjust description slot logic and colors [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([79cde62](https://github.com/AlaskaAirlines/auro-formkit/commit/79cde624e9d223dfd4963b5be76b3eb8d5cab08c))
* counter group added with counter refactor, docs, and validation [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([2b34587](https://github.com/AlaskaAirlines/auro-formkit/commit/2b34587e7e873674a86009d9fa90b3c656dee62c))
* counter value, min, and max with button disable state [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([7df2b00](https://github.com/AlaskaAirlines/auro-formkit/commit/7df2b00ca2f46522139a5b99f26ac50429964dc4))
* dropdown version build fix [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([15f2109](https://github.com/AlaskaAirlines/auro-formkit/commit/15f2109ac792e607759ddd79a3556ecd3754da37))
* enhance dispatch event [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([4511e9b](https://github.com/AlaskaAirlines/auro-formkit/commit/4511e9b5c13a7a6a203bf9a314e35a3806838381))
* handle potential NaN values from Number conversion [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([2cae200](https://github.com/AlaskaAirlines/auro-formkit/commit/2cae2000c5cc6c27333c7ecba1ecf8341e9689ea))
* hide props used only by group [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([a35a09d](https://github.com/AlaskaAirlines/auro-formkit/commit/a35a09d355466bbd2f6cc61f6014c414c21a683b))
* initial component styles and structure [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([ad6b77d](https://github.com/AlaskaAirlines/auro-formkit/commit/ad6b77d94a8855765a93a5805c3c1e10e4f68bff))
* refactor button styles and add counter validation [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([ef46ddd](https://github.com/AlaskaAirlines/auro-formkit/commit/ef46dddff08e55270326f2aefb520bb101677135))
* simplify AuroCounterGroup by removing noValidate property and updating method names [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([231f110](https://github.com/AlaskaAirlines/auro-formkit/commit/231f110988fb8c27356ffec1f44b6b8b99a95683))
* update color variables and styles for AuroCounter components [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([9ec6629](https://github.com/AlaskaAirlines/auro-formkit/commit/9ec662980e6fc5bfa11d81ccdc485cff634eac86))
* update token refs [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([667b1af](https://github.com/AlaskaAirlines/auro-formkit/commit/667b1af0726dcd2813ef6a0b2371c879d5b49b53))
* update validation logic [#91](https://github.com/AlaskaAirlines/auro-formkit/issues/91) ([08392e7](https://github.com/AlaskaAirlines/auro-formkit/commit/08392e7990ce906f9ad446c118a38d69b2df1da1))

# [2.0.0-beta.8](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2025-01-16)


### Features

* move start date when the 2nd click is before start date in datepicker [#218](https://github.com/AlaskaAirlines/auro-formkit/issues/218) ([bf2e38e](https://github.com/AlaskaAirlines/auro-formkit/commit/bf2e38e1d9640cafd0d806de93ea74f190158ef4))

# [2.0.0-beta.7](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2025-01-15)


### Bug Fixes

* hide bib properly upon making a selecting [#78](https://github.com/AlaskaAirlines/auro-formkit/issues/78) ([a1d66ab](https://github.com/AlaskaAirlines/auro-formkit/commit/a1d66aba87ad87c8b1f35786cb05cdc58a07fbff))
* reset option on combobox.input.value change only with any variable change [#141](https://github.com/AlaskaAirlines/auro-formkit/issues/141) ([fe3bfb4](https://github.com/AlaskaAirlines/auro-formkit/commit/fe3bfb4300c117e0b3054c17a4837cf60b676f66))

# [2.0.0-beta.6](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2025-01-14)


### Performance Improvements

* add dynamic documentation for monorepo structure [#150](https://github.com/AlaskaAirlines/auro-formkit/issues/150) ([03d0c1b](https://github.com/AlaskaAirlines/auro-formkit/commit/03d0c1baebdaefa2e17486297afd9e26b66791e0))
* update auro-library and all other deps ([f35cc60](https://github.com/AlaskaAirlines/auro-formkit/commit/f35cc60c735b332b6df2232564263ee80e0aab91))

# [2.0.0-beta.5](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2025-01-14)


### Bug Fixes

* make cell hover color non-transparent [#106](https://github.com/AlaskaAirlines/auro-formkit/issues/106) ([fd30de3](https://github.com/AlaskaAirlines/auro-formkit/commit/fd30de34c5b4b45ac0977bd2c7b4502c7a12aefe))

# [2.0.0-beta.4](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2025-01-10)


### Bug Fixes

* remove menuoption's padding in select ([8bb0efc](https://github.com/AlaskaAirlines/auro-formkit/commit/8bb0efc0d9562c5ddd36d813668767a5398efebe))
* simplify logic on calculating `hasTriggerContent` in dropdown ([f1129cc](https://github.com/AlaskaAirlines/auro-formkit/commit/f1129ccd669332d4b1cc6e88d2f5c988663bf652))


### Code Refactoring

* make `dropdown.placeholder` slot [#36](https://github.com/AlaskaAirlines/auro-formkit/issues/36) ([bff21e8](https://github.com/AlaskaAirlines/auro-formkit/commit/bff21e85e07cd1b1c6bdd5fc2c4147bc17b80087))


### BREAKING CHANGES

* `placeholder` is now slot not attribute and there is no default node for it

# [2.0.0-beta.3](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2025-01-09)


### Bug Fixes

* make x icon take no space when invisible [#164](https://github.com/AlaskaAirlines/auro-formkit/issues/164) ([7ad63e2](https://github.com/AlaskaAirlines/auro-formkit/commit/7ad63e2d8898bd44e67724b8bb174f2a2f549174))


### Features

* update custom validity message logic and docs [#155](https://github.com/AlaskaAirlines/auro-formkit/issues/155) [#156](https://github.com/AlaskaAirlines/auro-formkit/issues/156) ([beec66a](https://github.com/AlaskaAirlines/auro-formkit/commit/beec66a85d8004ad30207e3b039eac8cf3ffb2fb))


### Performance Improvements

* add animation to clear icon and add shared mixin file ([4c6a1e1](https://github.com/AlaskaAirlines/auro-formkit/commit/4c6a1e1f286c727f63acb53aaa59828e6387c2e0))
* add optional chaining to validation logic ([c4de243](https://github.com/AlaskaAirlines/auro-formkit/commit/c4de243b2f98633605872ef41d2a033d7341b5f3))
* update handling of invalid values in select ([d1eb0bf](https://github.com/AlaskaAirlines/auro-formkit/commit/d1eb0bf6477b89a751a8f9ce4c5d43d4fa92721c))
* update validity to use patternMismatch state [#163](https://github.com/AlaskaAirlines/auro-formkit/issues/163) ([4c9f9a4](https://github.com/AlaskaAirlines/auro-formkit/commit/4c9f9a4c803b2fede189208ad0e005156d6b0bbf))


### BREAKING CHANGES

* input's errorMessage is now a private property.
* patternMismatch replaces badInput state when user inputs do not match the expected pattern.

# [2.0.0-beta.2](https://github.com/AlaskaAirlines/auro-formkit/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2025-01-07)


### Bug Fixes

* add clarifying docs for checkbox naming collisions ([022a0f6](https://github.com/AlaskaAirlines/auro-formkit/commit/022a0f6766f2c8917a63c649744ad307a352e852))
* fix other doc checkbox values ([1d2d19f](https://github.com/AlaskaAirlines/auro-formkit/commit/1d2d19f97e4d30db314652b56b7d1a1abd2f2261))

# [2.0.0-beta.1](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.12...v2.0.0-beta.1) (2025-01-03)


### Performance Improvements

* remove deprecated component code [#126](https://github.com/AlaskaAirlines/auro-formkit/issues/126) ([67f3be8](https://github.com/AlaskaAirlines/auro-formkit/commit/67f3be8287cb33d70031b961032db8ef9cd60c08))


### BREAKING CHANGES

* remove unsupported deprecated code from all of our components.

# [1.6.0-beta.12](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.11...v1.6.0-beta.12) (2025-01-02)


### Bug Fixes

* remove unnecessary padding from dropdown content [#31](https://github.com/AlaskaAirlines/auro-formkit/issues/31) ([bb994fc](https://github.com/AlaskaAirlines/auro-formkit/commit/bb994fc77b34970b8f2aaa3f7261ddcb2a56c118))

# [1.6.0-beta.11](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.10...v1.6.0-beta.11) (2024-12-31)


### Bug Fixes

* eslint rules, naming errors ([ca27f4c](https://github.com/AlaskaAirlines/auro-formkit/commit/ca27f4ce435c602d2e3f488139a43140c880b7fa))
* remove any instances of type=numeric [#120](https://github.com/AlaskaAirlines/auro-formkit/issues/120) ([7ba5463](https://github.com/AlaskaAirlines/auro-formkit/commit/7ba5463a8132d1740a8f75f11920c72fcbf30b90))
* update layout to match figma [#79](https://github.com/AlaskaAirlines/auro-formkit/issues/79) ([58dffaf](https://github.com/AlaskaAirlines/auro-formkit/commit/58dffaff7f7c1983c197572b1305599818ff2a37))
* validate each individual attribute [#119](https://github.com/AlaskaAirlines/auro-formkit/issues/119) ([67bbb44](https://github.com/AlaskaAirlines/auro-formkit/commit/67bbb44feea941a8aa8598f8a5bffeda3c701b75))


### Features

* add reset function to validation script [#135](https://github.com/AlaskaAirlines/auro-formkit/issues/135) ([9119e06](https://github.com/AlaskaAirlines/auro-formkit/commit/9119e06bc602b0c72ab4f3a9da1638ea66196d53))
* add reset functionality to checkbox ([292845e](https://github.com/AlaskaAirlines/auro-formkit/commit/292845e444cb4c0f63cc55bf591d5b6a575a7143))
* add reset functionality to combobox ([6e8ea9b](https://github.com/AlaskaAirlines/auro-formkit/commit/6e8ea9b9aa91aabeb8b48f9994bcb1548cd139e4))
* add reset functionality to datepicker ([b2b6a10](https://github.com/AlaskaAirlines/auro-formkit/commit/b2b6a102588f5b0cd81f86f4101a1e24c2e5d273))
* add reset functionality to input ([2027706](https://github.com/AlaskaAirlines/auro-formkit/commit/202770648b38d0b905546a6c434d60736757c5d8))
* add reset functionality to radio ([5b961dc](https://github.com/AlaskaAirlines/auro-formkit/commit/5b961dc1c67737df8ab875b27e1aeb0cb01904b2))
* add reset functionality to select ([2f07d97](https://github.com/AlaskaAirlines/auro-formkit/commit/2f07d9740016eddf10bff8d5ab1da0cd98f3373f))


### Performance Improvements

* add min.js files ([503802e](https://github.com/AlaskaAirlines/auro-formkit/commit/503802e96225c30c276070a59f5cfdfe2e7bb04c))
* hide input arrows for type=number ([9a56754](https://github.com/AlaskaAirlines/auro-formkit/commit/9a56754b2164057ce33ec27225ecc5ced149daf4))
* improve documentation around type=number ([76718a9](https://github.com/AlaskaAirlines/auro-formkit/commit/76718a916d2be90c0838475b62955213b310c62d))
* reflect value attribute onto input component ([ea3c731](https://github.com/AlaskaAirlines/auro-formkit/commit/ea3c73103e4b7d4a3a1d0c5c685f54603741dd3f))
* remove all references of isValid attribute ([b66d47e](https://github.com/AlaskaAirlines/auro-formkit/commit/b66d47e193088eda4c14b7fabdc2a037a46dba95))
* remove reflected value attribute from all components ([706f409](https://github.com/AlaskaAirlines/auro-formkit/commit/706f409196d55af415e230262832398976365968))
* show clear icon on hover or focus [#158](https://github.com/AlaskaAirlines/auro-formkit/issues/158) ([3c48343](https://github.com/AlaskaAirlines/auro-formkit/commit/3c483438f9bc6bf732c170f9185c7444f05b2032))

# [1.6.0-beta.10](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.9...v1.6.0-beta.10) (2024-12-30)


### Bug Fixes

* force focus state to dropdown.trigger as `document.activeElement` stays in body even with clicking [#129](https://github.com/AlaskaAirlines/auro-formkit/issues/129) ([ce65f18](https://github.com/AlaskaAirlines/auro-formkit/commit/ce65f185e90c652886bae07d62d1db4143153e73))
* remove extra focus line on chrome ([681e1b4](https://github.com/AlaskaAirlines/auro-formkit/commit/681e1b47c931c607d58b5fd1e2530eb63604aa03))
* replace `box-shadow` with `outline` ([70c3d3d](https://github.com/AlaskaAirlines/auro-formkit/commit/70c3d3deeb53477e6a2cb6f87190d8fe6e2950ae))


### Performance Improvements

* update auro-library to fix the focus issue ([1548d20](https://github.com/AlaskaAirlines/auro-formkit/commit/1548d2081b16987d824ad81b83574f17cc6fe226))
* update component dependencies ([81dbb5b](https://github.com/AlaskaAirlines/auro-formkit/commit/81dbb5bcc45a8992eb008259c7a071e0b40030de))

# [1.6.0-beta.9](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.8...v1.6.0-beta.9) (2024-12-27)


### Bug Fixes

* update `showPrevMonthBtn` and `showNextMonthBtn` properly ([fd7b97d](https://github.com/AlaskaAirlines/auro-formkit/commit/fd7b97d9fd075e7179ebd473c5f9cda8eef3bcdb))

# [1.6.0-beta.8](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.7...v1.6.0-beta.8) (2024-12-24)


### Performance Improvements

* update auro-library ([d086276](https://github.com/AlaskaAirlines/auro-formkit/commit/d086276ea40a6d990d547ef0304da7e641f11521))
* update refs from v18-v20 to v20-v22 ([4aeecaf](https://github.com/AlaskaAirlines/auro-formkit/commit/4aeecafbd5a30db48de7f07da11f4d821be2e745))

# [1.6.0-beta.7](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.6...v1.6.0-beta.7) (2024-12-19)


### Bug Fixes

* replace set to map for loadingslots in menu ([373ee72](https://github.com/AlaskaAirlines/auro-formkit/commit/373ee720a97161d89466aa65a76ec8fcc6ea2f8a))


### Features

* add loading-placeholder in menu ([2bb2986](https://github.com/AlaskaAirlines/auro-formkit/commit/2bb2986056bd0c0e9051ee71a6636a8eeae286c7))
* hide bib while loading when there is no loading placeholder to show ([a6ebc21](https://github.com/AlaskaAirlines/auro-formkit/commit/a6ebc21116ab60bee8a2b2810e654ef6d80f8431))
* support loading state in combobox and menu ([01bd9b9](https://github.com/AlaskaAirlines/auro-formkit/commit/01bd9b92e3c7a81bd913c7501d8ccbbbd972b00c))


### Performance Improvements

* replace `innerText` with `textContent` for better performance ([c3f99f1](https://github.com/AlaskaAirlines/auro-formkit/commit/c3f99f1abbae071ebeebdd3090fe070608659641))

# [1.6.0-beta.6](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.5...v1.6.0-beta.6) (2024-12-18)


### Bug Fixes

* add `fluid` attribute to dropdown and make its default display `inline-block` [#107](https://github.com/AlaskaAirlines/auro-formkit/issues/107) [#117](https://github.com/AlaskaAirlines/auro-formkit/issues/117) ([57c65df](https://github.com/AlaskaAirlines/auro-formkit/commit/57c65df917d3d8525303c52fc8bb90571cea1ba8))

# [1.6.0-beta.5](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.4...v1.6.0-beta.5) (2024-12-18)


### Bug Fixes

* make `README.md` to have the correct npm path [#286](https://github.com/AlaskaAirlines/auro-formkit/issues/286) ([19fc981](https://github.com/AlaskaAirlines/auro-formkit/commit/19fc981603898c14771861b8cdce0d9cfe307469))

# [1.6.0-beta.4](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.3...v1.6.0-beta.4) (2024-12-17)


### Performance Improvements

* remove package.json private property ([088007e](https://github.com/AlaskaAirlines/auro-formkit/commit/088007efef7f4728ebad90286dc004490d32cb26))

# [1.6.0-beta.3](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.2...v1.6.0-beta.3) (2024-12-17)


### Performance Improvements

* enable publishConfig ([07eacb6](https://github.com/AlaskaAirlines/auro-formkit/commit/07eacb681a781861a81fb159c245b65751ce7342))

# [1.6.0-beta.2](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2024-12-16)


### Performance Improvements

* add husky override to commit-msg ([15b8170](https://github.com/AlaskaAirlines/auro-formkit/commit/15b8170186320c4c1603063d95be64c67220b35a))
* unset hooks ([9974d1a](https://github.com/AlaskaAirlines/auro-formkit/commit/9974d1a7a9d29adc81ff1fc9bd0581622d52e527))
* update husky configs ([ab4f8b2](https://github.com/AlaskaAirlines/auro-formkit/commit/ab4f8b20260f8fae740de6135df06877bf6a6618))

# [1.6.0-beta.1](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.5.0...v1.6.0-beta.1) (2024-12-16)


### Bug Fixes

* add back `document.body.append` for the floating bib ([7bd62f8](https://github.com/AlaskaAirlines/auro-formkit/commit/7bd62f8edcddd46d3eaecb48d044fe6dc3a9af7c))
* add OEF line to end of files ([3dd5612](https://github.com/AlaskaAirlines/auro-formkit/commit/3dd5612411e203d8c9f15d55662961dcfb6348e5))
* add REAME to docs templates ([f9b37ea](https://github.com/AlaskaAirlines/auro-formkit/commit/f9b37ea0ae34c9a570e2b34640e7068be7e7d12a))
* add semi-colon to end of version files ([8d523b1](https://github.com/AlaskaAirlines/auro-formkit/commit/8d523b1d075d4243bc5570175e688dba20e91a56))
* add space between bib and trigger [#56](https://github.com/AlaskaAirlines/auro-formkit/issues/56) ([d936fd4](https://github.com/AlaskaAirlines/auro-formkit/commit/d936fd48bac1bcae44cf09d16da3dc58ffaa2316))
* add versionWriter back to menu ([9bd9d50](https://github.com/AlaskaAirlines/auro-formkit/commit/9bd9d5010eee44ed2fafd49d4a3a9361cfc40a96))
* adding default component package files ([028c236](https://github.com/AlaskaAirlines/auro-formkit/commit/028c2362dbe98d6a54845d7e2885ea327b2bdcbf))
* check in doc after build ([76f8027](https://github.com/AlaskaAirlines/auro-formkit/commit/76f8027142ca0b8c40da1b65958de2fbc48c9085))
* clarify dependency nature in docs ([cc5ff59](https://github.com/AlaskaAirlines/auro-formkit/commit/cc5ff5943b5d6ccb09ec2e2f1a8496e63271bf2d))
* clarify development environment in docs ([7f0a7ce](https://github.com/AlaskaAirlines/auro-formkit/commit/7f0a7cee042ab0f6e78c6a2a7eb5dfd13a435581))
* clarify development environment in docs ([82e051a](https://github.com/AlaskaAirlines/auro-formkit/commit/82e051a8f61dba2ff068de2c0766d5b6d00e16d2))
* clean up dropdown version imports  after merge ([07b0815](https://github.com/AlaskaAirlines/auro-formkit/commit/07b08156f3a4b5cf0f56db8b3a992966ef2c1355))
* commit generated readme ([a3f9917](https://github.com/AlaskaAirlines/auro-formkit/commit/a3f9917de0cf7eddb8da248ee0e11e64c5b7d13c))
* correct path typo ([ce79afa](https://github.com/AlaskaAirlines/auro-formkit/commit/ce79afa3b54f3ce6405e39c31b9d56452658e3d2))
* **docs:** fix typo in Dialog example md ([5028ff1](https://github.com/AlaskaAirlines/auro-formkit/commit/5028ff1d256736e2bcdd255258adfef82de0edc2))
* dropdown dev port ([23b0f96](https://github.com/AlaskaAirlines/auro-formkit/commit/23b0f96430b42ed3b066e3519967ffb46e92b82d))
* export components for typescript support ([b940403](https://github.com/AlaskaAirlines/auro-formkit/commit/b9404039b3c67597d3baa284074055e001760741))
* export Dropdown & Import so Combobox can consume ([18d5103](https://github.com/AlaskaAirlines/auro-formkit/commit/18d5103e617e2554f9f1df21e367fbae8c3b4f5c))
* fix missing bibContent reference ([51eea4a](https://github.com/AlaskaAirlines/auro-formkit/commit/51eea4a440e9eefbdaa154c67a9a381fc27c6849))
* lint update ([9003be7](https://github.com/AlaskaAirlines/auro-formkit/commit/9003be73a96dab8440e3bca60d75cf883e0368e3))
* linting errors on date-picker vendor file ([c7e01d4](https://github.com/AlaskaAirlines/auro-formkit/commit/c7e01d4bfbc1727b28349326ae76a6fb095e55be))
* make dropdown to export size to dropdownSize in `exposeCssParts` ([165c0db](https://github.com/AlaskaAirlines/auro-formkit/commit/165c0db7b7335563145a586c1a911ca0af25ff8e))
* make dropdown's `matchwidth` to stretch out to the trigger width ([4cf5c17](https://github.com/AlaskaAirlines/auro-formkit/commit/4cf5c178ad9067ee321c761ed641ce6ea6d1f18d))
* make rollup to proplery generate bundled.js and demo/*.min.js ([c9c5f07](https://github.com/AlaskaAirlines/auro-formkit/commit/c9c5f07a5d2016b2dc46122961c3b6b606aff6b2))
* move date-picker vendor files into src ([e3a518d](https://github.com/AlaskaAirlines/auro-formkit/commit/e3a518d309fdf9abeb4a09d9ed24e5cd0008c60c))
* move styles to folder in datepicker ([c98f399](https://github.com/AlaskaAirlines/auro-formkit/commit/c98f3990d16771e8e8835ffd87f3afe03b143883))
* move styles to folder in menu ([a47ffbd](https://github.com/AlaskaAirlines/auro-formkit/commit/a47ffbdf908281ff56339ae7bd104d80eb196037))
* package names in turbo.json ([ffeed9f](https://github.com/AlaskaAirlines/auro-formkit/commit/ffeed9fe7e31b14748ea4799744a383eb9dfd9e0))
* path in script documentation ([663bbe9](https://github.com/AlaskaAirlines/auro-formkit/commit/663bbe9dd6777c4bab6d0f1f5f896d83255a0c23))
* remove [@todo](https://github.com/todo) from readme ([1a6848a](https://github.com/AlaskaAirlines/auro-formkit/commit/1a6848a12a33a9b651bff6dd75f9102ef3c4f270))
* remove date-picker vendor files from root ([76a770d](https://github.com/AlaskaAirlines/auro-formkit/commit/76a770d6817b34f84d14ea22c6caa37031d89c41))
* remove deprecated dev note ([bf647cf](https://github.com/AlaskaAirlines/auro-formkit/commit/bf647cf7ee6abaababfe9b1a07589c29567095dc))
* remove deprecated README ([949914f](https://github.com/AlaskaAirlines/auro-formkit/commit/949914fc464413b2acddbf609e167b957b133941))
* remove exports field from root package.json ([f7a5294](https://github.com/AlaskaAirlines/auro-formkit/commit/f7a5294cfc0da7c853252077112f7345a34f6edf))
* remove periods from config filenames ([606cc1e](https://github.com/AlaskaAirlines/auro-formkit/commit/606cc1e52a6137f08a4847a4c530c4ac869d8227))
* remove redundant attribute setter ([2a935df](https://github.com/AlaskaAirlines/auro-formkit/commit/2a935df92ccd08ef343e29afe27bea64b9fc1cff))
* remove test from husky, correct lint ([e64d26c](https://github.com/AlaskaAirlines/auro-formkit/commit/e64d26cbefa6e0fc1b7daf5b0de93a546533c0e6))
* remove unnecessary tsconfig for config files ([78013a3](https://github.com/AlaskaAirlines/auro-formkit/commit/78013a3ad466a1cf5e998bc11ebddc570c959971))
* revert automatic port script ([7e719e8](https://github.com/AlaskaAirlines/auro-formkit/commit/7e719e8ec76902dfad52db56cfcb9eb515268f04))
* revert automatic port script ([ae6614f](https://github.com/AlaskaAirlines/auro-formkit/commit/ae6614f22077c8402fa564b9e011cea814a50f07))
* revert package.json after merge conflicts ([406a497](https://github.com/AlaskaAirlines/auro-formkit/commit/406a49743d1aca0aafdd5497eba443ef05c43a40))
* scope kit doc command to build-tools package ([c7afb5a](https://github.com/AlaskaAirlines/auro-formkit/commit/c7afb5ae44b2699245e2820b8e895471643758b2))
* specify select's height and remove hack for the bib's `z-index` [#99](https://github.com/AlaskaAirlines/auro-formkit/issues/99) ([b2647d4](https://github.com/AlaskaAirlines/auro-formkit/commit/b2647d412754e292e6f13403a517e58538af7b01))
* spelling correction ([eff34dc](https://github.com/AlaskaAirlines/auro-formkit/commit/eff34dcbdb992a12db078ef55245adcbc4eb48b4))
* update aria-selected values ([f3f2bdc](https://github.com/AlaskaAirlines/auro-formkit/commit/f3f2bdc6caeeb38039f76369dcafaf86a0cab85d))
* update clean up input after merge ([c7ddea1](https://github.com/AlaskaAirlines/auro-formkit/commit/c7ddea1bdea92d23d708373b094cf2be53a5cf59))
* update combobox build pipeline ([943c52a](https://github.com/AlaskaAirlines/auro-formkit/commit/943c52a99e9baac3701e3ce32696e7d0019dd28c))
* update component dependencies to workspaces ([343a69b](https://github.com/AlaskaAirlines/auro-formkit/commit/343a69b240fac53d61e15366cf530ffe08a9d7a9))
* update css file imports ([1ab2620](https://github.com/AlaskaAirlines/auro-formkit/commit/1ab26208eb625d24ccf51f8e29e6044222e3af89))
* update css file imports ([a6269d8](https://github.com/AlaskaAirlines/auro-formkit/commit/a6269d8de2440e14fef10c8743c0d0a36f2bc9af))
* update css imports ([c9df970](https://github.com/AlaskaAirlines/auro-formkit/commit/c9df9700012fcf15144e7c110d376be6aca027b7))
* update date-picker tsconfig with vendor folder ([7e7346b](https://github.com/AlaskaAirlines/auro-formkit/commit/7e7346ba31edf576747739f1a3c9d57fc684e564))
* update dropdown package imports ([00a6360](https://github.com/AlaskaAirlines/auro-formkit/commit/00a6360333e6beab602c8d78c1c433262df61b97))
* update dropdown package name ([69abf2f](https://github.com/AlaskaAirlines/auro-formkit/commit/69abf2f264a27a45eaaa4ba93191a51b0c08cd99))
* update dropdown's z-index and update select's height [#98](https://github.com/AlaskaAirlines/auro-formkit/issues/98) ([3aa3000](https://github.com/AlaskaAirlines/auro-formkit/commit/3aa3000017c68437af64658791a42c75942cd61c))
* update formkit components in docs ([0bfffc1](https://github.com/AlaskaAirlines/auro-formkit/commit/0bfffc1ca26ab08325ae6fbaed5b659d580e15f5))
* update formVersionWriter to add semicolon and new line at end for lint ([1c3fb47](https://github.com/AlaskaAirlines/auro-formkit/commit/1c3fb478dfb875b6d80cfb4359ef2250831d280a))
* update icon versions ([3a3959d](https://github.com/AlaskaAirlines/auro-formkit/commit/3a3959d2c3a27f95ac1bbe7a6581c75d5bf6d455))
* update input package imports ([08fd308](https://github.com/AlaskaAirlines/auro-formkit/commit/08fd30882e6341f58a1aa600d3fd06157bcc9d9e))
* update local formkit version files ([c2e3507](https://github.com/AlaskaAirlines/auro-formkit/commit/c2e350704ea89593f6640244bcedadbd3c4dc13f))
* update local formkit version files ([6ea877a](https://github.com/AlaskaAirlines/auro-formkit/commit/6ea877af82ff160af46bc3d21caf92a7fdb5e523))
* update local formkit version files ([18dc3d0](https://github.com/AlaskaAirlines/auro-formkit/commit/18dc3d0509eb72b8233a48d0e3d9678e795e5f63))
* update menu package name ([6d2bcff](https://github.com/AlaskaAirlines/auro-formkit/commit/6d2bcff41bb32d95085593578dc11c723ebdd621))
* update package names to use monorepo namespace ([436789f](https://github.com/AlaskaAirlines/auro-formkit/commit/436789fe5ef3d9556e98b573e55f495c5dffa38b))
* update package scss imports ([c849b2d](https://github.com/AlaskaAirlines/auro-formkit/commit/c849b2de6efb17dc9f1d2e756fc2be61f3a17207))
* update package-lock ([8e13043](https://github.com/AlaskaAirlines/auro-formkit/commit/8e13043c2bd15724bb69af34a4931c3a606e91c2))
* update package.json with new namespace ([da6f29e](https://github.com/AlaskaAirlines/auro-formkit/commit/da6f29e7f2dbd249ecdf38cd0797e2c3a623d4c9))
* update package.lock ([877f2c6](https://github.com/AlaskaAirlines/auro-formkit/commit/877f2c6cae7e06dffba191d477b1b970b763784a))
* update README ([9148141](https://github.com/AlaskaAirlines/auro-formkit/commit/9148141b578bc3566903b073e85b3ec8be7bfddf))
* update README path from where package is run ([762ee40](https://github.com/AlaskaAirlines/auro-formkit/commit/762ee4008a3b644e869e227bbc5763c752c033d9))
* update readme structure ([44b368b](https://github.com/AlaskaAirlines/auro-formkit/commit/44b368b398738ab185700b24ceaf73f98b037bfd))
* update select dependency workspace ([47b0af5](https://github.com/AlaskaAirlines/auro-formkit/commit/47b0af568dc8d0091163e496c12a666349d6ac81))
* update step for testPublish.yml ([63eb5be](https://github.com/AlaskaAirlines/auro-formkit/commit/63eb5bee81fc7b441a7882c0091e9f377ad9dc2b))
* update turbo to track changes in docs partials ([0b93b80](https://github.com/AlaskaAirlines/auro-formkit/commit/0b93b80eaf9374e6c66220001ee2923db7b3c300))
* update type setup ([2cf0bcc](https://github.com/AlaskaAirlines/auro-formkit/commit/2cf0bcc45093f385d4686171698ce1129b013925))
* updates to  README ([ce8e5c5](https://github.com/AlaskaAirlines/auro-formkit/commit/ce8e5c58560bb2da13d8bfa020012f538a725243))
* updating kitDocProcessor ([6ae32c6](https://github.com/AlaskaAirlines/auro-formkit/commit/6ae32c61bb8e834c544a2631cf36b107cb51e25c))
* watch for script changes in turbo ([e70dd10](https://github.com/AlaskaAirlines/auro-formkit/commit/e70dd10eeefb3fad23c3a3812fe20f11f2cad536))


### Features

* add `bibSizer` to help sizing `bibContainer` with css style ([c6e881b](https://github.com/AlaskaAirlines/auro-formkit/commit/c6e881b5743b574079d677e4300850102b070e7e))
* add `docProcessor` to generate docs for each components ([23b0f1b](https://github.com/AlaskaAirlines/auro-formkit/commit/23b0f1b4368d11be88230f4e89e6bd60b3dab3ee))
* add `mobileFullscreenBreakpoint` instead of `noFullscreenOnMobile` ([1a33257](https://github.com/AlaskaAirlines/auro-formkit/commit/1a332575e3c1e6e8baf20bb3160472da6d6e66c0))
* add `noFullscreenOnMobile` attribute ([ff98d61](https://github.com/AlaskaAirlines/auro-formkit/commit/ff98d61a3e67107e1306b3124b65cc852a81c762))
* add doc partials ([45a6c01](https://github.com/AlaskaAirlines/auro-formkit/commit/45a6c01052a9238a5515836e23524d6d1427b8dd))
* add turborepo ([6af0fe4](https://github.com/AlaskaAirlines/auro-formkit/commit/6af0fe47d772387c2fdf6ae5dcc57a594fc362ba))
* add wca as part of build:docs ([ba484de](https://github.com/AlaskaAirlines/auro-formkit/commit/ba484de2c84d04c6e4dcab3646c3edb9b0bc3f35))
* counter component initial setup [#54](https://github.com/AlaskaAirlines/auro-formkit/issues/54) ([df727e3](https://github.com/AlaskaAirlines/auro-formkit/commit/df727e3701eeda2500836457b8cfbd6682505d54))
* initial kitDocProcessor ([77fdb4d](https://github.com/AlaskaAirlines/auro-formkit/commit/77fdb4dc934eb7212e6a1add56e7535a1b1561fc))
* integrate form validation [#44](https://github.com/AlaskaAirlines/auro-formkit/issues/44) ([a673a6b](https://github.com/AlaskaAirlines/auro-formkit/commit/a673a6be854661c6dc8f37c58d9031897fce5669))
* open bib fullscreen on mobile view [#55](https://github.com/AlaskaAirlines/auro-formkit/issues/55) ([84110fd](https://github.com/AlaskaAirlines/auro-formkit/commit/84110fdd114b8456428491c7d994b8289a4d5292))


### Performance Improvements

* move `.container` our of `:host` ([088acab](https://github.com/AlaskaAirlines/auro-formkit/commit/088acabfcc1a70c919692db19eb5286644c6c955))
* prevent semantic-release from running git hooks [#112](https://github.com/AlaskaAirlines/auro-formkit/issues/112) ([4134add](https://github.com/AlaskaAirlines/auro-formkit/commit/4134add4668eea857fd966da92a73cded993b349))
* revert variable rendering logic for calendar ([ac1899e](https://github.com/AlaskaAirlines/auro-formkit/commit/ac1899e5075e9a35078c19cbdcba363de41161aa))
* simplify logic of resetting bib's size on fullscreen mode ([a69ffb1](https://github.com/AlaskaAirlines/auro-formkit/commit/a69ffb19973737df1339370908dbb1dd89b689b2))
* testing out latest husky to fix release [#112](https://github.com/AlaskaAirlines/auro-formkit/issues/112) ([d34fded](https://github.com/AlaskaAirlines/auro-formkit/commit/d34fdedf00a37472b5f2780cba3b9fcc49f7b162))
* update instances of auro-form the repo to auro-formkit [#35](https://github.com/AlaskaAirlines/auro-formkit/issues/35) ([0b5b8d5](https://github.com/AlaskaAirlines/auro-formkit/commit/0b5b8d56322af344b8c21b42b514827c522df871))
* update old build release command [#35](https://github.com/AlaskaAirlines/auro-formkit/issues/35) ([b279345](https://github.com/AlaskaAirlines/auro-formkit/commit/b27934582e90ab992b9e75be0826a2716f04345b))

# [1.6.0-beta.1](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.5.0...v1.6.0-beta.1) (2024-12-16)


### Bug Fixes

* add back `document.body.append` for the floating bib ([7bd62f8](https://github.com/AlaskaAirlines/auro-formkit/commit/7bd62f8edcddd46d3eaecb48d044fe6dc3a9af7c))
* add OEF line to end of files ([3dd5612](https://github.com/AlaskaAirlines/auro-formkit/commit/3dd5612411e203d8c9f15d55662961dcfb6348e5))
* add REAME to docs templates ([f9b37ea](https://github.com/AlaskaAirlines/auro-formkit/commit/f9b37ea0ae34c9a570e2b34640e7068be7e7d12a))
* add semi-colon to end of version files ([8d523b1](https://github.com/AlaskaAirlines/auro-formkit/commit/8d523b1d075d4243bc5570175e688dba20e91a56))
* add space between bib and trigger [#56](https://github.com/AlaskaAirlines/auro-formkit/issues/56) ([d936fd4](https://github.com/AlaskaAirlines/auro-formkit/commit/d936fd48bac1bcae44cf09d16da3dc58ffaa2316))
* add versionWriter back to menu ([9bd9d50](https://github.com/AlaskaAirlines/auro-formkit/commit/9bd9d5010eee44ed2fafd49d4a3a9361cfc40a96))
* adding default component package files ([028c236](https://github.com/AlaskaAirlines/auro-formkit/commit/028c2362dbe98d6a54845d7e2885ea327b2bdcbf))
* check in doc after build ([76f8027](https://github.com/AlaskaAirlines/auro-formkit/commit/76f8027142ca0b8c40da1b65958de2fbc48c9085))
* clarify dependency nature in docs ([cc5ff59](https://github.com/AlaskaAirlines/auro-formkit/commit/cc5ff5943b5d6ccb09ec2e2f1a8496e63271bf2d))
* clarify development environment in docs ([7f0a7ce](https://github.com/AlaskaAirlines/auro-formkit/commit/7f0a7cee042ab0f6e78c6a2a7eb5dfd13a435581))
* clarify development environment in docs ([82e051a](https://github.com/AlaskaAirlines/auro-formkit/commit/82e051a8f61dba2ff068de2c0766d5b6d00e16d2))
* clean up dropdown version imports  after merge ([07b0815](https://github.com/AlaskaAirlines/auro-formkit/commit/07b08156f3a4b5cf0f56db8b3a992966ef2c1355))
* commit generated readme ([a3f9917](https://github.com/AlaskaAirlines/auro-formkit/commit/a3f9917de0cf7eddb8da248ee0e11e64c5b7d13c))
* correct path typo ([ce79afa](https://github.com/AlaskaAirlines/auro-formkit/commit/ce79afa3b54f3ce6405e39c31b9d56452658e3d2))
* **docs:** fix typo in Dialog example md ([5028ff1](https://github.com/AlaskaAirlines/auro-formkit/commit/5028ff1d256736e2bcdd255258adfef82de0edc2))
* dropdown dev port ([23b0f96](https://github.com/AlaskaAirlines/auro-formkit/commit/23b0f96430b42ed3b066e3519967ffb46e92b82d))
* export components for typescript support ([b940403](https://github.com/AlaskaAirlines/auro-formkit/commit/b9404039b3c67597d3baa284074055e001760741))
* export Dropdown & Import so Combobox can consume ([18d5103](https://github.com/AlaskaAirlines/auro-formkit/commit/18d5103e617e2554f9f1df21e367fbae8c3b4f5c))
* fix missing bibContent reference ([51eea4a](https://github.com/AlaskaAirlines/auro-formkit/commit/51eea4a440e9eefbdaa154c67a9a381fc27c6849))
* lint update ([9003be7](https://github.com/AlaskaAirlines/auro-formkit/commit/9003be73a96dab8440e3bca60d75cf883e0368e3))
* linting errors on date-picker vendor file ([c7e01d4](https://github.com/AlaskaAirlines/auro-formkit/commit/c7e01d4bfbc1727b28349326ae76a6fb095e55be))
* make dropdown to export size to dropdownSize in `exposeCssParts` ([165c0db](https://github.com/AlaskaAirlines/auro-formkit/commit/165c0db7b7335563145a586c1a911ca0af25ff8e))
* make dropdown's `matchwidth` to stretch out to the trigger width ([4cf5c17](https://github.com/AlaskaAirlines/auro-formkit/commit/4cf5c178ad9067ee321c761ed641ce6ea6d1f18d))
* make rollup to proplery generate bundled.js and demo/*.min.js ([c9c5f07](https://github.com/AlaskaAirlines/auro-formkit/commit/c9c5f07a5d2016b2dc46122961c3b6b606aff6b2))
* move date-picker vendor files into src ([e3a518d](https://github.com/AlaskaAirlines/auro-formkit/commit/e3a518d309fdf9abeb4a09d9ed24e5cd0008c60c))
* move styles to folder in datepicker ([c98f399](https://github.com/AlaskaAirlines/auro-formkit/commit/c98f3990d16771e8e8835ffd87f3afe03b143883))
* move styles to folder in menu ([a47ffbd](https://github.com/AlaskaAirlines/auro-formkit/commit/a47ffbdf908281ff56339ae7bd104d80eb196037))
* package names in turbo.json ([ffeed9f](https://github.com/AlaskaAirlines/auro-formkit/commit/ffeed9fe7e31b14748ea4799744a383eb9dfd9e0))
* path in script documentation ([663bbe9](https://github.com/AlaskaAirlines/auro-formkit/commit/663bbe9dd6777c4bab6d0f1f5f896d83255a0c23))
* remove [@todo](https://github.com/todo) from readme ([1a6848a](https://github.com/AlaskaAirlines/auro-formkit/commit/1a6848a12a33a9b651bff6dd75f9102ef3c4f270))
* remove date-picker vendor files from root ([76a770d](https://github.com/AlaskaAirlines/auro-formkit/commit/76a770d6817b34f84d14ea22c6caa37031d89c41))
* remove deprecated dev note ([bf647cf](https://github.com/AlaskaAirlines/auro-formkit/commit/bf647cf7ee6abaababfe9b1a07589c29567095dc))
* remove deprecated README ([949914f](https://github.com/AlaskaAirlines/auro-formkit/commit/949914fc464413b2acddbf609e167b957b133941))
* remove exports field from root package.json ([f7a5294](https://github.com/AlaskaAirlines/auro-formkit/commit/f7a5294cfc0da7c853252077112f7345a34f6edf))
* remove periods from config filenames ([606cc1e](https://github.com/AlaskaAirlines/auro-formkit/commit/606cc1e52a6137f08a4847a4c530c4ac869d8227))
* remove redundant attribute setter ([2a935df](https://github.com/AlaskaAirlines/auro-formkit/commit/2a935df92ccd08ef343e29afe27bea64b9fc1cff))
* remove test from husky, correct lint ([e64d26c](https://github.com/AlaskaAirlines/auro-formkit/commit/e64d26cbefa6e0fc1b7daf5b0de93a546533c0e6))
* remove unnecessary tsconfig for config files ([78013a3](https://github.com/AlaskaAirlines/auro-formkit/commit/78013a3ad466a1cf5e998bc11ebddc570c959971))
* revert automatic port script ([7e719e8](https://github.com/AlaskaAirlines/auro-formkit/commit/7e719e8ec76902dfad52db56cfcb9eb515268f04))
* revert automatic port script ([ae6614f](https://github.com/AlaskaAirlines/auro-formkit/commit/ae6614f22077c8402fa564b9e011cea814a50f07))
* revert package.json after merge conflicts ([406a497](https://github.com/AlaskaAirlines/auro-formkit/commit/406a49743d1aca0aafdd5497eba443ef05c43a40))
* scope kit doc command to build-tools package ([c7afb5a](https://github.com/AlaskaAirlines/auro-formkit/commit/c7afb5ae44b2699245e2820b8e895471643758b2))
* specify select's height and remove hack for the bib's `z-index` [#99](https://github.com/AlaskaAirlines/auro-formkit/issues/99) ([b2647d4](https://github.com/AlaskaAirlines/auro-formkit/commit/b2647d412754e292e6f13403a517e58538af7b01))
* spelling correction ([eff34dc](https://github.com/AlaskaAirlines/auro-formkit/commit/eff34dcbdb992a12db078ef55245adcbc4eb48b4))
* update aria-selected values ([f3f2bdc](https://github.com/AlaskaAirlines/auro-formkit/commit/f3f2bdc6caeeb38039f76369dcafaf86a0cab85d))
* update clean up input after merge ([c7ddea1](https://github.com/AlaskaAirlines/auro-formkit/commit/c7ddea1bdea92d23d708373b094cf2be53a5cf59))
* update combobox build pipeline ([943c52a](https://github.com/AlaskaAirlines/auro-formkit/commit/943c52a99e9baac3701e3ce32696e7d0019dd28c))
* update component dependencies to workspaces ([343a69b](https://github.com/AlaskaAirlines/auro-formkit/commit/343a69b240fac53d61e15366cf530ffe08a9d7a9))
* update css file imports ([1ab2620](https://github.com/AlaskaAirlines/auro-formkit/commit/1ab26208eb625d24ccf51f8e29e6044222e3af89))
* update css file imports ([a6269d8](https://github.com/AlaskaAirlines/auro-formkit/commit/a6269d8de2440e14fef10c8743c0d0a36f2bc9af))
* update css imports ([c9df970](https://github.com/AlaskaAirlines/auro-formkit/commit/c9df9700012fcf15144e7c110d376be6aca027b7))
* update date-picker tsconfig with vendor folder ([7e7346b](https://github.com/AlaskaAirlines/auro-formkit/commit/7e7346ba31edf576747739f1a3c9d57fc684e564))
* update dropdown package imports ([00a6360](https://github.com/AlaskaAirlines/auro-formkit/commit/00a6360333e6beab602c8d78c1c433262df61b97))
* update dropdown package name ([69abf2f](https://github.com/AlaskaAirlines/auro-formkit/commit/69abf2f264a27a45eaaa4ba93191a51b0c08cd99))
* update dropdown's z-index and update select's height [#98](https://github.com/AlaskaAirlines/auro-formkit/issues/98) ([3aa3000](https://github.com/AlaskaAirlines/auro-formkit/commit/3aa3000017c68437af64658791a42c75942cd61c))
* update formkit components in docs ([0bfffc1](https://github.com/AlaskaAirlines/auro-formkit/commit/0bfffc1ca26ab08325ae6fbaed5b659d580e15f5))
* update formVersionWriter to add semicolon and new line at end for lint ([1c3fb47](https://github.com/AlaskaAirlines/auro-formkit/commit/1c3fb478dfb875b6d80cfb4359ef2250831d280a))
* update icon versions ([3a3959d](https://github.com/AlaskaAirlines/auro-formkit/commit/3a3959d2c3a27f95ac1bbe7a6581c75d5bf6d455))
* update input package imports ([08fd308](https://github.com/AlaskaAirlines/auro-formkit/commit/08fd30882e6341f58a1aa600d3fd06157bcc9d9e))
* update local formkit version files ([c2e3507](https://github.com/AlaskaAirlines/auro-formkit/commit/c2e350704ea89593f6640244bcedadbd3c4dc13f))
* update local formkit version files ([6ea877a](https://github.com/AlaskaAirlines/auro-formkit/commit/6ea877af82ff160af46bc3d21caf92a7fdb5e523))
* update local formkit version files ([18dc3d0](https://github.com/AlaskaAirlines/auro-formkit/commit/18dc3d0509eb72b8233a48d0e3d9678e795e5f63))
* update menu package name ([6d2bcff](https://github.com/AlaskaAirlines/auro-formkit/commit/6d2bcff41bb32d95085593578dc11c723ebdd621))
* update package names to use monorepo namespace ([436789f](https://github.com/AlaskaAirlines/auro-formkit/commit/436789fe5ef3d9556e98b573e55f495c5dffa38b))
* update package scss imports ([c849b2d](https://github.com/AlaskaAirlines/auro-formkit/commit/c849b2de6efb17dc9f1d2e756fc2be61f3a17207))
* update package-lock ([8e13043](https://github.com/AlaskaAirlines/auro-formkit/commit/8e13043c2bd15724bb69af34a4931c3a606e91c2))
* update package.json with new namespace ([da6f29e](https://github.com/AlaskaAirlines/auro-formkit/commit/da6f29e7f2dbd249ecdf38cd0797e2c3a623d4c9))
* update package.lock ([877f2c6](https://github.com/AlaskaAirlines/auro-formkit/commit/877f2c6cae7e06dffba191d477b1b970b763784a))
* update README ([9148141](https://github.com/AlaskaAirlines/auro-formkit/commit/9148141b578bc3566903b073e85b3ec8be7bfddf))
* update README path from where package is run ([762ee40](https://github.com/AlaskaAirlines/auro-formkit/commit/762ee4008a3b644e869e227bbc5763c752c033d9))
* update readme structure ([44b368b](https://github.com/AlaskaAirlines/auro-formkit/commit/44b368b398738ab185700b24ceaf73f98b037bfd))
* update select dependency workspace ([47b0af5](https://github.com/AlaskaAirlines/auro-formkit/commit/47b0af568dc8d0091163e496c12a666349d6ac81))
* update step for testPublish.yml ([63eb5be](https://github.com/AlaskaAirlines/auro-formkit/commit/63eb5bee81fc7b441a7882c0091e9f377ad9dc2b))
* update turbo to track changes in docs partials ([0b93b80](https://github.com/AlaskaAirlines/auro-formkit/commit/0b93b80eaf9374e6c66220001ee2923db7b3c300))
* update type setup ([2cf0bcc](https://github.com/AlaskaAirlines/auro-formkit/commit/2cf0bcc45093f385d4686171698ce1129b013925))
* updates to  README ([ce8e5c5](https://github.com/AlaskaAirlines/auro-formkit/commit/ce8e5c58560bb2da13d8bfa020012f538a725243))
* updating kitDocProcessor ([6ae32c6](https://github.com/AlaskaAirlines/auro-formkit/commit/6ae32c61bb8e834c544a2631cf36b107cb51e25c))
* watch for script changes in turbo ([e70dd10](https://github.com/AlaskaAirlines/auro-formkit/commit/e70dd10eeefb3fad23c3a3812fe20f11f2cad536))


### Features

* add `bibSizer` to help sizing `bibContainer` with css style ([c6e881b](https://github.com/AlaskaAirlines/auro-formkit/commit/c6e881b5743b574079d677e4300850102b070e7e))
* add `docProcessor` to generate docs for each components ([23b0f1b](https://github.com/AlaskaAirlines/auro-formkit/commit/23b0f1b4368d11be88230f4e89e6bd60b3dab3ee))
* add `mobileFullscreenBreakpoint` instead of `noFullscreenOnMobile` ([1a33257](https://github.com/AlaskaAirlines/auro-formkit/commit/1a332575e3c1e6e8baf20bb3160472da6d6e66c0))
* add `noFullscreenOnMobile` attribute ([ff98d61](https://github.com/AlaskaAirlines/auro-formkit/commit/ff98d61a3e67107e1306b3124b65cc852a81c762))
* add doc partials ([45a6c01](https://github.com/AlaskaAirlines/auro-formkit/commit/45a6c01052a9238a5515836e23524d6d1427b8dd))
* add turborepo ([6af0fe4](https://github.com/AlaskaAirlines/auro-formkit/commit/6af0fe47d772387c2fdf6ae5dcc57a594fc362ba))
* add wca as part of build:docs ([ba484de](https://github.com/AlaskaAirlines/auro-formkit/commit/ba484de2c84d04c6e4dcab3646c3edb9b0bc3f35))
* counter component initial setup [#54](https://github.com/AlaskaAirlines/auro-formkit/issues/54) ([df727e3](https://github.com/AlaskaAirlines/auro-formkit/commit/df727e3701eeda2500836457b8cfbd6682505d54))
* initial kitDocProcessor ([77fdb4d](https://github.com/AlaskaAirlines/auro-formkit/commit/77fdb4dc934eb7212e6a1add56e7535a1b1561fc))
* integrate form validation [#44](https://github.com/AlaskaAirlines/auro-formkit/issues/44) ([a673a6b](https://github.com/AlaskaAirlines/auro-formkit/commit/a673a6be854661c6dc8f37c58d9031897fce5669))
* open bib fullscreen on mobile view [#55](https://github.com/AlaskaAirlines/auro-formkit/issues/55) ([84110fd](https://github.com/AlaskaAirlines/auro-formkit/commit/84110fdd114b8456428491c7d994b8289a4d5292))


### Performance Improvements

* move `.container` our of `:host` ([088acab](https://github.com/AlaskaAirlines/auro-formkit/commit/088acabfcc1a70c919692db19eb5286644c6c955))
* prevent semantic-release from running git hooks [#112](https://github.com/AlaskaAirlines/auro-formkit/issues/112) ([4134add](https://github.com/AlaskaAirlines/auro-formkit/commit/4134add4668eea857fd966da92a73cded993b349))
* revert variable rendering logic for calendar ([ac1899e](https://github.com/AlaskaAirlines/auro-formkit/commit/ac1899e5075e9a35078c19cbdcba363de41161aa))
* simplify logic of resetting bib's size on fullscreen mode ([a69ffb1](https://github.com/AlaskaAirlines/auro-formkit/commit/a69ffb19973737df1339370908dbb1dd89b689b2))
* testing out latest husky to fix release [#112](https://github.com/AlaskaAirlines/auro-formkit/issues/112) ([d34fded](https://github.com/AlaskaAirlines/auro-formkit/commit/d34fdedf00a37472b5f2780cba3b9fcc49f7b162))
* update instances of auro-form the repo to auro-formkit [#35](https://github.com/AlaskaAirlines/auro-formkit/issues/35) ([0b5b8d5](https://github.com/AlaskaAirlines/auro-formkit/commit/0b5b8d56322af344b8c21b42b514827c522df871))
* update old build release command [#35](https://github.com/AlaskaAirlines/auro-formkit/issues/35) ([b279345](https://github.com/AlaskaAirlines/auro-formkit/commit/b27934582e90ab992b9e75be0826a2716f04345b))

# [1.5.0](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.4.0...v1.5.0) (2024-11-29)


### Features

* integrate combobox with internal dropdown - part of [#45](https://github.com/AlaskaAirlines/auro-formkit/issues/45) ([949350e](https://github.com/AlaskaAirlines/auro-formkit/commit/949350e65b4926d4f719a7e9f3cbfa070d6870c9))
* integrate select with internal dropdown - part of [#45](https://github.com/AlaskaAirlines/auro-formkit/issues/45) ([2f5c5e8](https://github.com/AlaskaAirlines/auro-formkit/commit/2f5c5e8867aa4376891e28e0fdfa9503a6dc2f99))

# [1.4.0](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.3.0...v1.4.0) (2024-11-29)


### Features

* add `auro-combobox@2.1.4` ([0e21bc4](https://github.com/AlaskaAirlines/auro-formkit/commit/0e21bc4a9671ba5635f411d7996c9d0e220dcaff))
* add `auro-datepicker@3.2.0` ([bdcde1d](https://github.com/AlaskaAirlines/auro-formkit/commit/bdcde1d30ce82c293bcdd0a22de7bc54cb8b201e))

# [1.3.0](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.2.0...v1.3.0) (2024-11-27)


### Features

* add `auro-select@3.3.0` [#43](https://github.com/AlaskaAirlines/auro-formkit/issues/43) ([868d9e9](https://github.com/AlaskaAirlines/auro-formkit/commit/868d9e99619a4183dbdbe2087917de361e07e93d))

# [1.2.0](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.1.0...v1.2.0) (2024-11-26)


### Features

* add radio into components [#26](https://github.com/AlaskaAirlines/auro-formkit/issues/26) ([aaf2758](https://github.com/AlaskaAirlines/auro-formkit/commit/aaf2758f08f1733fbfd401cb0dc50b37e8dd033e))

# [1.1.0](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.0.1...v1.1.0) (2024-11-25)


### Bug Fixes

* fix stylelint error on dropdown ([0b1e274](https://github.com/AlaskaAirlines/auro-formkit/commit/0b1e2740cc996cedbf972808c471059e3a024064))


### Features

* add checkbox into components [#27](https://github.com/AlaskaAirlines/auro-formkit/issues/27) ([3af6779](https://github.com/AlaskaAirlines/auro-formkit/commit/3af67794d7272b2318eae9733f5ee822c869f3b9))
* add menu [#28](https://github.com/AlaskaAirlines/auro-formkit/issues/28) ([2fe16fd](https://github.com/AlaskaAirlines/auro-formkit/commit/2fe16fdc8e75e2aa95e98e94386bbd13e1f1ce8e))
* **api:** add register static method [#21](https://github.com/AlaskaAirlines/auro-formkit/issues/21) ([9953da2](https://github.com/AlaskaAirlines/auro-formkit/commit/9953da21bbb1ac0db2ca35122b5d83f52daace07))
* update input to 4.1.1 ([4b1d182](https://github.com/AlaskaAirlines/auro-formkit/commit/4b1d182aa42595f41b323983a52695912b9d6953))


### Performance Improvements

* update .stylelint to be same as generator's ([49adec0](https://github.com/AlaskaAirlines/auro-formkit/commit/49adec0c2eec451c832c00168b5422857de1ebc9))
* update auro-icon to `6.0.3` ([c586d37](https://github.com/AlaskaAirlines/auro-formkit/commit/c586d37474ad8a6412e48293e4f6f4625d556d7b))
* update stylelint and following changes on scss ([9fd61ab](https://github.com/AlaskaAirlines/auro-formkit/commit/9fd61ab8579aef5f0fbd4d745b8ab9de26e563ff))
* upgrade input to 4.1.3 ([433fb27](https://github.com/AlaskaAirlines/auro-formkit/commit/433fb27b5ee99cfa51f5422f880b11a2bf7037c6))
* upgrade input to 4.2.0 ([cbb6530](https://github.com/AlaskaAirlines/auro-formkit/commit/cbb6530f3d887b974d7a8701ddafff6218323bff))

## [1.0.1](https://github.com/AlaskaAirlines/auro-formkit/compare/v1.0.0...v1.0.1) (2024-11-22)


### Bug Fixes

* improve custom registration example ([bbfbe1a](https://github.com/AlaskaAirlines/auro-formkit/commit/bbfbe1a0cc12a406064150e019ebd345eaaef4c0))
* update version path to the root version file ([1813c14](https://github.com/AlaskaAirlines/auro-formkit/commit/1813c147954b1bb252b4147d755b6c5b240e8d06))


### Performance Improvements

* implement initial desktop styles and functionality [#20](https://github.com/AlaskaAirlines/auro-formkit/issues/20) ([a361b4c](https://github.com/AlaskaAirlines/auro-formkit/commit/a361b4cfdd9a2aba5f04af5e24c5bfb01517a866))
* refactor hard-coded bib styles ([5c6e53f](https://github.com/AlaskaAirlines/auro-formkit/commit/5c6e53fe14401b4d52c1faf04b8c07ccf219103b))
* update component registration handling ([082128e](https://github.com/AlaskaAirlines/auro-formkit/commit/082128e5e13cdf9b8f408cfdae4e5f39470e2471))
* update dependencies ([96decb1](https://github.com/AlaskaAirlines/auro-formkit/commit/96decb1a446236ff9b95de2f7f7d596d43ee74c8))

# 1.0.0 (2024-11-07)


### Bug Fixes

* add demo folder placeholder to form component ([fd32bfb](https://github.com/AlaskaAirlines/auro-formkit/commit/fd32bfbba776976f1eda78f405cd6d907a64659a))
* add dropdown disconnect lifecycle to manage potential memory leaks ([d49de77](https://github.com/AlaskaAirlines/auro-formkit/commit/d49de7704c013d81a01838edf72d07c0fb5e1d5f))
* add event dispatch to input test ([3987e5c](https://github.com/AlaskaAirlines/auro-formkit/commit/3987e5c069e53de3a8d3a4dba6f5e5e1912220a0))
* add form to build task ([af0d7ea](https://github.com/AlaskaAirlines/auro-formkit/commit/af0d7ea4918e9c2fa2ac852c8d4683cf69fe891b))
* add ignore rules to eslint for new folder structure ([177fa86](https://github.com/AlaskaAirlines/auro-formkit/commit/177fa8635030bba39dbb9207e9670feac1a2118b))
* add keydown support to dropdown ([54e2725](https://github.com/AlaskaAirlines/auro-formkit/commit/54e272506c77f63df03042fa43b8cd2211029875))
* add public show/hide api ([ec4af9b](https://github.com/AlaskaAirlines/auro-formkit/commit/ec4af9bd09fb2a06f67ffbd9dcb4304f40cc8dfa))
* adding auro-form entry files ([2af6911](https://github.com/AlaskaAirlines/auro-formkit/commit/2af691187a6ea63b89b5cf506517c21ac82911e5))
* adding component entry files and missing sass files ([aab5e8b](https://github.com/AlaskaAirlines/auro-formkit/commit/aab5e8baa1b28b958a7f2a3f5e77d6581ae7d7f8))
* adds input example to Demo page ([00b6781](https://github.com/AlaskaAirlines/auro-formkit/commit/00b6781d152af5326f38757495d2b4ea003ff73e))
* auro-formkit entry file updates ([113f724](https://github.com/AlaskaAirlines/auro-formkit/commit/113f72499b09a39fb1b489dc8ba333438a34ba34))
* bundle auro-form root component & sub-components ([3fd3ed9](https://github.com/AlaskaAirlines/auro-formkit/commit/3fd3ed9d2cae7783e2fc4e0619b7e96ebfeb551d))
* consolidate focus loss handling ([7e0d1f9](https://github.com/AlaskaAirlines/auro-formkit/commit/7e0d1f9b39733bf80801727ad445bbd0ba4abeb2))
* correct form path ([121879b](https://github.com/AlaskaAirlines/auro-formkit/commit/121879b4d0af682cb247096c8f52e04db15524d8))
* do not reassign parameter ([f3c96f7](https://github.com/AlaskaAirlines/auro-formkit/commit/f3c96f75340b1a6e619c26b1338fbe65d769b97c))
* do not reassign parameter ([60122e0](https://github.com/AlaskaAirlines/auro-formkit/commit/60122e056777ec38c0ca0417b4943cdcee67509c))
* do not reassign parameter ([36dde3b](https://github.com/AlaskaAirlines/auro-formkit/commit/36dde3b9573225eec6d69fb7e687c57711664b99))
* exclude node_modules from swep command ([6c61e7b](https://github.com/AlaskaAirlines/auro-formkit/commit/6c61e7b0042fb61b8fb985e17fa1609a1e2fbac9))
* fixing Linting errors ([f2c2714](https://github.com/AlaskaAirlines/auro-formkit/commit/f2c271475c1cb5395dd124d5469212a5cd56a89b))
* load correct dev paths from package.json ([5e2777e](https://github.com/AlaskaAirlines/auro-formkit/commit/5e2777e67d988389d627af7d3f0e1fdc6d9926ae))
* merge nested if conditions ([d3e977c](https://github.com/AlaskaAirlines/auro-formkit/commit/d3e977c45710d04c9da600f75c414c05e864b1e4))
* prefix bundles with 'auro' namespace ([7386d6e](https://github.com/AlaskaAirlines/auro-formkit/commit/7386d6e649da4ef5b1ed558bfbf90d6e8b5c368c))
* rename auro-component-form to avoid naming collision with auro-form ([e85e10f](https://github.com/AlaskaAirlines/auro-formkit/commit/e85e10f81af65a23e25d837bf2f4a1518da5b05f))
* renaming auro-input directory for simplicty & convention ([b57022b](https://github.com/AlaskaAirlines/auro-formkit/commit/b57022bd9013a772fe35e812ebb5ecb3bd8de613))
* return bundler to build task ([90aa992](https://github.com/AlaskaAirlines/auro-formkit/commit/90aa9921d9830aad0d016704d6d026bbf40c8fd2))
* return missing package.json tasts ([9d95b1c](https://github.com/AlaskaAirlines/auro-formkit/commit/9d95b1cc6f6a91c413c59beb806c92429d108924))
* returns bundler & precommit task, updates sweep to remove dist folder ([aeaa221](https://github.com/AlaskaAirlines/auro-formkit/commit/aeaa221c588a83d218fe2895680024efac1957d2))
* root becomes auro-formkit, form element becomes auro-form ([c937a39](https://github.com/AlaskaAirlines/auro-formkit/commit/c937a39a60e686068e8b209f1da1f593b6a4d1ab))
* simplify state management in dropdown ([5abef4b](https://github.com/AlaskaAirlines/auro-formkit/commit/5abef4b0a6eb4eadaf708170538147ede460978b))
* skip dropdown tests for now ([3637433](https://github.com/AlaskaAirlines/auro-formkit/commit/3637433d7b92b0c6f609202404d4d569658dc0ea))
* update build commands for recurisve files, disbale linting ([93e63d6](https://github.com/AlaskaAirlines/auro-formkit/commit/93e63d666ab80aa374d7b2b8d47dd2c54466f4a3))
* update build commands for recurisve files, disbale linting ([f21719f](https://github.com/AlaskaAirlines/auro-formkit/commit/f21719f526bdc0cf03c86d9628d382c16b3554ce))
* update function names to be clearer ([8e97b3e](https://github.com/AlaskaAirlines/auro-formkit/commit/8e97b3e0c0a39ee29510dc38720bf0909ba81c99))
* update path for api demo page ([46f6c53](https://github.com/AlaskaAirlines/auro-formkit/commit/46f6c539ed446d1ccd899f7d0e60160a1fdb27c9))
* updates rollup config for new bundling, adds missing input dependencies ([d433667](https://github.com/AlaskaAirlines/auro-formkit/commit/d4336676d9aed9f6168a8796725f9737d98aa1bc))
* when bundling, only refer to src dir ([48743e0](https://github.com/AlaskaAirlines/auro-formkit/commit/48743e0a9dfe087aec1edbee60e934f22684a76b))


### Features

* add esc key handler ([bef3588](https://github.com/AlaskaAirlines/auro-formkit/commit/bef35884f4adcad6de7ca9117a67a534667f2500))
* initial integration of floatingUI and dropdown POC ([e960771](https://github.com/AlaskaAirlines/auro-formkit/commit/e9607714bfd90ae2cf8215e7a350719a3e065a4d))


### Performance Improvements

* update dependent component versions ([a17ad1d](https://github.com/AlaskaAirlines/auro-formkit/commit/a17ad1de1e3f7e31e17ede67005158527d42612f))
