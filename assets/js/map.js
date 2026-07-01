// Ancien code

const families = [
    {
        name: "Beer",
        description: "Primeta et Jacob Beer, d'origine Polonaise, immigrés en France",
        num_convoi: 29,
        localisation: {
            lat: 44.56064,
            lng: 6.07831
        },
        video: "assets/video/antisemitism/beer.mp4"
    },
    {
        name: "Bloch",
        description: "La famille Bloch",
        num_convoi: 61,
        localisation: {
            lat: 44.561678,
            lng: 6.081792
        },
        video: "assets/video/antisemitism/bloch.mp4"
    },
    {
        name: "Hesse",
        description: "La famille Hesse",
        num_convoi: 75,
        localisation: {
            lat: 44.557315,
            lng: 6.079973
        },
        video: "assets/video/antisemitism/hesse.mp4"
    },
    {
        name: "Daniel Perles",
        description: "La famille Perles",
        num_convoi: 70,
        localisation: {
            lat: 44.56108141438776,
            lng: 6.0756
        },
        video: "assets/video/gap/Perles.mp4",
        img: ""
    },
    {
        name: "Jean Vorms",
        description: "La famille Vorms",
        num_convoi: 70,
        localisation: {
            lat: 44.5612,
            lng: 6.0760737822046575
        },
        video: "assets/video/gap/Vorms.mp4",
        img: ""
    },
    {
        name: "Reicher",
        description: "La famille Reicher",
        num_convoi: 66,
        localisation: {
            lat: 44.5602701,
            lng: 6.0780268
        },
        video: "assets/video/antisemitism/reicher.mp4"
    },
    {
        name: "Reins",
        description: "La famille Reins",
        num_convoi: 67,
        localisation: {
            lat: 44.559620,
            lng: 6.079612
        },
        video: "assets/video/antisemitism/reins.mp4"
    },
    {
        name: "Russo",
        description: "La famille Russo",
        num_convoi: 29,
        localisation: {
            lat: 44.5637684,
            lng: 6.0890618
        },
        video: "assets/video/antisemitism/russo.mp4"
    },
    {
        name: "Vorms",
        description: "La famille Vorms déportée",
        num_convoi: 70,
        localisation: {
            lat: 44.559128,
            lng: 6.080373
        },
        video: "assets/video/antisemitism/vorms.mp4"
    },
];

class LeafletMarker {
    constructor(family) {
        this.family = family;
        this.popup = L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: "marker",
            maxWidth: 300
        }).setLatLng([family.localisation.lat, family.localisation.lng])
            .setContent(family.name + " <span class='num_convoi'>(N°" + family.num_convoi + ")</span>")
            .openOn(map)

        this.popup.getElement().addEventListener("click", () => {
            const modal = document.getElementById("modal");
            modal.style.display = "block";
            const body = document.body
            body.classList.add("modal-open");

            const name = document.getElementById("name");
            name.innerHTML = this.family.name;
            const description = document.getElementById("description");
            description.innerHTML = this.family.description;
            const video = document.getElementById("video");
            const source = video.getElementsByTagName("source")[0]
            const img = document.getElementById("img")
            if (this.family.name === "Perles") {
                img.style.display = "block"
                video.style.display = "none"
                img.src = this.family.img
            } else {
                img.style.display = "none"
                video.style.display = "block"

                let checker = ""
                if (!this.family.video.startsWith("http")) {
                    const sourceURL = new URL(source.src);
                    checker = sourceURL.pathname;
                } else {
                    checker = source.src;
                }
                if (checker !== this.family.video) {
                    video.getElementsByTagName("source")[0].src = this.family.video;
                    video.load();
                }
            }
        });
    }
}

function close() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    let body = document.body
    body.classList.remove("modal-open");

    let video = modal.getElementsByTagName("video")[0];
    video.pause();
}

let closeBtns = [...document.getElementsByClassName("close")];
closeBtns.forEach(function (btn) {
    btn.onclick = close;
    btn.onkeydown = function (e) {
        if (e.keyCode === 13) {
            close();
        }
    };
});

window.onclick = function (event) {
    if (event.target.className === "modal") {
        close();
    }
};


const map = L.map('map').setView([44.55944, 6.07861], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const bounds = [...families.map(family => [family.localisation.lat, family.localisation.lng])];
map.fitBounds(bounds);
families.forEach(family => {
    new LeafletMarker(family);
})


// Select all links with hashes
$('nav a[href^="#"], a.next[href^="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            &&
            location.hostname === this.hostname
        ) {
            // Figure out element to scroll to
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - $('#navigation-bar').outerHeight()
                }, 800, function () {
                    // Callback after animation
                    // Must change focus!
                    const $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                });
            }
        }
    });

