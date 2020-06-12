export class LuaRequireProcess {

    constructor() {}

    private rePxReg: RegExp = /(\d+(\.\d+)?)(px)?/;

    private rePxAllReg: RegExp = /(\d+(\.\d+)?)px/g;

    /**
     * transform px value to rpx value
     *
     * @param {string} pxStr px value
     * @return {Object} transformed object
     */
    private pxToRpx(pxStr: string) {
        const px = parseFloat(pxStr);
        let rpxValue = 1
        return {px: pxStr, pxValue: px, rpxValue, rpx: rpxValue + 'rpx'};
    }

    /**
     * transform px to rpx
     *
     * @param {string} code origin text
     * @return {string} transformed text
     */
    convert(text: string) {
        let match = text.match(this.rePxReg);
        if (!match) return null;

        return this.pxToRpx(match[1]);
    }

    /**
     * transform all px to rpx
     *
     * @param {string} code origin text
     * @return {string} transformed text
     */
    convertAll(code: string): string {
        if (!code) return code;

        return code.replace(this.rePxAllReg, (word: string) => {
            const res = this.pxToRpx(word);
            if (res) return res.rpx;
            return word;
        });
    }

}