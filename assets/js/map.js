// Affichage de la carte

const families = [
    {
        name: "Famille Beer",
        description: "Famille Beer — Déportée par le convoi n° 29 (7 septembre 1942). Aucun survivant.",
        num_convoi: 29,
        localisation: {
            lat: 44.56064,
            lng: 6.07831
        },
        video: "assets/video/antisemitism/beer.mp4"
    },
    {
        name: "Honoré Bloch",
        description: "Honoré Bloch — Déporté par le convoi n° 61 (28 octobre 1943). N'a pas survécu.",
        num_convoi: 61,
        localisation: {
            lat: 44.561678,
            lng: 6.081792
        },
        video: "assets/video/antisemitism/bloch.mp4"
    },
    {
        name: "Robert Hesse",
        description: "Robert Hesse — Déporté par le convoi n° 75 (30 mai 1944). N'a pas survécu.",
        num_convoi: 75,
        localisation: {
            lat: 44.557315,
            lng: 6.079973
        },
        video: "assets/video/antisemitism/hesse.mp4"
    },
    {
        name: "Daniel Perlès",
        description: "Daniel Perlès — Déporté par le convoi n° 70 (27 mars 1944). N'a pas survécu.",
        num_convoi: 70,
        localisation: {
            lat: 44.56108141438776,
            lng: 6.0756
        },
        video: "assets/video/gap/Perles.mp4",
        img: ""
    },
    {
        name: "Famille Vorms",
        description: "Famille Vorms — Déportée par le convoi n° 70 (27 mars 1944). Aucun survivant.",
        num_convoi: 70,
        localisation: {
            lat: 44.5612,
            lng: 6.0760737822046575
        },
        video: "assets/video/gap/Vorms.mp4",
        img: ""
    },
    {
        name: "Charles Reicher",
        description: "Charles Reicher — Déporté par le convoi n° 66 (20 janvier 1944). N'a pas survécu.",
        num_convoi: 66,
        localisation: {
            lat: 44.5602701,
            lng: 6.0780268
        },
        video: "assets/video/antisemitism/reicher.mp4"
    },
    {
        name: "Famille Reins",
        description: "Famille Reins — Déportée par le convoi n° 67 (3 février 1944). Aucun survivant.",
        num_convoi: 67,
        localisation: {
            lat: 44.559620,
            lng: 6.079612
        },
        video: "assets/video/antisemitism/reins.mp4"
    },
    {
        name: "Hanna Russo",
        description: "Hanna Russo — Déportée par le convoi n° 29 (7 septembre 1942). N'a pas survécu.",
        num_convoi: 29,
        localisation: {
            lat: 44.5637684,
            lng: 6.0890618
        },
        video: "assets/video/antisemitism/russo.mp4"
    },
    {
        name: "Famille Vorms",
        description: "Famille Vorms — Déportée par le convoi n° 70 (27 mars 1944). Aucun survivant.",
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
            // open native dialog
            if (typeof modal.showModal === 'function') {
                modal.showModal();
            } else {
                // fallback for older browsers
                modal.style.display = 'block';
            }
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
    const modal = document.getElementById("modal");
    // close native dialog if available
    if (typeof modal.close === 'function') {
        modal.close();
    } else {
        modal.style.display = 'none';
    }
    const body = document.body
    body.classList.remove("modal-open");

    const video = modal.getElementsByTagName("video")[0];
    if (video) video.pause();
}

const modal = document.getElementById('modal');
let closeBtns = [...document.getElementsByClassName("close")];
closeBtns.forEach(function (btn) {
    btn.onclick = close;
    btn.onkeydown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            close();
        }
    };
});

// close when clicking on dialog backdrop
if (modal) {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) close();
    });
    // handle escape key to close dialog (native dialogs may handle it, but ensure fallback)
    modal.addEventListener('cancel', function (e) {
        // remove modal-open class if closed via ESC
        document.body.classList.remove('modal-open');
    });
}


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