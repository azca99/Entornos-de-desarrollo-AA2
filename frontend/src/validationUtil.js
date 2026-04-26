const isValidUrl = function(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export { isValidUrl };