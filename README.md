# Landing pages & prelanders

Local collection organized by category, brand, and page purpose. Start with the catalog below. Names describe the page content, not deployment status or verified offer claims.

## Directory layout

```text
pages/
  insurance/       Auto and home insurance offers, comparisons, and quizzes
  senior-benefits/ Medicare and senior allowance pages
  vpn/             VPN app pages and iOS alert prelanders
  entertainment/   Shorta and ShortMax streaming pages
  brand-surveys/   BoroPlus and Clean & Clear experiences
  finance/         Insta EMI Card activation offer
archive/           Previously archived pages and historical documentation
exports/           Original ZIP snapshots with recognizable filenames
docs/              Old-to-new file mapping and relocation checks
```

Each project keeps its HTML, styles, scripts, media, legal pages, and existing tests together. Related variants stay inside their project. No build system is required for these static pages.

## Page catalog

### Insurance

| Page | Purpose / variant |
| --- | --- |
| [AutoQuoteInsure — auto savings offer](pages/insurance/autoquoteinsure-savings-offer/getoffer/index.html) | Savings offer with insured / uninsured choices. Its project root is a separate “Happy World!” placeholder. |
| [SaveAutoInfo — ZIP-code quote](pages/insurance/save-auto-info-zip-quote/index.html) | ZIP-code auto-insurance referral page. |
| [SaveAutoInfo — TikTok variant](pages/insurance/save-auto-info-zip-quote/tiktok/index.html) | Separate TikTok tracking variant; formerly tt/. |
| [SaveOnInsurance — eligibility quiz](pages/insurance/save-on-insurance-eligibility/index.html) | Auto-insurance eligibility funnel. |
| [SaveOnInsurance — auto & home comparison](pages/insurance/save-on-insurance-auto-home-comparison/index.html) | Comparison landing page; formerly insurify/. |
| [SaveOnInsurance — custom quote wizard](pages/insurance/save-on-insurance-quote-wizard/index.html) | Multi-step insurance quote form; formerly terrysmith/. |

### Senior benefits

| Page | Purpose / variant |
| --- | --- |
| [Best Senior Coverage — grocery allowance card](pages/senior-benefits/best-senior-coverage-grocery-card/index.html) | Medicare grocery-card eligibility page. |
| [Senior Coverage Solutions — health allowance](pages/senior-benefits/senior-coverage-solutions-health-allowance/index.html) | Senior health-allowance page. |
| [Your Medicare — health allowance](pages/senior-benefits/your-medicare-health-allowance/index.html) | Main health-allowance prelander. |
| [Your Medicare — new-file variant](pages/senior-benefits/your-medicare-health-allowance/index_new.html) | Existing index_new.html variant; not assumed to be the current version. |
| [Your Medicare — old-file variant](pages/senior-benefits/your-medicare-health-allowance/index_old.html) | Existing index_old.html variant, retained for reference. |
| [Your Medicare — alternate layout](pages/senior-benefits/your-medicare-health-allowance/alternate-layout/index.html) | Alternate page with its own assets and legal pages; formerly other/. |
| [Your Medicare — eligibility quiz](pages/senior-benefits/your-medicare-health-allowance/alternate-layout/qualify/index.html) | Age and Medicare qualification flow. |

### VPN

| Page | Purpose / variant |
| --- | --- |
| [iOS VPN protection alert](pages/vpn/ios-protection-alert/index.html) | Alert-style prelander; formerly pre-landers/landing/. |
| [iOS VPN protection alert — iOS variant](pages/vpn/ios-protection-alert/ios/index.html) | Nested iOS variant, kept with its assets. |
| [HIDY VPN — version 1](pages/vpn/hidy-vpn/v1/index.html) | VPN app landing page, existing v1 design. |
| [HIDY VPN — version 2](pages/vpn/hidy-vpn/v2/index.html) | VPN app landing page, existing v2 design. |
| [HIDY VPN — version 3](pages/vpn/hidy-vpn/v3/index.html) | VPN app landing page, existing v3 design. |
| [Mix VPN — version 1](pages/vpn/mix-vpn/v1/index.html) | VPN privacy app landing page, existing v1 design. |
| [Mix VPN — version 2](pages/vpn/mix-vpn/v2/index.html) | VPN privacy app landing page, existing v2 design. |
| [Mix VPN — version 3](pages/vpn/mix-vpn/v3/index.html) | VPN privacy app landing page, existing v3 design. |
| [Velvet VPN — version 1](pages/vpn/velvet-vpn-tv-remote/v1/index.html) | VPN and smart-TV remote app landing page, existing v1 design. |
| [Velvet VPN — version 2](pages/vpn/velvet-vpn-tv-remote/v2/index.html) | VPN and smart-TV remote app landing page, existing v2 design. |
| [Velvet VPN — version 3](pages/vpn/velvet-vpn-tv-remote/v3/index.html) | VPN and smart-TV remote app landing page, existing v3 design. |

### Entertainment

| Page | Purpose / variant |
| --- | --- |
| [Shorta — vertical series](pages/entertainment/shorta-vertical-series/index.html) | Short-episode streaming landing page. |
| [ShortMax — short drama](pages/entertainment/shortmax-short-drama/index.html) | Short-drama app prelander; formerly shortamax/. |

### Brand surveys

| Page | Purpose / variant |
| --- | --- |
| [BoroPlus — Power of Nature survey](pages/brand-surveys/boro-plus-nature-survey/index.html) | Interactive branded experience. |
| [Clean & Clear — brand survey](pages/brand-surveys/clean-and-clear-survey/index.html) | Brand survey; formerly cnc/. |

### Finance

| Page | Purpose / variant |
| --- | --- |
| [Insta EMI Card — activation offer](pages/finance/insta-emi-card-activation/index.html) | Card activation / credit-limit offer. |

## Archived pages

The pre-existing archive stays together because its pages share assets and legal files. These entries are historical, not newly designated inactive campaigns.

| Page | File |
| --- | --- |
| SaveOnInsurance eligibility | [Open](archive/legacy-prelanders/index.html) |
| Generic auto-insurance eligibility | [Open](archive/legacy-prelanders/prelander.html) |
| SaveMaxAuto ZIP-code quote | [Open](archive/legacy-prelanders/prelander-savemaxauto.html) |
| Senior health-allowance example | [Open](archive/legacy-prelanders/your-medi-example.html) |

## Preview a page

For simple static previews, open a catalog link. For project-root routes and tracking behavior, serve the individual project directory, for example:

```sh
cd pages/entertainment/shortmax-short-drama
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. For AutoQuoteInsure, serve `pages/insurance/autoquoteinsure-savings-offer` and open `/getoffer/`. Its project README documents tracking and tests. PHP files require a PHP-capable server if used.

## Naming and adding pages

Use `pages/<category>/<brand>-<purpose>/` with lowercase, hyphen-separated names. Keep the primary page at `index.html` where practical. Use descriptive variant names such as `tiktok/`, or retain existing numbered design variants such as `v1/`. Keep assets and legal files within the project. Add each new entry point to this catalog; put packaged snapshots in `exports/` and retired projects in `archive/`.

## Original paths and exports

[Complete old-to-new file mapping](docs/path-mapping.json) records the original collection files except the replaced root README and local Git metadata. [Relocation checks](docs/reorganization-checks.md) record file preservation and existing unresolved references.

Folder paths have changed. Update any local bookmarks or hosting source-directory settings that used the old paths. Serve each project as its own site root to preserve domain-root routes. External campaign URLs and page content were retained. The collection is published at [sunny-appmontize/prelanders](https://github.com/sunny-appmontize/prelanders). Local workspace configuration is excluded from Git.

ZIP exports are unchanged historical snapshots, not regenerated packages of the reorganized tree:

- [clean-and-clear-survey](exports/clean-and-clear-survey.zip)
- [insta-emi-card-activation](exports/insta-emi-card-activation.zip)
- [shorta-vertical-series](exports/shorta-vertical-series.zip)
- [shortmax-short-drama](exports/shortmax-short-drama.zip)
- [vpn-prelanders](exports/vpn-prelanders.zip)
- [your-medicare-alternate-layout](exports/your-medicare-alternate-layout.zip)
- [your-medicare-eligibility-quiz](exports/your-medicare-eligibility-quiz.zip)
