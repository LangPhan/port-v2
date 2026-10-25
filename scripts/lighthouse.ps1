param(
  [string]$Url = "http://localhost:3010/vi",
  [string]$Prefix = "after"
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path .reports | Out-Null
foreach ($run in 1..3) {
  bunx --bun lighthouse@13.5.0 $Url --quiet --chrome-flags="--headless --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=".reports/$Prefix-$run.json"
  if ($LASTEXITCODE -ne 0) { throw "Lighthouse run $run failed." }
  if (!(Test-Path -LiteralPath ".reports/$Prefix-$run.json")) { throw "Lighthouse did not produce a report." }
}
