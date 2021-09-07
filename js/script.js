window.addEventListener("load", function() {
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function() {
        document.querySelector(".preloader").style.display = "none";

    }, 1000)
})






// portfilio
const filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;



for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function() {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");


        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");

            }
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
}



// portfolio lightbox
const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close "),
    lightboxText = lightbox.querySelector(".cpation-text"),
    lightboxCounter = lightbox.querySelector(".cpation-counter");
let itemIndex = 0;


for (let i = 0; i < totalPortfolioItem; i++) {
    portfolioItems[i].addEventListener("click", function() {
        itemIndex = i;
        changeItem();
        toggleLightbox();
    })
}


function nextItem() {
    if (itemIndex === totalPortfolioItem - 1) {
        itemIndex = 0;
    } else {
        itemIndex++
    }
    changeItem();
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItem - 1
    } else {
        itemIndex--;
    }
    changeItem();
}

function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + "of" + totalPortfolioItem;
}
// close lightbox
lightbox.addEventListener("click", function(event) {

        if (event.target === lightboxClose || event.targetn === lightbox) {
            toggleLightbox();
        }

    })
    // aside navbar
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavlist = navList.length,
    allSelection = document.querySelectorAll(".section"),
    totalSelection = allSelection.length;

for (let i = 0; i < totalNavlist; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        // remove back-section
        removeBackSectionClass();



        for (let j = 0; j < totalNavlist; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                // add back-section
                removeBackSectionClass(j)

            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionToggleBtn();
        }
    })

}

function removeBackSectionClass() {
    for (let i = 0; i < totalSelection; i++) {
        allSelection[i].classList.remove("back-setion");
    }
}

function addBackSectionClass(num) {
    allSelection[num].classList.add("back-section");

}

function showSection(element) {
    for (let i = 0; i < totalSelection; i++) {
        allSelection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavlist; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("herf").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("herf").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active")
        }




    }
}




document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-secion-index");
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

const navToggleBtn = document.querySelector(".nav-toggle"),
    aside = document.querySelector(".aside");
navToggleBtn.addEventListener("click", () => {
    asideSectionToggleBtn();
})

function asideSectionToggleBtn() {
    aside.classList.toggle("open");
    navToggleBtn.classList.toggle("open");
    for (let i = 0; i < totalSelection; i++) {
        allSelection[i].classList.toggle("open");
    }
}
// download section
window.onload = function() {
    document.getElementById("download").addEventListener("click", () => {
        const about = this.document.getElementById("about-myself");
        console.log(about);
        console.log(window);
        var opt = {
            margin: 2,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 3 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }

        };
        html2pdf().from(about).set(opt).save();
    })

}




// send email
const btn = document.querySelector('button');
const input = document.querySelector('form');
btn.addEventListener('click', () => {
    Email.send({
            Host: "smtp.mailtrap.io",
            Username: "ae36bcc1de2d99",
            Password: "554c01e580e1fe",
            To: "sankalpasubedi356@gmail.com",
            from: input.elements["email"].value,
            Subject: "Contact us ",
            Body: input.element["message"].value + "<br>" + input.elements["name"].value + "<br>" + input.elements["text"].value

        })
        .then(msg =>
            alert( "The email sucessfully sent")
        )
})