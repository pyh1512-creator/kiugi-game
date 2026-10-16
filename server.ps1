$port = 8080
$rootDir = (Get-Location).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "Server running at http://localhost:$port/ from $rootDir"

try {
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $reqPath = $request.Url.LocalPath
            if ($reqPath -eq "/" -or [string]::IsNullOrWhiteSpace($reqPath)) {
                $reqPath = "/index.html"
            }
            $subPath = [System.Uri]::UnescapeDataString($reqPath.TrimStart('/')) -replace '/', '\'
            $filePath = Join-Path $rootDir $subPath

            if (Test-Path -LiteralPath $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    default { "application/octet-stream" }
                }
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("File Not Found: $subPath")
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
            $response.OutputStream.Flush()
            $response.OutputStream.Close()
        } catch {
            Write-Warning "Request error: $_"
        }
    }
} finally {
    $listener.Stop()
}
