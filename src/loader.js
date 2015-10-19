class Loader {
    static load(url, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', url, true); // Replace 'my_data' with the path to your file
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == "200") {
                    success && success(xhr);
                } else {
                    error && error(xhr);
                }
            }
        };
        xhr.send(null);
    }
}
