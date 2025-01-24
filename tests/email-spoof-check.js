import punycode from 'punycode';
const isSpoofValid = (email) => {
    const domain = email.split('@')[1];
    if (!domain) return false;
    const asciiDomain = punycode.toASCII(domain);
    return domain === asciiDomain; // Ensures no spoofing attempt
};

isSpoofValid('narsing@gmail.com');