const requestFails = document.querySelector("#request-fails");
const useAsync = document.querySelector("#request-fails");
const requestButton = document.querySelector("#request-button");
const dataDisplay = document.querySelector("#data-display");
const log = document.querySelector("#log");

//////////////// API ////////////////
const DELAY_SECONDS = 1.0;

const API_DATA = {
    name: "pepe",
    email: "pepe@gmail.com"
};

const fetchSucceeds = () => {
    return !requestFails.checked;
}

const fetchAPIData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fetchSucceeds()) {
                resolve(API_DATA);
            } else {
                reject("no data available");
            }
        }, DELAY_SECONDS * 1000);
    });
};

const fetchAPIDataAsync = async () => {
    const delay = (time) => { return new Promise((resolve) => { setTimeout(resolve, time * 1000); }) };
    await delay(DELAY_SECONDS);

    if (!fetchSucceeds()) {
        throw "no data available";
    }
    return API_DATA;
};
///////////////////////////////////////

const fetchDataPromise = () => {
    log.innerText = "fetching data..."
    return fetchAPIData()
        .then((data) => {
            displayData(data);
        })
        .catch((error) => {
            displayError(error);
        });
}

const fetchDataAsync = async () => {
    try {
        log.innerText = "fetching data..."
        const data = await fetchAPIDataAsync();
        displayData(data);
    } catch (error) {
        displayError(error);
    }
}

const displayData = (data) => {
    log.innerText = ""
    dataDisplay.innerHTML = "";

    const divElement = document.createElement("div");
    const nameElement = document.createElement("p");
    nameElement.innerText = data.name;
    const mailElement = document.createElement("p");
    mailElement.innerText = data.email;

    divElement.appendChild(nameElement);
    divElement.appendChild(mailElement);
    dataDisplay.appendChild(divElement);
};

const displayError = (error) => {
    log.innerText = error
    dataDisplay.innerHTML = "";
};

requestButton.addEventListener("click", (event) => {
    event.preventDefault();
    dataDisplay.innerHTML = "";
    if (!useAsync.checked) {
        fetchDataPromise();
    } else {
        fetchDataAsync();
    }
});

