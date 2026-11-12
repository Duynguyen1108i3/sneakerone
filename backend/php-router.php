<?php
$uriPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$decodedPath = rawurldecode($uriPath);

if ($decodedPath !== '/labth' && strpos($decodedPath, '/labth/') !== 0) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not Found';
    return true;
}

$docRoot = realpath(__DIR__ . '/..');
$labRoot = realpath($docRoot . '/labth');
$targetPath = realpath($docRoot . $decodedPath);

if ($targetPath === false || $labRoot === false || ($targetPath !== $labRoot && strpos($targetPath, $labRoot . DIRECTORY_SEPARATOR) !== 0)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'File not found';
    return true;
}

if (is_dir($targetPath) && substr($decodedPath, -1) !== '/') {
    $query = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== ''
        ? '?' . $_SERVER['QUERY_STRING']
        : '';
    header('Location: ' . $uriPath . '/' . $query, true, 302);
    return true;
}

if (is_dir($targetPath)) {
    $hasIndex = is_file($targetPath . '/index.php') || is_file($targetPath . '/index.html');
    if (!$hasIndex) {
        header('Content-Type: text/html; charset=utf-8');
        header('Content-Disposition: inline');
        $items = @scandir($targetPath) ?: [];
        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
        echo '<title>' . htmlspecialchars($decodedPath, ENT_QUOTES, 'UTF-8') . '</title>';
        echo '<style>body{font-family:system-ui,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;line-height:1.6}a{color:#111;font-weight:600;text-decoration:none}a:hover{text-decoration:underline}li{padding:6px 0}</style>';
        echo '</head><body><p><a href="/#labthweb">&larr; Quay lại LABTHWEB</a></p><h2>' . htmlspecialchars($decodedPath, ENT_QUOTES, 'UTF-8') . '</h2><ul>';
        foreach ($items as $entry) {
            if ($entry === '.' || $entry === '..' || strpos($entry, '.') === 0) {
                continue;
            }
            $suffix = is_dir($targetPath . '/' . $entry) ? '/' : '';
            $href = rawurlencode($entry) . $suffix;
            echo '<li><a href="' . htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($entry . $suffix, ENT_QUOTES, 'UTF-8') . '</a></li>';
        }
        echo '</ul></body></html>';
        return true;
    }
}

if (is_file($targetPath)) {
    $ext = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
    if (in_array($ext, ['sql', 'txt', 'md', 'log', 'htaccess'], true) || basename($targetPath) === '.htaccess') {
        header('Content-Type: text/plain; charset=utf-8');
        header('Content-Disposition: inline');
        readfile($targetPath);
        return true;
    }
}

return false;
