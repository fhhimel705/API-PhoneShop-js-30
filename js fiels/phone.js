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
      displayPhones(data.data, 6);
      //   console.log(data.data);
      const showBtn = document.getElementById("show-btn");
      showBtn.addEventListener("click", function () {
        displayPhones(data.data);
        showBtn.classList.add("d-none");
      });
    });

  const displayPhones = (phones, limit) => {
    const phonesDiv = document.getElementById("phones-div");
    phonesDiv.innerText = "";
    //   display 6 only
    const showBtn = document.getElementById("show-btn");

    if (phones.length > limit) {
      phones = phones.slice(0, limit);
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
            <button type="button" onclick = "showModal('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondary">Details</button>

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

const showModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const modalId = document.getElementById("exampleModal");
      modalId.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.data.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${data.data.image}" class="img-fluid rounded-start" alt="...">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
  `;
    });
};
// search input field enter key handaler 
document.getElementById("search-phone").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // code for enter
      searchButton();
    }
  });

const spinner = document.getElementById("spinner");
const showSpinner = (load) => {
  if (load === true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};