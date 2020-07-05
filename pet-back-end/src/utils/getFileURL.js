export const getFileURL = (file) => {
    var getUrl = null;
    if (window.createObjectURL != undefined) { // basic
        getUrl = window.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    }
    return getUrl;
}