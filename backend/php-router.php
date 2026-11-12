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

if (is_file($targetPath) && strtolower(pathinfo($targetPath, PATHINFO_EXTENSION)) === 'sql') {
    header('Content-Type: text/plain; charset=utf-8');
    readfile($targetPath);
    return true;
}

return false;
