const searchButton = () => {
  showSpinner(true);
  const srchPhn = document.getElementById("search-phone");
  // console.log(srchPhn.value);
  phoneDetails(srchPhn.value);
  srchPhn.value = "";
};

const phoneDetails = (searchPhone) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
    .then((res) => res.json())
    .then((data) => {
      displayPhones(data.data);
      //   console.log(data.data);
    });

  const displayPhones = (phones) => {
    const phonesDiv = document.getElementById("phones-div");
    phonesDiv.innerText = "";
    //   display 6 only
    const showBtn = document.getElementById("show-btn");
    if (phones.length > 6) {
      phones = phones.slice(0, 6);
      showBtn.classList.remove("d-none");
    } else {
      showBtn.classList.add("d-none");
    }
    // Not found messege
    const notFoundMssg = document.getElementById("not-found");
    if (phones.length === 0) {
      notFoundMssg.classList.remove("d-none");
    } else {
      notFoundMssg.classList.add("d-none");
    }
    phones.forEach((phone) => {
      console.log(phone);
      const createPhoneDiv = document.createElement("div");
      createPhoneDiv.classList.add("col");
      createPhoneDiv.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class=" col-6">
          <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class=" col-6">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <p class="card-text"><small class="text-body-secondary">For more details please click the button.</small></p>
            <button type="button" class="btn btn-secondary">Details</button>
          </div>
        </div>
      </div>
    </div>
        `;
      phonesDiv.appendChild(createPhoneDiv);
    });
    showSpinner(false);
  };
};

const spinner = document.getElementById("spinner");
const showSpinner = (load) => {
  if (load === true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
