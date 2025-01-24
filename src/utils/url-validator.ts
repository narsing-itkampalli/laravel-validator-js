// const defaultProtocols = ['http', 'https'];

export function isValidUrl(value: string, allowedProtocols?:string[]): boolean {

    try {
        const parsedUrl = new URL(value);
        if(allowedProtocols && allowedProtocols.length) {
            return allowedProtocols.includes(parsedUrl.protocol.replace(':', ''));
        }
        return true;
    } catch (e) {
        return false;
    }


    // const pattern = new RegExp(`^((${protocol.join('|')}):\\/\\/)?`+ // protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    //     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    // return !!pattern.test(value);
}