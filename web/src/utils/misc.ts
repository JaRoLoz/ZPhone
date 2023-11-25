export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

export const randomString = (length: number): string => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = length; i > 0; i--)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
};
