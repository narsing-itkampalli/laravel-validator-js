export function isValidUrl(value, allowedProtocols) {
    try {
        const parsedUrl = new URL(value);
        if (allowedProtocols && allowedProtocols.length) {
            return allowedProtocols.includes(parsedUrl.protocol.replace(':', ''));
        }
        return true;
    }
    catch (e) {
        return false;
    }
}
